package com.project.movies.repository;

import com.project.movies.models.Film;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FilmRepository extends JpaRepository<Film,Long> {
    List<Film> findAll();

    Optional<Film> findById(Long aLong);

    void deleteById(Long aLong);
}
