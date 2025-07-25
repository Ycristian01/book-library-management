package com.library.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import com.library.models.Book;
import com.library.repositories.BookRepository;

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
  private BookRepository repo;

  @GET
  public Response getAll(@QueryParam("page") Integer page, @QueryParam("limit") Integer limit) {
    try {
      int currentPage = (page == null || page < 1) ? 1 : page;
      int currentLimit = (limit == null || limit < 1) ? 10 : limit;

      List<Book> books = repo.findAll(currentPage, currentLimit);

      Map<String, Object> response = new HashMap<>();

      response.put("data", books);
      response.put("total", books.size());
      response.put("page", currentPage);
      response.put("limit", currentLimit);

      return Response.ok(response).build();
    } catch (Exception e) {
      e.printStackTrace();
      Map<String, String> error = new HashMap<>();
      error.put("error", "Failed to retrieve books: " + e.getMessage());
      return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
    }
  }

  @GET
  @Path("/{id}")
  public Response get(@PathParam("id") Long id) {
    try {
      Book book = repo.find(id);
      Map<String, Object> response = new HashMap<>();

      if (Objects.nonNull(book)) {
        response.put("data", book);
        return Response.ok(response).build();
      }

      response.put("error", "Book with ID " + id + " not found.");
      return Response.status(Response.Status.NOT_FOUND).entity(response).build();
    } catch (Exception e) {
      e.printStackTrace();
      Map<String, String> error = new HashMap<>();
      error.put("error", "Failed to retrieve book: " + e.getMessage());
      return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
    }
  }

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  @Transactional
  public Response create(@Valid Book book) {
    try {
      repo.save(book);

      Map<String, Object> response = new HashMap<>();
      response.put("data", book);

      return Response.status(Response.Status.CREATED).entity(response).build();
    } catch (Exception e) {
      e.printStackTrace();
      Map<String, String> error = new HashMap<>();
      error.put("error", "Failed to create book: " + e.getMessage());
      return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
    }
  }

  @PUT
  @Path("/{id}")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  @Transactional
  public Response update(@PathParam("id") Long id, @Valid Book book) {
    try {
      Book bookToUpdate = repo.find(id);
      Map<String, Object> response = new HashMap<>();

      if (Objects.isNull(bookToUpdate)) {
        response.put("error", "Book with ID " + id + " not found.");
        return Response.status(Response.Status.NOT_FOUND).entity(response).build();
      }

      book.setId(id);
      Book updated = repo.update(book);
      response.put("data", updated);

      return Response.ok(response).build();
    } catch (Exception e) {
      e.printStackTrace();
      Map<String, Object> error = new HashMap<>();
      error.put("error", "Failed to update book: " + e.getMessage());
      return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
    }
  }

  @DELETE
  @Path("/{id}")
  @Transactional
  public Response delete(@PathParam("id") Long id) {
    try {
      Book bookToDelete = repo.find(id);
      Map<String, Object> response = new HashMap<>();

      if (Objects.isNull(bookToDelete)) {
        response.put("error", "Book with ID " + id + " not found.");
        return Response.status(Response.Status.NOT_FOUND).entity(response).build();
      }

      repo.delete(id);

      response.put("data", "Book with ID " + id + " deleted succesfully");
      return Response.ok(response).build();
    } catch (Exception e) {
      e.printStackTrace();
      Map<String, Object> error = new HashMap<>();
      error.put("error", "Failed to delete book: " + e.getMessage());
      return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
    }
  }
}
