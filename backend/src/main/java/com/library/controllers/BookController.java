package com.library.controllers;

import java.util.List;

import com.library.models.Book;
import com.library.repositories.BookRepository;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
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
  public List<Book> getAll() {
    return repo.findAll();
  }

  @GET
  @Path("/{id}")
  public Book get(@PathParam("id") Long id) {
    return repo.find(id);
  }

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  @Transactional
  public Response create(Book book) {
    repo.save(book);
    return Response.created(null).entity(book).build();
  }

  @PUT
  @Path("/{id}")
  @Transactional
  public Book update(@PathParam("id") Long id, Book book) {
    book.setId(id);
    return repo.update(book);
  }

  @DELETE
  @Path("/{id}")
  @Transactional
  public void delete(@PathParam("id") Long id) {
    repo.delete(id);
  }
}
