package vn.edu.hnue.toiec.core.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class APIException extends RuntimeException {
    private HttpStatus httpStatus;
    private String message;

    private APIException() { }
}
