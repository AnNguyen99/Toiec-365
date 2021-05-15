package vn.edu.hnue.toiec.presentation.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GroupQuestionResponse {

    private String numberPart;

    private Integer id;
    private String title;
    private String groupQuestionDesc;
    private String groupQuestionImg;
    private String audio;
    private String paragraph;

    public GroupQuestionResponse(String numberPart, Integer id, String title, String groupQuestionDesc, String groupQuestionImg, String audio, String paragraph) {
        this.numberPart = numberPart;
        this.id = id;
        this.title = title;
        this.groupQuestionDesc = groupQuestionDesc;
        this.groupQuestionImg = groupQuestionImg;
        this.audio = audio;
        this.paragraph = paragraph;
    }

    public GroupQuestionResponse(String title) {
        this.title = title;
    }
}
