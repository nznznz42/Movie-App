package com.example.demo.Utils;

import com.example.demo.Models.User;

import java.util.Map;

public interface GenerateJwt {
    public abstract Map<String,String> generateToken(User user);
}
