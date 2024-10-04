package com.example.demo.Controllers;

import com.example.demo.Exceptions.EmailAlreadyExistingException;
import com.example.demo.Exceptions.EmailIdNotFoundException;
import com.example.demo.Models.LoginRequest;

import com.example.demo.Models.User;
import com.example.demo.Utils.GenerateJwt;
import com.example.demo.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@CrossOrigin(originPatterns = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private GenerateJwt generateJwt;

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestPart("user") User user, @RequestPart("profileImage") MultipartFile profileImage) {
        try {
            String profileImageFileName = saveProfileImage(profileImage);
            user.setProfileImageFileName(profileImageFileName);

            User newUser = userService.addUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
        } catch (EmailAlreadyExistingException | IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Email already exists");
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        try {
            User user = userService.loginUser(username, password);
            Map<String, String> jwtToken = generateJwt.generateToken(user);

            Map<String, Object> response = new HashMap<>();
            response.put("token", jwtToken);
            response.put("user", user);
            response.put("profileImageUrl", getProfileImageUrl(user.getProfileImageFileName()));

            sendTokenToProductApp(jwtToken, "http://localhost:8081/session/register");
            return ResponseEntity.ok(response);
        } catch (EmailIdNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid email or password");
        }
    }

    private String getProfileImageUrl(String profileImageFileName) {
        String baseUrl = "http://localhost:8080/uploads/profile-pictures/";
        return baseUrl + profileImageFileName;
    }


    @GetMapping("/signup/check")
    public ResponseEntity<?> checkUsername(@RequestParam String username, @RequestParam String email) {
        Optional<User> existingUsername = userService.findByUsername(username);
        Optional<User> existingEmail = userService.findByEmail(email);
        if (existingUsername.isPresent() || existingEmail.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username/Email already taken");
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> deregisterSession(@RequestBody Map<String, String> tokenPayload) {
        System.out.println("Incoming payload: " + tokenPayload);
        if (tokenPayload != null && !tokenPayload.isEmpty()) {
            sendTokenToProductApp(tokenPayload, "http://localhost:8081/session/deregister");
            System.out.println("Token sent to product");
            return ResponseEntity.ok("Token deregistered successfully");
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }



    private void sendTokenToProductApp(Map<String, String> jwtToken, String url) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> request = new HttpEntity<>(jwtToken, headers);

            restTemplate.postForEntity(url, request, String.class);
            System.out.println("Token sent to external app.");
        } catch (Exception e) {
            System.out.println("Failed to send token to external app: " + e.getMessage());
        }
    }

    private String saveProfileImage(MultipartFile profileImage) throws IOException {
        String uploadDir = "uploads/profile-pictures/";
        String fileName = UUID.randomUUID() + "_" + profileImage.getOriginalFilename();

        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        File uploadFile = new File(uploadDir + fileName);
        profileImage.transferTo(uploadFile);

        return fileName;
    }
}

