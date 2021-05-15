package vn.edu.hnue.toiec.usecases.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.hnue.toiec.data.entities.GroupQuestion;
import vn.edu.hnue.toiec.data.entities.Part;
import vn.edu.hnue.toiec.data.repository.GroupQuestionRepository;
import vn.edu.hnue.toiec.data.repository.PartRepository;
import vn.edu.hnue.toiec.presentation.model.GroupQuestionRequest;
import vn.edu.hnue.toiec.presentation.model.GroupQuestionResponse;
import vn.edu.hnue.toiec.usecases.GroupQuestionService;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class GroupQuestionServiceImpl implements GroupQuestionService {

    @Autowired
    private GroupQuestionRepository groupQuestionRepository;

    @Autowired
    private PartRepository partRepository;

    @Override
    public GroupQuestion createGroupQuestion(GroupQuestionRequest groupQuestionRequest) {
        GroupQuestion groupQuestion = new GroupQuestion();

        if (groupQuestionRepository.existsByTitle(groupQuestionRequest.getTitle())) throw new RuntimeException("Group Question Title Đã Tồn Tại");
        groupQuestion.setTitle(groupQuestionRequest.getTitle());
        groupQuestion.setGroupQuestionDesc(groupQuestionRequest.getGroupQuestionDesc());
        groupQuestion.setAudio(groupQuestionRequest.getAudio());
        groupQuestion.setGroupQuestionImg(groupQuestionRequest.getGroupQuestionImg());
        groupQuestion.setParagraph(groupQuestionRequest.getParagraph());
        Part part = partRepository.findTopByNumberPart(groupQuestionRequest.getNumberPart());
        groupQuestion.setPart(part);
        groupQuestionRepository.save(groupQuestion);

        return groupQuestion;
    }

    @Override
    public List<GroupQuestionResponse> getAllGroupQuestions() {
        List<GroupQuestionResponse> groupQuestions = groupQuestionRepository.findNumberPartAndAllGroupQuestion();
        /*List<GroupQuestionResponse> groupQuestionResponses = convertToGroupQuestionRes(groupQuestions);*/
        return groupQuestions;
    }

    @Override
    public List<GroupQuestionResponse> getAllTitle(String numberPart) {
        List<GroupQuestionResponse> groupQuestions = groupQuestionRepository.findAllTitleByNumberPart(numberPart);

        return groupQuestions;
    }

    @Override
    public GroupQuestion update(GroupQuestionResponse groupQuestionResponse) {
        GroupQuestion groupQuestion = groupQuestionRepository.findById(groupQuestionResponse.getId()).orElseThrow(() -> new RuntimeException("id  group question not found"));
        if (groupQuestion != null) {
            if (groupQuestionRepository.existsByTitle(groupQuestionResponse.getTitle())) throw new RuntimeException("group question title đã tồn tại");
            groupQuestion.setTitle(groupQuestionResponse.getTitle());
            groupQuestion.setGroupQuestionDesc(groupQuestionResponse.getGroupQuestionDesc());
            groupQuestion.setGroupQuestionImg(groupQuestionResponse.getGroupQuestionImg());
            groupQuestion.setAudio(groupQuestionResponse.getAudio());
            groupQuestion.setParagraph(groupQuestionResponse.getParagraph());
            groupQuestionRepository.save(groupQuestion);
        }
        return groupQuestion;
    }

    @Override
    public GroupQuestion delete(GroupQuestionResponse groupQuestionResponse) {
        GroupQuestion groupQuestion = groupQuestionRepository.findById(groupQuestionResponse.getId()).orElseThrow(() -> new RuntimeException("id group question khong ton tai"));
        if (groupQuestion != null) {
            groupQuestionRepository.delete(groupQuestion);
        }
        return groupQuestion;
    }

    public List<GroupQuestionResponse> convertToTitle(List<GroupQuestion> groupQuestions) {
        List<GroupQuestionResponse> groupQuestionResponses = new ArrayList<>();

        for (GroupQuestion groupQuestion : groupQuestions) {
            groupQuestionResponses.add(new GroupQuestionResponse(groupQuestion.getTitle()));
        }
        return groupQuestionResponses;
    }
    /*public List<GroupQuestionResponse> convertToGroupQuestionRes(List<GroupQuestion> groupQuestions) {
        List<GroupQuestionResponse> groupQuestionResponses = new ArrayList<>();

        for (GroupQuestion groupQuestion : groupQuestions) {
            groupQuestionResponses.add(new GroupQuestionResponse(
                    groupQuestion.getId(),
                    groupQuestion.getTitle(),
                    groupQuestion.getDescription(),
                    groupQuestion.getAudio(),
                    groupQuestion.getImages(),
                    groupQuestion.getParagraph(),
            ));
        }
        return groupQuestionResponses;
    }*/
}
