package vn.edu.hnue.toiec.data.repository;

import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.hnue.toiec.data.entities.GroupQuestion;
import vn.edu.hnue.toiec.presentation.model.GroupQuestionResponse;

import java.util.List;

@Repository
public interface GroupQuestionRepository extends JpaRepository<GroupQuestion, Integer> {

    GroupQuestion findByTitle(String groupQuestionTitle);

    @Query("select new vn.edu.hnue.toiec.presentation.model.GroupQuestionResponse(p.numberPart, g.id, g.title, g.groupQuestionDesc, g.groupQuestionImg, g.audio, g.paragraph) from Part p inner join p.groupQuestions g")
    List<GroupQuestionResponse> findNumberPartAndAllGroupQuestion();

    @Query("select new vn.edu.hnue.toiec.presentation.model.GroupQuestionResponse(g.title) from Part p inner join p.groupQuestions g where p.numberPart = ?1")
    List<GroupQuestionResponse> findAllTitleByNumberPart(String numberPart);

    Boolean existsByTitle(String title);

}
