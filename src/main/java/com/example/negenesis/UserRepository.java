package com.example.negenesis;

import com.example.*;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUserName(String userName);

    Optional<User> findByUserName(String userName); 
}
