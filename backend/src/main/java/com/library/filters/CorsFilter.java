package com.library.filters;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;
import jakarta.ws.rs.core.Response;
import java.io.IOException;

@Provider
public class CorsFilter implements ContainerResponseFilter {

  @Override
  public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext)
      throws IOException {

    String frontendUrl = System.getenv("FRONTEND_URL");
    if (frontendUrl == null) {
      frontendUrl = "http://localhost:3000";
    }

    responseContext.getHeaders().add("Access-Control-Allow-Origin", frontendUrl);
    responseContext.getHeaders().add("Access-Control-Allow-Headers",
        "origin, content-type, accept, authorization, x-requested-with");
    responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
    responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH");

    if ("OPTIONS".equalsIgnoreCase(requestContext.getMethod())) {
      responseContext.setStatus(Response.Status.OK.getStatusCode());
    }
  }
}