package com.library.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import com.library.models.Book;
import com.library.repositories.BookRepository;
import com.library.responses.ResponseWrapper;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class BookService {

  @Inject
  private BookRepository repo;

  public ResponseWrapper getAll(Integer page, Integer limit) {
    int currentPage = (page == null || page < 1) ? 1 : page;
    int currentLimit = (limit == null || limit < 1) ? 10 : limit;

    List<Book> books = repo.findAll(currentPage, currentLimit);
    long total = repo.countAll();

    Map<String, Object> response = new HashMap<>();
    response.put("data", books);
    response.put("total", total);
    response.put("page", currentPage);
    response.put("limit", currentLimit);

    return new ResponseWrapper(ResponseWrapper.Status.OK, response);
  }

  public ResponseWrapper getById(Long id) {
    Book book = repo.find(id);
    if (Objects.isNull(book)) {
      return new ResponseWrapper(ResponseWrapper.Status.NOT_FOUND, "Book with ID " + id + " not found.");
    }

    Map<String, Object> response = new HashMap<>();
    response.put("data", book);
    return new ResponseWrapper(ResponseWrapper.Status.OK, response);
  }

  public ResponseWrapper create(Book book) {
    repo.save(book);
    Map<String, Object> response = new HashMap<>();
    response.put("data", book);
    return new ResponseWrapper(ResponseWrapper.Status.CREATED, response);
  }

  public ResponseWrapper update(Long id, Book book) {
    Book existing = repo.find(id);
    if (Objects.isNull(existing)) {
      return new ResponseWrapper(ResponseWrapper.Status.NOT_FOUND, "Book with ID " + id + " not found.");
    }

    book.setId(id);
    Book updated = repo.update(book);

    Map<String, Object> response = new HashMap<>();
    response.put("data", updated);
    return new ResponseWrapper(ResponseWrapper.Status.OK, response);
  }

  public ResponseWrapper delete(Long id) {
    Book existing = repo.find(id);
    if (Objects.isNull(existing)) {
      return new ResponseWrapper(ResponseWrapper.Status.NOT_FOUND, "Book with ID " + id + " not found.");
    }

    repo.delete(id);

    Map<String, Object> response = new HashMap<>();
    response.put("data", "Book with ID " + id + " deleted successfully");
    return new ResponseWrapper(ResponseWrapper.Status.OK, response);
  }
}
