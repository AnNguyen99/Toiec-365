package vn.edu.hnue.toiec.presentation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.hnue.toiec.data.entities.Exam;

import javax.persistence.Column;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamDTO {
    private Long id;
    private String examName;
    @Column(columnDefinition = "datetime")
    private Date totalTime;
    List<PartDTO> part = new ArrayList<>();

    public ExamDTO convertByExam(Exam exam) {
        this.id = exam.getId();
        this.examName = exam.getExamName();
        this.totalTime = exam.getTotalTime();
        exam.getParts().forEach(e -> {
            PartDTO partDTO = new PartDTO();
            partDTO.convertByPart(e);
            part.add(partDTO);
        });
        return this;
    }
}
