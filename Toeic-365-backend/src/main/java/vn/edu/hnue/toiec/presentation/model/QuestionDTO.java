package vn.edu.hnue.toiec.presentation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.hnue.toiec.data.entities.Question;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {
    private long questionNumber;
    private String questionContent;
    private String questionImg;

    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String correctAnswer;

    public QuestionDTO convertByQuestion(Question question) {
        this.questionNumber = question.getQuestionNumber();
        this.questionContent = question.getQuestionContent();
        this.questionImg = question.getQuestionImg();
        this.option1 = question.getOption1();
        this.option2 = question.getOption2();
        this.option3 = question.getOption3();
        this.option4 = question.getOption4();
        this.correctAnswer = question.getCorrectAnswer();
        return this;
    }
}
