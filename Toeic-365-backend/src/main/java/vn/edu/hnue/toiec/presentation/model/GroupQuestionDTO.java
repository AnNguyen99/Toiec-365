package vn.edu.hnue.toiec.presentation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.hnue.toiec.data.entities.GroupQuestion;
import vn.edu.hnue.toiec.data.entities.Question;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupQuestionDTO {
    private String title;
    private String groupQuestionDesc;
    private String groupQuestionImg;
    private String audio;
    private String paragraph;

    private List<QuestionDTO> question = new ArrayList<>();

    public GroupQuestionDTO convertByGroupQuestion(GroupQuestion groupQuestion) {
        this.title = groupQuestion.getTitle();
        this.groupQuestionDesc = groupQuestion.getGroupQuestionDesc();
        this.groupQuestionImg = groupQuestion.getGroupQuestionImg();
        this.audio = groupQuestion.getAudio();
        this.paragraph = groupQuestion.getParagraph();
        groupQuestion.getQuestions().forEach(e -> {
            QuestionDTO questionDTO = new QuestionDTO();
            questionDTO.convertByQuestion(e);
            question.add(questionDTO);
        });
        groupQuestion.getQuestions().sort(new Comparator<Question>() {
            @Override
            public int compare(Question o1, Question o2) {
                return Long.compare(o1.getQuestionNumber(), o2.getQuestionNumber());
            }
        });
        return this;
    }

}
