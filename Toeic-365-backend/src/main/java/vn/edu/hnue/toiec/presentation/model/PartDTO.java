package vn.edu.hnue.toiec.presentation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.hnue.toiec.data.entities.Part;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PartDTO {
    private String numberPart;
    private String partName;
    private String partDesc;
    private List<GroupQuestionDTO> groupQuestion = new ArrayList<>();

    public PartDTO convertByPart(Part part) {
        this.numberPart = part.getNumberPart();
        this.partName = part.getPartName();
        this.partDesc = part.getPartDesc();
        part.getGroupQuestions().forEach(e -> {
            GroupQuestionDTO groupQuestionDTO = new GroupQuestionDTO();
            groupQuestionDTO.convertByGroupQuestion(e);
            groupQuestion.add(groupQuestionDTO);
        });
        return this;
    }
}
