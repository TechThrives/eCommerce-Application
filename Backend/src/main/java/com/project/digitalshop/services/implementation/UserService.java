package com.project.digitalshop.services.implementation;

import java.util.Collections;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.project.digitalshop.dto.user.UserResponseDTO;
import com.project.digitalshop.dto.user.UserUpdateDTO;
import com.project.digitalshop.exception.NotFoundException;
import com.project.digitalshop.model.User;
import com.project.digitalshop.repository.UserRepository;
import com.project.digitalshop.services.interfaces.IUserService;

@Service
@Validated
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;

    public UserService(UserRepository userRepository, CloudinaryService cloudinaryService) {
        this.userRepository = userRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @Value("${user.profile_image_url}")
    private String profileImageUrl;

    @Override
    public UserResponseDTO updateUser(UUID userId, UserUpdateDTO userUpdateDTO) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User Not Found!!!"));
        BeanUtils.copyProperties(userUpdateDTO, existingUser, "image");
        if (userUpdateDTO.getImage() != null && !userUpdateDTO.getImage().isEmpty()) {
            if (existingUser.getProfileImageUrl() != null
                    && !existingUser.getProfileImageUrl().equals(profileImageUrl)) {
                cloudinaryService.deleteFiles(Collections.singletonList(existingUser.getProfileImageUrl()), "profiles");
            }
            String newImageUrl = cloudinaryService.uploadFile(userUpdateDTO.getImage(), "users");
            existingUser.setProfileImageUrl(newImageUrl);
        }
        existingUser = userRepository.save(existingUser);
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        BeanUtils.copyProperties(existingUser, userResponseDTO);
        return userResponseDTO;
    }

    @Override
    public void deleteUser(UUID userId) {
        if (!userRepository.existsById(userId)) {
            throw new NotFoundException("User Not Found!!!");
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User Not Found"));

        if (user.getProfileImageUrl() != null && !user.getProfileImageUrl().equals(profileImageUrl)) {
            cloudinaryService.deleteFiles(Collections.singletonList(user.getProfileImageUrl()), "users");
        }

        userRepository.deleteById(userId);
    }

    @Override
    public UserResponseDTO getSignedUser() {
        // User user = userRepository.findById(userId)
        // .orElseThrow(() -> new NotFoundException("User Not Found!!!"));
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        // BeanUtils.copyProperties(user, userResponseDTO);
        return userResponseDTO;
    }

    @Override
    public UserResponseDTO getUserById(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User Not Found!!!"));
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        BeanUtils.copyProperties(user, userResponseDTO);
        return userResponseDTO;
    }

    @Override
    public Page<UserResponseDTO> getAllUsers(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<User> userPage = userRepository.findAll(pageable);

        return userPage.map(user -> {
            UserResponseDTO userResponseDTO = new UserResponseDTO();
            BeanUtils.copyProperties(user, userResponseDTO);
            return userResponseDTO;
        });
    }
}
