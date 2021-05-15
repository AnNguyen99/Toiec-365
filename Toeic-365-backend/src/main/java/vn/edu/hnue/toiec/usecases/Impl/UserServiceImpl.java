package vn.edu.hnue.toiec.usecases.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.hnue.toiec.core.security.UserPrinciple;
import vn.edu.hnue.toiec.data.entities.Authority;
import vn.edu.hnue.toiec.data.entities.AuthorityName;
import vn.edu.hnue.toiec.data.entities.User;
import vn.edu.hnue.toiec.data.repository.AuthorityRepository;
import vn.edu.hnue.toiec.data.repository.UserRepository;
import vn.edu.hnue.toiec.usecases.UserService;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UserPrinciple> getAllUser() {
        Authority authority = authorityRepository.findByName(AuthorityName.ROLE_USER);
        List<User> users = userRepository.findAllByRolesContains(authority);

        return this.convertToListUserPrinciple(users);
    }

    private List<UserPrinciple> convertToListUserPrinciple(List<User> users) {
        List<UserPrinciple> userPrinciples = new ArrayList<>();

        for (User user : users) {
            userPrinciples.add(UserPrinciple.build(user));
        }

        return userPrinciples;
    }

    @Override
    public void delete(User user) {
        User userDB = userRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("id user not found"));
        userDB.setRoles(null);
        userRepository.delete(userDB);
    }

    @Override
    public UserPrinciple getCurrentUser() {
        UserPrinciple userPrinciple = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userPrinciple;
    }

    @Override
    public User update(User user) {
        User userDB = userRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("id user not found"));
        userDB.setFullName(user.getFullName());
        userDB.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(userDB);
        return userDB;
    }
}
