package vn.edu.hnue.toiec.presentation.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionRequest {

    private String numberPart;
    private String title;

    private long questionNumber;
    private String questionContent;
    private String questionImg;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String correctAnswer;
}
