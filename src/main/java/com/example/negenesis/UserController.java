package com.example.negenesis;

import com.example.*;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.HttpStatus;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository,PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

     @PostMapping("/Register")
    public ResponseEntity<?> createUser(@RequestBody User user){
        if (userRepository.existsByUserName(user.getUserName())) {//verifica se o usuário já existe
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuario Já registrado");
        }

        String encriptedPassword = passwordEncoder.encode(user.getPassword());//criptografa a senha
        user.setPassword(encriptedPassword);

        System.out.println("usuário salvo");
        User savedUser = userRepository.save(user);//salva o user no banco de dados
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);//retorna um "objeto" com o usuário registrado
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        Optional<User> userOptional = userRepository.findByUserName(loginRequest.getName());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("usuario não registrado");
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(loginRequest.getSenha(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("senha incorreta");
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(user);

    }
    
}
