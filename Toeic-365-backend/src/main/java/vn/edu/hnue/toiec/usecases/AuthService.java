package vn.edu.hnue.toiec.usecases;

import vn.edu.hnue.toiec.core.security.UserPrinciple;
import vn.edu.hnue.toiec.data.entities.User;
import vn.edu.hnue.toiec.presentation.model.LoginRequest;
import vn.edu.hnue.toiec.presentation.model.RegisterRequest;
import vn.edu.hnue.toiec.presentation.model.UserResponse;

import java.util.HashMap;

public interface AuthService {
    User register(RegisterRequest registerRequest);

    HashMap<String, Object> login(LoginRequest loginRequest);


}
