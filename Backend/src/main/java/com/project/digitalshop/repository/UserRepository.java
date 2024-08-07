package com.project.digitalshop.repository;

import com.project.digitalshop.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Page<User> findAll(Pageable pageable);

    Optional<User> findByUsername(String username);

    Optional<User> findByPhoneNumber(String phoneNumber);
}
