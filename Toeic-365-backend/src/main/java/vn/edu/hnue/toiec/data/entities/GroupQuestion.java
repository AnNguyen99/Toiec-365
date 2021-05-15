package vn.edu.hnue.toiec.data.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String groupQuestionDesc;
    private String groupQuestionImg;
    private String audio;
    private String paragraph;
    private String transcript;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "part_id", nullable = false)
    private Part part;

    @OneToMany(mappedBy = "groupQuestion", cascade = CascadeType.ALL)
    private List<Question> questions;

}
