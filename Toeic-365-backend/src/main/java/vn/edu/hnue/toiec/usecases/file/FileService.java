package vn.edu.hnue.toiec.usecases.file;

import org.springframework.web.multipart.MultipartFile;
import vn.edu.hnue.toiec.presentation.model.FileResponse;

public interface FileService {
    String store (MultipartFile file);

    FileResponse uploadFile(MultipartFile file);
}
