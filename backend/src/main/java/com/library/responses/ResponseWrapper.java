package com.library.responses;

import java.util.HashMap;
import java.util.Map;

import jakarta.ws.rs.core.Response;

public class ResponseWrapper {
  public enum Status {
    OK(Response.Status.OK),
    CREATED(Response.Status.CREATED),
    NOT_FOUND(Response.Status.NOT_FOUND),
    SERVER_ERROR(Response.Status.INTERNAL_SERVER_ERROR);

    private final Response.Status status;

    Status(Response.Status status) {
      this.status = status;
    }

    public Response.Status getStatus() {
      return status;
    }
  }

  private final Status status;
  private final Object data;

  public ResponseWrapper(Status status, Object data) {
    this.status = status;
    this.data = data;
  }

  public Response toResponse() {
    return Response.status(status.getStatus()).entity(data).build();
  }

  public static ResponseWrapper error(String message) {
    Map<String, String> error = new HashMap<>();
    error.put("error", message);
    return new ResponseWrapper(Status.SERVER_ERROR, error);
  }
}