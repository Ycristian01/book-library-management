package com.library.controllers;

import com.library.models.Book;
import com.library.responses.ResponseWrapper;
import com.library.services.BookService;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/books")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@RequestScoped
public class BookController {
  @Inject
  private BookService service;

  @GET
  public Response getAll(@QueryParam("page") Integer page, @QueryParam("limit") Integer limit) {
    try {
      return service.getAll(page, limit).toResponse();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseWrapper.error("Failed to retrieve books: " + e.getMessage()).toResponse();
    }
  }

  @GET
  @Path("/{id}")
  public Response get(@PathParam("id") Long id) {
    try {
      return service.getById(id).toResponse();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseWrapper.error("Failed to retrieve book: " + e.getMessage()).toResponse();
    }
  }

  @POST
  @Transactional
  public Response create(@Valid Book book) {
    try {
      return service.create(book).toResponse();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseWrapper.error("Failed to create book: " + e.getMessage()).toResponse();
    }
  }

  @PUT
  @Path("/{id}")
  @Transactional
  public Response update(@PathParam("id") Long id, @Valid Book book) {
    try {
      return service.update(id, book).toResponse();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseWrapper.error("Failed to update book: " + e.getMessage()).toResponse();
    }
  }

  @DELETE
  @Path("/{id}")
  @Transactional
  public Response delete(@PathParam("id") Long id) {
    try {
      return service.delete(id).toResponse();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseWrapper.error("Failed to delete book: " + e.getMessage()).toResponse();
    }
  }
}
