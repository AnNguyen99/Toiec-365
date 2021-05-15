package vn.edu.hnue.toiec.presentation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileResponse {

    private String name;
    private String uri;
    private String type;
    private long size;

    public FileResponse(String name) {
        this.name = name;
    }
}
