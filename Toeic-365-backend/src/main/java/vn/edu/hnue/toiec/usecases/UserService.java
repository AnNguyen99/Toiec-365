package vn.edu.hnue.toiec.usecases;

import vn.edu.hnue.toiec.core.security.UserPrinciple;
import vn.edu.hnue.toiec.data.entities.User;

import java.util.List;

public interface UserService {

    List<UserPrinciple> getAllUser();

    void delete(User user);

    UserPrinciple getCurrentUser();

    User update(User user);
}
