package vn.edu.hnue.toiec.usecases.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.hnue.toiec.data.entities.GroupQuestion;
import vn.edu.hnue.toiec.data.entities.Question;
import vn.edu.hnue.toiec.data.repository.GroupQuestionRepository;
import vn.edu.hnue.toiec.data.repository.QuestionRepository;
import vn.edu.hnue.toiec.presentation.model.QuestionRequest;
import vn.edu.hnue.toiec.presentation.model.QuestionResponse;
import vn.edu.hnue.toiec.usecases.QuestionService;

import java.util.List;

@Service
@Transactional
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private GroupQuestionRepository groupQuestionRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question createQuestion(QuestionRequest questionRequest) {
        Question question = new Question();
        question.setQuestionNumber(questionRequest.getQuestionNumber());
        question.setQuestionContent(questionRequest.getQuestionContent());
        question.setQuestionImg(questionRequest.getQuestionImg());
        question.setOption1(questionRequest.getOption1());
        question.setOption2(questionRequest.getOption2());
        question.setOption3(questionRequest.getOption3());
        question.setOption4(questionRequest.getOption4());
        question.setCorrectAnswer(questionRequest.getCorrectAnswer());

        GroupQuestion groupQuestion = groupQuestionRepository.findByTitle(questionRequest.getTitle());

        question.setGroupQuestion(groupQuestion);
        questionRepository.save(question);

        return question;
    }

    @Override
    public List<QuestionResponse> getAllQuestions() {
        List<QuestionResponse> questionResponses = questionRepository.getAllQuestions();
        return questionResponses;
    }

    @Override
    public Question update(QuestionResponse questionResponse) {
        Question question = questionRepository.findById(questionResponse.getId()).orElseThrow(() -> new RuntimeException("ID NOT FOUND"));
        if (question != null) {
            question.setQuestionNumber(questionResponse.getQuestionNumber());
            question.setQuestionContent(questionResponse.getQuestionContent());
            question.setQuestionImg(question.getQuestionImg());
            question.setOption1(questionResponse.getOption1());
            question.setOption2(questionResponse.getOption2());
            question.setOption3(questionResponse.getOption3());
            question.setOption4(questionResponse.getOption4());
            question.setCorrectAnswer(questionResponse.getCorrectAnswer());
        }
        questionRepository.save(question);

        return question;
    }

    @Override
    public Question delete(QuestionResponse questionResponse) {
        Question question = questionRepository.findById(questionResponse.getId()).orElseThrow(() -> new RuntimeException("ID NOT FOUND"));
        if (question != null) {
            questionRepository.delete(question);
        }
        return question;
    }
}
