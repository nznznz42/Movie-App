package com.example.demo.Utils;


import com.example.demo.Controllers.SessionController;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class JwtFilter extends GenericFilterBean {

    @Autowired
    private SessionController sessionController;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
                         FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        String path = request.getRequestURI();

        if (path.equals("/session/register")) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ServletException("Missing or invalid Authorization header");
        } else {
            String token = authHeader.substring(7);
            if (!sessionController.getTokenStore().contains(token)) {
                throw new ServletException("Unauthorized: Token not registered");
            }
            Claims claims = Jwts.parser().setSigningKey("AuthSecret").parseClaimsJws(token).getBody();
            String emailId = (String) claims.get("currentUserEmailId");
            String name = (String) claims.get("currentUserName");


            request.setAttribute("emailId", emailId);
            request.setAttribute("userName", name);
            filterChain.doFilter(request, servletResponse);
        }
    }
}

