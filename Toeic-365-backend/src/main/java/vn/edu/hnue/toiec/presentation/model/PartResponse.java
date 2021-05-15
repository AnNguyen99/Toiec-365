package vn.edu.hnue.toiec.presentation.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PartResponse {

    private Long id;
    private String numberPart;
    private String partName;
    private String PartDesc;

    public PartResponse(String numberPart) {
        this.numberPart = numberPart;
    }
}
