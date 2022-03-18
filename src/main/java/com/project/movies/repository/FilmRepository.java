package com.project.movies.repository;

import com.project.movies.models.Director;
import com.project.movies.models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FilmRepository extends JpaRepository<Movie,Long> {
    List<Movie> findAll();

    Optional<Movie> findById(Long aLong);

    void deleteById(Long aLong);
}
