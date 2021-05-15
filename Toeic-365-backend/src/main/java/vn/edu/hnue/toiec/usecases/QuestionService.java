package vn.edu.hnue.toiec.usecases;

import vn.edu.hnue.toiec.data.entities.Question;
import vn.edu.hnue.toiec.presentation.model.QuestionRequest;
import vn.edu.hnue.toiec.presentation.model.QuestionResponse;

import java.util.List;

public interface QuestionService {

    Question createQuestion(QuestionRequest questionRequest);

    List<QuestionResponse> getAllQuestions();

    Question update(QuestionResponse questionResponse);

    Question delete(QuestionResponse questionResponse);

}
