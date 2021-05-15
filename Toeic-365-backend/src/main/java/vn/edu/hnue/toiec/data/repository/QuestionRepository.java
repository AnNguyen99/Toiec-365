package vn.edu.hnue.toiec.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.hnue.toiec.data.entities.Question;
import vn.edu.hnue.toiec.presentation.model.QuestionResponse;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query("select new vn.edu.hnue.toiec.presentation.model.QuestionResponse(p.numberPart, g.title, q.id, q.questionNumber, q.questionContent, q.questionImg, q.option1, q.option2, q.option3, q.option4, q.correctAnswer) from Part p inner join p.groupQuestions g inner join g.questions q")
    List<QuestionResponse> getAllQuestions();

    Boolean existsByQuestionNumber(long questionNumber);
}
