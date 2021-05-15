package vn.edu.hnue.toiec.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.hnue.toiec.data.entities.Authority;
import vn.edu.hnue.toiec.data.entities.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    List<User> findAllByRolesContains(Authority authority);

    User findByEmail(User user);
}
