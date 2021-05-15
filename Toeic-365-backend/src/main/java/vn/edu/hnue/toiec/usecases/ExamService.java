package vn.edu.hnue.toiec.usecases;

import vn.edu.hnue.toiec.data.entities.Exam;
import vn.edu.hnue.toiec.presentation.model.ExamDTO;
import vn.edu.hnue.toiec.presentation.model.ExamRequest;
import vn.edu.hnue.toiec.presentation.model.ExamResponse;

import java.util.List;

public interface ExamService {
    Exam create(ExamRequest examRequest);

    ExamDTO getExamById(Long id);

    List<Exam> getAllExams();

    List<ExamResponse> getAllExam();

    ExamResponse getIntroExamById(Long id);

    Exam update(ExamRequest examRequest);

    Exam delete(Exam exam);

}
