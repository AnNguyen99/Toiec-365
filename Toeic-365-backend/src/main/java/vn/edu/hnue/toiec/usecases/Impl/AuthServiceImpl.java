package vn.edu.hnue.toiec.usecases.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.hnue.toiec.core.security.CustomAuthenticationProvider;
import vn.edu.hnue.toiec.core.security.JwtProvider;
import vn.edu.hnue.toiec.core.security.UserPrinciple;
import vn.edu.hnue.toiec.data.entities.Authority;
import vn.edu.hnue.toiec.data.entities.AuthorityName;
import vn.edu.hnue.toiec.data.entities.User;
import vn.edu.hnue.toiec.data.repository.AuthorityRepository;
import vn.edu.hnue.toiec.data.repository.UserRepository;
import vn.edu.hnue.toiec.presentation.model.LoginRequest;
import vn.edu.hnue.toiec.presentation.model.RegisterRequest;
import vn.edu.hnue.toiec.presentation.model.UserResponse;
import vn.edu.hnue.toiec.usecases.AuthService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

@Service
@Transactional(rollbackFor = Exception.class)
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomAuthenticationProvider authenticationProvider;

    @Autowired
    private AuthorityRepository AuthorityRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        User user = registerRequest.convertToUser();
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        Authority authority = AuthorityRepository.findAllByName(AuthorityName.ROLE_USER);
        user.setRoles(new HashSet<Authority>() {{
            add(authority);
        }});
        userRepository.save(user);
        return user;
    }

    public HashMap<String, Object> login(LoginRequest loginRequest) {
        HashMap<String, Object> result = new HashMap<>();
        Authentication authentication = authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateTokenByUsername(loginRequest.getEmail());
        result.put("userInfo", authentication.getPrincipal());
        result.put("token", token);
        return result;
    }


}
