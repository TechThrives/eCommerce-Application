package com.project.digitalshop.services.implementation;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.project.digitalshop.dto.MessageResponse;
import com.project.digitalshop.dto.authentication.ForgotPasswordRequest;
import com.project.digitalshop.dto.authentication.RefreshTokenRequest;
import com.project.digitalshop.dto.authentication.ResetPasswordRequest;
import com.project.digitalshop.dto.authentication.SignInRequest;
import com.project.digitalshop.dto.authentication.SignInResponse;
import com.project.digitalshop.dto.authentication.SignUpRequest;
import com.project.digitalshop.model.PasswordResetToken;
import com.project.digitalshop.model.RefreshToken;
import com.project.digitalshop.model.Role;
import com.project.digitalshop.model.User;
import com.project.digitalshop.repository.PasswordResetTokenRepository;
import com.project.digitalshop.repository.RefreshTokenRepository;
import com.project.digitalshop.repository.UserRepository;
import com.project.digitalshop.services.interfaces.IAuthenticationService;

import jakarta.validation.Valid;

@Service
@Validated
public class AuthenticationService implements IAuthenticationService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public AuthenticationService(UserRepository userRepository, RefreshTokenRepository refreshTokenRepository,
            JwtService jwtService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder,
            PasswordResetTokenRepository passwordResetTokenRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    @Value("${user.profile_image_url}")
    private String profileImageUrl;

    public SignInResponse signIn(@Valid SignInRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()));
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid Email or Password!!!");
        }
        User user = userRepository.findByUsername(request.getEmail()).orElseThrow(
                () -> new RuntimeException("User Not Found with this Email : " + request.getEmail()));
        System.out.println("---------------- User Id:" + user.getId());
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        Optional<RefreshToken> refreshTokenOpt = refreshTokenRepository.findByUserUsername(request.getEmail());
        if (refreshTokenOpt.isPresent()) {
            RefreshToken existingRefreshToken = refreshTokenOpt.get();
            existingRefreshToken.setRefreshToken(refreshToken);
            refreshTokenRepository.save(existingRefreshToken);
        } else {
            RefreshToken newRefreshTokenDomain = new RefreshToken();
            newRefreshTokenDomain.setRefreshToken(refreshToken);
            newRefreshTokenDomain.setUser(user);
            refreshTokenRepository.save(newRefreshTokenDomain);
        }

        return new SignInResponse(accessToken, refreshToken);
    }

    public ResponseEntity<Object> signUp(@Valid SignUpRequest request) {
        if (request.getPassword().equals(request.getConfirmPassword())) {
            if (!userRepository.findByUsername(request.getEmail()).isPresent()) {
                if (!userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
                    User user = new User();
                    BeanUtils.copyProperties(request, user, "password");
                    user.setUsername(request.getEmail());
                    user.setPassword(passwordEncoder.encode(request.getPassword()));
                    user.setRole(Role.USER);
                    user.setProfileImageUrl(profileImageUrl);
                    userRepository.save(user);
                    return new ResponseEntity<>(new MessageResponse("User Created Successfully!!!"), HttpStatus.OK);
                }
                return new ResponseEntity<>(new MessageResponse("Phone Number Already Exists!!!"),
                        HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(new MessageResponse("Email Already Exists!!!"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new MessageResponse("Passwords and Confirm Password do not match!!!"),
                HttpStatus.BAD_REQUEST);
    }

    public SignInResponse refreshToken(@Valid RefreshTokenRequest request) {
        String userRefreshToken = request.getRefreshToken();
        String username = jwtService.extractUsername(userRefreshToken);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User Not Found with this Email : " + username));

        RefreshToken refreshToken = user.getRefreshToken();

        if (refreshToken != null && jwtService.isRefreshTokenValid(userRefreshToken, user)) {
            // Generate new access token and refresh token
            String accessToken = jwtService.generateAccessToken(user);
            String newRefreshToken = jwtService.generateRefreshToken(user);

            // Update the refresh token in the database
            refreshToken.setRefreshToken(newRefreshToken);
            refreshTokenRepository.save(refreshToken);

            return new SignInResponse(accessToken, newRefreshToken);
        } else {
            if (refreshToken != null) {
                refreshTokenRepository.delete(refreshToken);
            }
            throw new RuntimeException("Invalid Refresh Token!!!");
        }
    }

    public ResponseEntity<Object> forgotPassword(@Valid ForgotPasswordRequest request) {
        User user = userRepository.findByUsername(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User Not Found with this Email : " + request.getEmail()));

        // Delete existing password reset token if present
        Optional<PasswordResetToken> existingTokenOpt = passwordResetTokenRepository.findByUser(user);
        existingTokenOpt.ifPresent(passwordResetTokenRepository::delete);

        // Generate new password reset token
        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setUser(user);
        passwordResetToken.setToken(token);
        passwordResetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        passwordResetTokenRepository.save(passwordResetToken);

        // emailService.sendPasswordResetEmail(user.getEmail(), token);

        return new ResponseEntity<>(new MessageResponse("Password Reset Link has been Sent to your Email!!!"),
                HttpStatus.OK);
    }

    public ResponseEntity<Object> resetPassword(@Valid ResetPasswordRequest request) {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(request.getToken())
                .orElseThrow(() -> new RuntimeException("Invalid or Expired Password Reset Token!!!"));

        if (passwordResetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            passwordResetTokenRepository.delete(passwordResetToken);
            throw new RuntimeException("Invalid or Expired Password Reset Token!!!");
        }

        User user = passwordResetToken.getUser();

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return new ResponseEntity<>(new MessageResponse("Passwords and Confirm Password do not match!!!"),
                    HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        passwordResetTokenRepository.delete(passwordResetToken);

        return new ResponseEntity<>(new MessageResponse("Password has been reset Successfully!!!"), HttpStatus.OK);
    }
}
