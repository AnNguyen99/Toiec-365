package vn.edu.hnue.toiec.data.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "parts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Part {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String numberPart;
    private String partName;
    private String partDesc;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "part", cascade = CascadeType.ALL)
    private List<GroupQuestion> groupQuestions;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "parts")
    private List<Exam> exams;

    public Part(String numberPart) {
        this.numberPart = numberPart;
    }
}
