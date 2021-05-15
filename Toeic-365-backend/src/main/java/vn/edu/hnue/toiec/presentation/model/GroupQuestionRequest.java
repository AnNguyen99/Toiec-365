package vn.edu.hnue.toiec.presentation.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupQuestionRequest {
    private String numberPart;
    private String title;
    private String groupQuestionDesc;
    private String groupQuestionImg;
    private String audio;
    private String paragraph;
}
