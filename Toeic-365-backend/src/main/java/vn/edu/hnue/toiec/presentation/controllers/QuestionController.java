package vn.edu.hnue.toiec.presentation.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hnue.toiec.data.entities.Question;
import vn.edu.hnue.toiec.presentation.model.QuestionRequest;
import vn.edu.hnue.toiec.presentation.model.QuestionResponse;
import vn.edu.hnue.toiec.usecases.QuestionService;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody QuestionRequest questionRequest) {
        return new ResponseEntity<>(questionService.createQuestion(questionRequest), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<QuestionResponse>> getAllQuestions() {
        return new ResponseEntity<>(questionService.getAllQuestions(), HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<Question> updateQuestion(@RequestBody QuestionResponse questionResponse) {
        return new ResponseEntity<>(questionService.update(questionResponse), HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<Question> deleteQuestion(@RequestBody QuestionResponse questionResponse) {
        return new ResponseEntity<>(questionService.delete(questionResponse), HttpStatus.OK);
    }

}
