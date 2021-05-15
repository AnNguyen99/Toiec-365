package vn.edu.hnue.toiec.presentation.model;

import lombok.*;

import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamRequest {

    private Long id;
    private String examName;
    private Date totalTime;

    private String numberPartOne;
    private String numberPartTwo;
    private String numberPartThree;
    private String numberPartFour;
    private String numberPartFive;
    private String numberPartSix;
    private String numberPartSeven;
}
