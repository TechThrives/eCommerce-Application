package com.project.digitalshop.services.interfaces;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;

import com.project.digitalshop.dto.user.UserResponseDTO;
import com.project.digitalshop.dto.user.UserUpdateDTO;

import jakarta.validation.Valid;

@Validated
public interface IUserService {
    UserResponseDTO updateUser(UUID userId, @Valid UserUpdateDTO userUpdateDTO);

    void deleteUser(UUID userId);

    UserResponseDTO getUserById(UUID userId);

    UserResponseDTO getSignedUser();

    Page<UserResponseDTO> getAllUsers(int pageNo, int pageSize);
}
