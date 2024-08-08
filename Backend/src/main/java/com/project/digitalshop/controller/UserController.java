package com.project.digitalshop.controller;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.digitalshop.dto.user.UserResponseDTO;
import com.project.digitalshop.dto.user.UserUpdateDTO;
import com.project.digitalshop.services.interfaces.IUserService;

import jakarta.validation.Valid;

@RestController
@Validated
@RequestMapping("/api/users")
public class UserController {

    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getSignedUser() {
        UserResponseDTO userResponseDTO = userService.getSignedUser();
        return ResponseEntity.status(HttpStatus.OK).body(userResponseDTO);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable UUID userId,
            @Valid @ModelAttribute UserUpdateDTO userUpdateDTO) {
        UserResponseDTO updatedUser = userService.updateUser(userId, userUpdateDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID userId) {
        userService.deleteUser(userId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable UUID userId) {
        UserResponseDTO userResponseDTO = userService.getUserById(userId);
        return ResponseEntity.status(HttpStatus.OK).body(userResponseDTO);
    }

    @GetMapping
    public ResponseEntity<Page<UserResponseDTO>> getAllUsers(@RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        Page<UserResponseDTO> userPage = userService.getAllUsers(pageNo, pageSize);
        return ResponseEntity.status(HttpStatus.OK).body(userPage);
    }
}
