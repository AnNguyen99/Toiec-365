package vn.edu.hnue.toiec.presentation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {
    private String numberPart;
    private String title;

    private Long id;
    private long questionNumber;
    private String questionContent;
    private String questionImg;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String correctAnswer;
}
