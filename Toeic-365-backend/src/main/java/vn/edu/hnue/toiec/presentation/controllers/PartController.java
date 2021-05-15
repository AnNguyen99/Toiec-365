package vn.edu.hnue.toiec.presentation.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hnue.toiec.data.entities.Part;
import vn.edu.hnue.toiec.presentation.model.PartRequest;
import vn.edu.hnue.toiec.presentation.model.PartResponse;
import vn.edu.hnue.toiec.usecases.PartService;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
@CrossOrigin("*")
public class PartController {

    @Autowired
    private PartService partService;

    @PostMapping("/search")
    public ResponseEntity<Specification<Part>> searchAllPart(@RequestBody String keyword) {
        return new ResponseEntity<>(partService.searchAllPart(keyword), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<PartResponse>> getAllParts() {
        return new ResponseEntity<>(partService.getAllParts(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Part> createPart(@RequestBody PartRequest partRequest) {
        return new ResponseEntity<>(partService.createPart(partRequest), HttpStatus.CREATED);
    }

    @PostMapping("/update")
    public ResponseEntity<Part> updatePart(@RequestBody PartRequest partRequest) {
        return new ResponseEntity<>(partService.updatePart(partRequest), HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<Part> deletePart(@RequestBody PartResponse partResponse) {
        return new ResponseEntity(partService.delete(partResponse), HttpStatus.OK);
    }

    @GetMapping("/number")
    public ResponseEntity<List<PartResponse>> getAllNumberPart() {
        return new ResponseEntity<>(partService.getAllNumberPart(), HttpStatus.OK);
    }

    @GetMapping("/one")
    public ResponseEntity<List<PartResponse>> getAllNumberPartOne() {
        return new ResponseEntity<>(partService.getAllNumberPartOne(), HttpStatus.OK);
    }

    @GetMapping("/two")
    public ResponseEntity<List<PartResponse>> getAllNumberPartTwo() {
        return new ResponseEntity<>(partService.getAllNumberPartTwo(), HttpStatus.OK);
    }

    @GetMapping("/three")
    public ResponseEntity<List<PartResponse>> getAllNumberPartThree() {
        return new ResponseEntity<>(partService.getAllNumberPartThree(), HttpStatus.OK);
    }

    @GetMapping("/four")
    public ResponseEntity<List<PartResponse>> getAllNumberPartFour() {
        return new ResponseEntity<>(partService.getAllNumberPartFour(), HttpStatus.OK);
    }

    @GetMapping("/five")
    public ResponseEntity<List<PartResponse>> getAllNumberPartFive() {
        return new ResponseEntity<>(partService.getAllNumberPartFive(), HttpStatus.OK);
    }

    @GetMapping("/six")
    public ResponseEntity<List<PartResponse>> getAllNumberPartSix() {
        return new ResponseEntity<>(partService.getAllNumberPartSix(), HttpStatus.OK);
    }

    @GetMapping("/seven")
    public ResponseEntity<List<PartResponse>> getAllNumberPartSeven() {
        return new ResponseEntity<>(partService.getAllNumberPartSeven(), HttpStatus.OK);
    }

}
