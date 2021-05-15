package vn.edu.hnue.toiec.presentation.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMessage<T> {
    private String code;
    private String title;
    private T data;

    public ResponseMessage ok(T data) {
        return new ResponseMessage<T>("200", "ok", data);
    }

    public ResponseMessage<String> badRequest(String data) {
        return new ResponseMessage<String>("404", "badRequest", data);
    }
}
