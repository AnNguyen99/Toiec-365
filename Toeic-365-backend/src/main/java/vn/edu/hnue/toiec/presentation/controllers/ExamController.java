package vn.edu.hnue.toiec.presentation.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hnue.toiec.data.entities.Exam;
import vn.edu.hnue.toiec.presentation.model.ExamDTO;
import vn.edu.hnue.toiec.presentation.model.ExamRequest;
import vn.edu.hnue.toiec.presentation.model.ExamResponse;
import vn.edu.hnue.toiec.usecases.ExamService;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@CrossOrigin("*")
public class ExamController {

    @Autowired
    private ExamService examService;

    @PostMapping
    public ResponseEntity<Exam> createExam(@RequestBody ExamRequest examRequest) {
        return new ResponseEntity<>(examService.create(examRequest), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ExamDTO> getExamById(@RequestParam Long id) {
        return new ResponseEntity<>(examService.getExamById(id), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Exam>> getAllExams() {
        return new ResponseEntity<>(examService.getAllExams(), HttpStatus.OK);
    }

    @GetMapping("/name")
    public ResponseEntity<List<ExamResponse>> getAllExam() {
        return new ResponseEntity<>(examService.getAllExam(), HttpStatus.OK);
    }

    @GetMapping("/intro")
    public ResponseEntity<ExamResponse> getIntroExamById(@RequestParam Long id) {
        return new ResponseEntity<>(examService.getIntroExamById(id), HttpStatus.OK);
    }

    @PostMapping("update")
    public ResponseEntity<Exam> updateExamById(@RequestBody ExamRequest examRequest) {
        return new ResponseEntity<>(examService.update(examRequest), HttpStatus.OK);
    }

    @PostMapping("delete")
    public ResponseEntity<Exam> deleteExam(@RequestBody Exam exam) {
        return new ResponseEntity<>(examService.delete(exam), HttpStatus.OK);
    }
}
