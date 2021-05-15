package vn.edu.hnue.toiec.usecases;

import org.springframework.web.multipart.MultipartFile;
import vn.edu.hnue.toiec.data.entities.Exam;

import java.io.InputStream;
import java.util.List;

public interface ExcelService {
    boolean isExcelFormat(MultipartFile file);

    void save(MultipartFile file);

    List<Exam> convertToExam(InputStream inputStream);
}
