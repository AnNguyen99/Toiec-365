package vn.edu.hnue.toiec.usecases.file;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Data
@Component
public class FileStorageProperties {

    @Value("${file.upload-dir}")
    private String location;
}
