package com.project.digitalshop.repository;

import com.project.digitalshop.model.PasswordResetToken;
import com.project.digitalshop.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, UUID> {
    Optional<PasswordResetToken> findByToken(String token);

    Optional<PasswordResetToken> findByUser(User user);
}
