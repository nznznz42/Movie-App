package com.example.demo.Services;

import com.example.demo.Exceptions.EmailAlreadyExistingException;
import com.example.demo.Exceptions.EmailIdNotFoundException;
import com.example.demo.Models.User;
import com.example.demo.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(User user) throws EmailAlreadyExistingException {
        if (userRepository.findByEmail(user.getEmail()).isEmpty()) {
            return userRepository.save(user);
        } else {
            throw new EmailAlreadyExistingException();
        }
    }

    @Override
    public User loginUser(String username, String password) throws EmailIdNotFoundException {
        return userRepository.findByUsername(username)
                .filter(user -> user.getPassword().equals(password))
                .orElseThrow(EmailIdNotFoundException::new);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}


