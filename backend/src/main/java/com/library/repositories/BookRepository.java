package com.library.repositories;

import java.util.List;

import com.library.models.Book;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@ApplicationScoped
public class BookRepository {
  @PersistenceContext(unitName = "libraryPU")
  private EntityManager em;

  public List<Book> findAll(int page, int limit) {
    return em.createQuery("SELECT b FROM Book b", Book.class)
        .setFirstResult((page - 1) * limit)
        .setMaxResults(limit)
        .getResultList();
  }

  public Book find(Long id) {
    return em.find(Book.class, id);
  }

  public void save(Book book) {
    em.persist(book);
  }

  public Book update(Book book) {
    return em.merge(book);
  }

  public void delete(Long id) {
    Book book = find(id);
    if (book != null) {
      em.remove(book);
    }
  }
}
