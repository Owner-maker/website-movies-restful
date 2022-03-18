package com.project.movies.repository;

import com.project.movies.models.Director;
import com.project.movies.models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DirectorRepository extends JpaRepository<Director,Long> {
    List<Director> findAll();

    Optional<Director> findById(Long aLong);

    void deleteById(Long aLong);
}
