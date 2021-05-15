package vn.edu.hnue.toiec.presentation.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hnue.toiec.data.entities.GroupQuestion;
import vn.edu.hnue.toiec.presentation.model.GroupQuestionRequest;
import vn.edu.hnue.toiec.presentation.model.GroupQuestionResponse;
import vn.edu.hnue.toiec.usecases.GroupQuestionService;

import java.util.List;

@RestController
@RequestMapping("/api/group-questions")
@CrossOrigin("*")
public class GroupQuestionController {

    @Autowired
    private GroupQuestionService groupQuestionService;

    @PostMapping
    public ResponseEntity<GroupQuestion> createGroupQuestion(@RequestBody GroupQuestionRequest groupQuestionRequest) {
        return new ResponseEntity<>(groupQuestionService.createGroupQuestion(groupQuestionRequest), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GroupQuestionResponse>> getAllGroupQuestions() {
        return new ResponseEntity<>(groupQuestionService.getAllGroupQuestions(), HttpStatus.OK);
    }

    @PostMapping("/title")
    public ResponseEntity<List<GroupQuestionResponse>> getAllTitle(@RequestBody GroupQuestionResponse groupQuestion) {
        return new ResponseEntity<>(groupQuestionService.getAllTitle(groupQuestion.getNumberPart()), HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<GroupQuestion> update(@RequestBody GroupQuestionResponse groupQuestion) {
        return new ResponseEntity<>(groupQuestionService.update(groupQuestion), HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<GroupQuestion> delete(@RequestBody GroupQuestionResponse groupQuestion) {
        return new ResponseEntity<>(groupQuestionService.delete(groupQuestion), HttpStatus.OK);
    }
}
