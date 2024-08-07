package com.project.digitalshop.repository;

import com.project.digitalshop.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {

    Optional<RefreshToken> findByUserUsername(String username);

    Optional<RefreshToken> findByRefreshToken(String token);
}
