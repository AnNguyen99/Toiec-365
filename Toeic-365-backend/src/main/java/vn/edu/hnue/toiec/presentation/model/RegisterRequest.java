package vn.edu.hnue.toiec.presentation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.hnue.toiec.data.entities.User;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    private String fullName;
    private String email;
    private String password;

    public User convertToUser(){
        User user = new User();
        user.setFullName(this.fullName);
        user.setEmail(this.email);
        user.setPassword(this.password);
        return user;
    }
}
