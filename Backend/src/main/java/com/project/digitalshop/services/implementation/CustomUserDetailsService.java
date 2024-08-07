package com.project.digitalshop.services.implementation;

import com.project.digitalshop.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository UserRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.UserRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return UserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with this Email: " + username));
    }
}
