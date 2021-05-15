package vn.edu.hnue.toiec.usecases.Impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sun.rmi.runtime.Log;
import vn.edu.hnue.toiec.data.entities.Exam;
import vn.edu.hnue.toiec.data.entities.Part;
import vn.edu.hnue.toiec.data.repository.ExamRepository;
import vn.edu.hnue.toiec.data.repository.PartRepository;
import vn.edu.hnue.toiec.presentation.model.PartRequest;
import vn.edu.hnue.toiec.presentation.model.PartResponse;
import vn.edu.hnue.toiec.usecases.PartService;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Slf4j
public class PartServiceImpl implements PartService {

    @Autowired
    private PartRepository partRepository;

    @Autowired
    private ExamRepository examRepository;

    @Override
    public Part createPart(PartRequest partRequest) {
        Part part = new Part();
        if (partRepository.existsByNumberPart(partRequest.getNumberPart())) {
            log.info("Number Part Đã Tồn Tại");
        } else {
            part.setNumberPart(partRequest.getNumberPart());
            part.setPartName(partRequest.getPartName());
            part.setPartDesc(partRequest.getPartDesc());
            partRepository.save(part);
        }

        return part;
    }

    @Override
    public Part updatePart(PartRequest partRequest) {
        Part part = partRepository.findById(partRequest.getId()).orElseThrow(() -> new RuntimeException("PART ID NOT FOUND"));
        part.setPartName(partRequest.getPartName());
        part.setPartDesc(partRequest.getPartDesc());
        partRepository.save(part);
        return part;
    }

    @Transactional
    @Override
    public Part delete(PartResponse partResponse) {
        Part part = partRepository.findById(partResponse.getId()).orElseThrow(() -> new RuntimeException("PART ID NOT FOUND"));
        if (part != null) {
            Exam exam = examRepository.findByPartsContains(part);
            if (exam != null) {
                exam.getParts().remove(part);
                examRepository.save(exam);
            }
            partRepository.delete(part);
        }
        return part;
    }

    @Override
    public List<PartResponse> getAllParts() {
        List<Part> parts = partRepository.findAll();
        List<PartResponse> partResponses = convertToPartRes(parts);
        return partResponses;
    }

    @Override
    public List<PartResponse> getAllNumberPart() {
        List<Part> parts = partRepository.findAllByNumberPart();
        List<PartResponse> partResponses = convertToNumberPart(parts);

        return partResponses;
    }

    @Override
    public List<PartResponse> getAllNumberPartOne() {
        List<Part> partOne = partRepository.findAllNumberPartOne();
        List<PartResponse> partResponses = convertToNumberPart(partOne);

        return partResponses;
    }

    @Override
    public List<PartResponse> getAllNumberPartTwo() {
        List<Part> partTwo = partRepository.findAllNumberPartTwo();
        List<PartResponse> partResponses = convertToNumberPart(partTwo);

        return partResponses;
    }

    @Override
    public List<PartResponse> getAllNumberPartThree() {
        List<Part> partThree = partRepository.findAllNumberPartThree();
        List<PartResponse> partResponses = convertToNumberPart(partThree);

        return partResponses;
    }

    @Override
    public List<PartResponse> getAllNumberPartFour() {
        List<Part> partFour = partRepository.findAllNumberPartFour();
        List<PartResponse> partResponses = convertToNumberPart(partFour);

        return partResponses;
    }

    @Override
    public List<PartResponse> getAllNumberPartFive() {
        List<Part> partFive = partRepository.findAllNumberPartFive();
        List<PartResponse> partResponses = convertToNumberPart(partFive);

        return partResponses;
    }

    @Override
    public List<PartResponse> getAllNumberPartSix() {
        List<Part> partSix = partRepository.findAllNumberPartSix();
        List<PartResponse> partResponses = convertToNumberPart(partSix);

        return partResponses;
    }

    @Override
    public List<PartResponse> getAllNumberPartSeven() {
        List<Part> partSeven = partRepository.findAllNumberPartSeven();
        List<PartResponse> partResponses = convertToNumberPart(partSeven);

        return partResponses;
    }

    @Override
    public Specification<Part> searchAllPart(String keyword) {
        if(!keyword.contains("%")) keyword = "%" + keyword + "%";
        final String finalKeyword = keyword;

        return new Specification<Part>() {
            @Override
            public Predicate toPredicate(Root<Part> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.or(root.getModel().getDeclaredSingularAttributes().stream().filter(i -> {
                    if (i.getJavaType().getSimpleName().equalsIgnoreCase("string")) {
                        return true;
                    } else {
                        return false;
                    }
                }).map(i -> criteriaBuilder.like(root.get(i.getName()), finalKeyword)).toArray(Predicate[]::new));
            }
        };
    }

    public List<PartResponse> convertToNumberPart(List<Part> parts) {
        List<PartResponse> partResponses = new ArrayList<>();

        for (Part part : parts) {
            partResponses.add(new PartResponse(part.getNumberPart()));
        }
        return partResponses;
    }

    public List<PartResponse> convertToPartRes(List<Part> parts) {
        List<PartResponse> partResponses = new ArrayList<>();

        for (Part part : parts) {
            partResponses.add(new PartResponse(
                part.getId(),
                part.getNumberPart(),
                part.getPartName(),
                part.getPartDesc()
            ));
        }
        return partResponses;
    }

}
