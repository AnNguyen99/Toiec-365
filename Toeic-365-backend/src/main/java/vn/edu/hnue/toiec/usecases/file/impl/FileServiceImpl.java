package vn.edu.hnue.toiec.usecases.file.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import vn.edu.hnue.toiec.core.exception.FileStorageException;
import vn.edu.hnue.toiec.presentation.model.FileResponse;
import vn.edu.hnue.toiec.usecases.file.FileService;
import vn.edu.hnue.toiec.usecases.file.FileStorageProperties;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
@Slf4j
public class FileServiceImpl implements FileService {
    private Path fileStorageLocation;

    public FileServiceImpl(FileStorageProperties properties) {
        this.fileStorageLocation = Paths.get(properties.getLocation());
    }

    @PostConstruct
    public void init() {
        try {
            if (Files.notExists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            } else {
                log.debug("{} is already existed.", fileStorageLocation.toAbsolutePath().toString());
            }
        } catch (IOException e)  {
            throw new FileStorageException("Could not initialize storage location", e);
        }
    }

    @Override
    public String store(MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            if (file.isEmpty()){
                throw new FileStorageException("Failed to store empty file: " + fileName);
            }
            if (fileName.contains("..")){
                throw new FileStorageException("Cannot store file with relative path outside current directory: " + fileName);
            }
            try(InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, this.fileStorageLocation.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e){
            throw new FileStorageException("Failed to store file " + fileName, e);
        }
        return fileName;
    }

    @Override
    public FileResponse uploadFile(MultipartFile file) {
        String name = store(file);
        String uri = ServletUriComponentsBuilder.fromCurrentContextPath()
                                                .path("/download")
                                                .path(name)
                                                .toUriString();
        return new FileResponse(name);
    }
}
