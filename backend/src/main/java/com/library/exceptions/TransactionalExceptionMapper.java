package com.library.exceptions;

import jakarta.transaction.TransactionalException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

import java.util.HashMap;
import java.util.Map;

@Provider
public class TransactionalExceptionMapper implements ExceptionMapper<TransactionalException> {

  @Override
  public Response toResponse(TransactionalException exception) {
    Map<String, Object> response = new HashMap<>();
    String message = "Transaction error: " + getDeepestMessage(exception);
    response.put("error", message);

    return Response.status(Response.Status.BAD_REQUEST).entity(response).build();
  }

  private String getDeepestMessage(Throwable ex) {
    Throwable cause = ex;
    while (cause.getCause() != null) {
      cause = cause.getCause();
    }
    return cause.getMessage();
  }
}
