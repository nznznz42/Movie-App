package com.example.demo.Controllers;

import com.example.demo.Exceptions.EmailAlreadyExistingException;
import com.example.demo.Exceptions.EmailIdNotFoundException;
import com.example.demo.Models.LoginRequest;
import com.example.demo.Models.User;
import com.example.demo.Services.DataAppService;
import com.example.demo.Services.FileService;
import com.example.demo.Services.JwtService;
import com.example.demo.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(originPatterns = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private DataAppService dataAppService;

    @Autowired
    private FileService fileService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestParam("username") String username, @RequestParam("email") String email, @RequestParam("password") String password, @RequestParam("profileImage") MultipartFile profileImage) throws IOException, EmailAlreadyExistingException {

        System.out.println("username:" + username + "email:" + email + "pass:" + password + "imageName" + profileImage.getOriginalFilename());
        String profileImageFileName = fileService.saveProfileImage(profileImage);
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(password);
        user.setProfileImageFileName(profileImageFileName);

        User newUser = userService.addUser(user);
        dataAppService.createNewAccountOnDataApp(username, email);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");

    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) throws EmailIdNotFoundException {
        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        User user = userService.loginUser(username, password);
        Map<String, String> jwtToken = jwtService.generateToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("token", jwtToken);
        response.put("user", user);
        response.put("profileImageUrl", fileService.getProfileImageUrl(user.getProfileImageFileName()));

        dataAppService.registerSession(jwtToken);
        return ResponseEntity.ok(response);

    }

    @GetMapping("/signup/check")
    public ResponseEntity<?> checkUsernameAndEmail(@RequestParam String username, @RequestParam String email) {
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
            dataAppService.deregisterSession(tokenPayload);
            System.out.println("Token sent to product");
            return ResponseEntity.ok("Token deregistered successfully");
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }

    @GetMapping("/warm-up")
    public ResponseEntity<?> warmUp() {
        return ResponseEntity.ok("Server Warmed Up Successfully");
    }

}

