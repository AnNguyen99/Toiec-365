package vn.edu.hnue.toiec.data.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private long questionNumber;
    private String questionContent;
    private String questionImg;

    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String correctAnswer;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_question_id")
    private GroupQuestion groupQuestion;
}
