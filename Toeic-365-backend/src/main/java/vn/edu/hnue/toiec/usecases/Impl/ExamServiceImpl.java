package vn.edu.hnue.toiec.usecases.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.hnue.toiec.data.entities.Exam;
import vn.edu.hnue.toiec.data.entities.Part;
import vn.edu.hnue.toiec.data.repository.ExamRepository;
import vn.edu.hnue.toiec.data.repository.PartRepository;
import vn.edu.hnue.toiec.presentation.model.*;
import vn.edu.hnue.toiec.usecases.ExamService;


import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ExamServiceImpl implements ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private PartRepository partRepository;

    @Override
    public Exam create(ExamRequest examRequest) {
        Exam exam = new Exam();

        exam.setExamName(examRequest.getExamName());
        exam.setTotalTime(examRequest.getTotalTime());

        List<Part> parts = new ArrayList<>();

        Part partOne = partRepository.findTopByNumberPart(examRequest.getNumberPartOne());
        Part partTwo = partRepository.findTopByNumberPart(examRequest.getNumberPartTwo());
        Part partThree = partRepository.findTopByNumberPart(examRequest.getNumberPartThree());
        Part partFour = partRepository.findTopByNumberPart(examRequest.getNumberPartFour());
        Part partFive = partRepository.findTopByNumberPart(examRequest.getNumberPartFive());
        Part partSix = partRepository.findTopByNumberPart(examRequest.getNumberPartSix());
        Part partSeven = partRepository.findTopByNumberPart(examRequest.getNumberPartSeven());

        parts.add(partOne);
        parts.add(partTwo);
        parts.add(partThree);
        parts.add(partFour);
        parts.add(partFive);
        parts.add(partSix);
        parts.add(partSeven);

        exam.setParts(parts);
        examRepository.save(exam);

        return exam;
    }

    @Override
    public ExamDTO getExamById(Long id) {
        Exam exam = this.examRepository.findById(id).orElseThrow(() -> new RuntimeException("Id Exam Not Found"));
        ExamDTO examDTO = new ExamDTO();
        return examDTO.convertByExam(exam);
    }

    @Override
    public List<Exam> getAllExams() {
       List<Exam> exams = examRepository.findAll();
       return exams;
    }

    @Override
    public List<ExamResponse> getAllExam() {
        List<Exam> exams = examRepository.findAll();
        List<ExamResponse> examResponses = convertToListExam(exams);

        return examResponses;
    }

    @Override
    public ExamResponse getIntroExamById(Long id) {
        Exam exams = examRepository.findById(id).orElseThrow(() -> new RuntimeException("id exam not found"));
        return this.convertToExam(exams);
    }

    @Override
    public Exam update(ExamRequest examRequest) {
        Exam exam = examRepository.findById(examRequest.getId()).orElseThrow(() -> new RuntimeException("id exam not found"));
        exam.setExamName(examRequest.getExamName());
        exam.setTotalTime(examRequest.getTotalTime());

        List<Part> parts = new ArrayList<>();
        Part partOne = partRepository.findTopByNumberPart(examRequest.getNumberPartOne());
        Part partTwo = partRepository.findTopByNumberPart(examRequest.getNumberPartTwo());
        Part partThree = partRepository.findTopByNumberPart(examRequest.getNumberPartThree());
        Part partFour = partRepository.findTopByNumberPart(examRequest.getNumberPartFour());
        Part partFive = partRepository.findTopByNumberPart(examRequest.getNumberPartFive());
        Part partSix = partRepository.findTopByNumberPart(examRequest.getNumberPartSix());
        Part partSeven = partRepository.findTopByNumberPart(examRequest.getNumberPartSeven());

        if (partOne != null) parts.add(partOne);
        if (partTwo != null) parts.add(partTwo);
        if (partThree != null) parts.add(partThree);
        if (partFour != null) parts.add(partFour);
        if (partFive != null) parts.add(partFive);
        if (partSix != null) parts.add(partSix);
        if (partSeven != null) parts.add(partSeven);
        if (!parts.isEmpty()) exam.setParts(parts);

        examRepository.save(exam);

        return exam;
    }

    @Override
    public Exam delete(Exam exam) {
        Exam examDB = examRepository.findById(exam.getId()).orElseThrow(() -> new RuntimeException("id not found"));
        examDB.setParts(null);
        examRepository.delete(examDB);
        return examDB;
    }

    private ExamResponse convertToExam(Exam exam) {
        ExamResponse examResponse = new ExamResponse();
        examResponse.setId(exam.getId());
        examResponse.setExamName(exam.getExamName());
        examResponse.setTotalTime(exam.getTotalTime());
        return examResponse;
    }

    private List<ExamResponse> convertToListExam(List<Exam> exams) {
        List<ExamResponse> examResponses = new ArrayList<>();
        for (Exam exam : exams  ) {
            examResponses.add(new ExamResponse(
                    exam.getId(),
                    exam.getExamName(),
                    exam.getTotalTime()
            ));
        }
        return examResponses;
    }
}
