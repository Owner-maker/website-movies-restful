package com.project.movies.controllers;

import com.project.movies.models.Director;
import com.project.movies.models.Film;
import com.project.movies.models.User;
import com.project.movies.repository.DirectorRepository;
import com.project.movies.repository.FilmRepository;
import com.project.movies.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MainController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    FilmRepository filmRepository;

    @Autowired
    DirectorRepository directorRepository;

    @GetMapping("/allmovies")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Film> getAllMovies(){
        return filmRepository.findAll();
    }

    @GetMapping("/alldirects")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Director> getAllDirectors(){
        return directorRepository.findAll();
    }

    @GetMapping("/allusers")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/getmovie/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Film getMovieById(@PathVariable Long id){
        return filmRepository.findById(id).orElseThrow(() -> new RuntimeException("Error, movie with id = " + id +"  is not found"));
    }

    @PostMapping ("/addmovie")
    @PreAuthorize("hasRole('ADMIN')")
    public void addMovie(@RequestBody Film movie){
        filmRepository.save(movie);
    }

    @PostMapping ("/updatemovie/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateMovie(@PathVariable Long id, @RequestBody Film movie){
        Film movieToUpdate = filmRepository.findById(id).orElseThrow(() -> new RuntimeException("Error, movie with id = " + id +"  is not found"));
        movieToUpdate.setText(movie.getText());
        movieToUpdate.setTime(movie.getTime());
        movieToUpdate.setTitle(movie.getTitle());
        movieToUpdate.setType(movie.getType());
        movieToUpdate.setUrl(movie.getUrl());
        movieToUpdate.setYear(movie.getYear());
        filmRepository.save(movieToUpdate);
    }

    @DeleteMapping ("/deletemovie/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteMovieById(@PathVariable Long id){
        filmRepository.deleteById(id);
    }

    @GetMapping("/getdirector/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Director getDirectorById(@PathVariable Long id){
        return directorRepository.findById(id).orElseThrow(() -> new RuntimeException("Error, director with id = " + id +"  is not found"));
    }

    @PostMapping ("/adddirector")
    @PreAuthorize("hasRole('ADMIN')")
    public void addDirector(@RequestBody Director director){
        directorRepository.save(director);
    }

    @DeleteMapping("/deletedirector/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteDirectorById(@PathVariable Long id){
        directorRepository.deleteById(id);
    }

    @PostMapping ("/updatedirector/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateDirector(@PathVariable Long id, @RequestBody Director director){
        Director directorToUpdate = directorRepository.findById(id).orElseThrow(() -> new RuntimeException("Error, director with id = " + id +"  is not found"));
        directorToUpdate.setName(director.getName());
        directorToUpdate.setSername(director.getSername());
        directorToUpdate.setUrl(director.getUrl());
        directorToUpdate.setDescription(director.getDescription());
        directorRepository.save(directorToUpdate);
    }
}
