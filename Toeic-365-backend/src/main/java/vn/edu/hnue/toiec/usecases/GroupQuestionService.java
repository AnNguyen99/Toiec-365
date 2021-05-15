package vn.edu.hnue.toiec.usecases;

import vn.edu.hnue.toiec.data.entities.GroupQuestion;
import vn.edu.hnue.toiec.presentation.model.GroupQuestionRequest;
import vn.edu.hnue.toiec.presentation.model.GroupQuestionResponse;

import java.util.List;

public interface GroupQuestionService {
    GroupQuestion createGroupQuestion(GroupQuestionRequest groupQuestionRequest);

    List<GroupQuestionResponse> getAllGroupQuestions();

    List<GroupQuestionResponse> getAllTitle(String numberPart);

    GroupQuestion update(GroupQuestionResponse groupQuestionResponse);

    GroupQuestion delete(GroupQuestionResponse groupQuestionResponse);

}
