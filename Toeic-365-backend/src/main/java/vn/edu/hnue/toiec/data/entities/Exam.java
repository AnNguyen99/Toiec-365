package vn.edu.hnue.toiec.data.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "exams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String examName;

    @Column(columnDefinition = "datetime")
    private Date totalTime;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "exam_part",
            joinColumns = @JoinColumn(name = "exam_id"),
            inverseJoinColumns = @JoinColumn(name = "part_id"))
    private List<Part> parts;

    public Exam(Long id, String examName, Date totalTime) {
        this.id = id;
        this.examName = examName;
        this.totalTime = totalTime;
    }
}
