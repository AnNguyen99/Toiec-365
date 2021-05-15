package vn.edu.hnue.toiec.presentation.advisor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import vn.edu.hnue.toiec.core.exception.APIException;
import vn.edu.hnue.toiec.presentation.model.ErrorResponse;

@RestControllerAdvice
public class AuthControllerAdvisor extends ResponseEntityExceptionHandler {

    @ExceptionHandler(APIException.class)
    public ResponseEntity<ErrorResponse> handleAPIException(APIException e) {
        return new ResponseEntity<>(ErrorResponse.fromException(e), e.getHttpStatus());
    }

    @ExceptionHandler(Exception.class)
    private ResponseEntity<ErrorResponse> handleAllException(Exception e) {
        return new ResponseEntity<>(ErrorResponse.fromException(e), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
