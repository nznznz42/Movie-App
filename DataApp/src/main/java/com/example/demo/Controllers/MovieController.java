package com.example.demo.Controllers;

import com.example.demo.Models.CMovie;
import com.example.demo.Requests.MovieResponse;
import com.example.demo.Services.MovieService;
import info.movito.themoviedbapi.tools.TmdbException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/movie")
@CrossOrigin(originPatterns = "*")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/{id}")
    public MovieResponse getMovieDetails(@PathVariable("id") int id) throws TmdbException, ExecutionException, InterruptedException {
        CompletableFuture<CMovie> movie = movieService.fetchMovieById(id);
        CompletableFuture<List<CMovie>> similarMovies = movieService.fetchSimilarMovies(id, 1);
        CompletableFuture.allOf(movie, similarMovies).join();

        return new MovieResponse(movie.get(), similarMovies.get());
    }

    @GetMapping("/{id}/similar")
    public List<CMovie> getMoreSimilarMovies(@PathVariable("id") int id, @RequestParam("page") int page) throws TmdbException, ExecutionException, InterruptedException {
        CompletableFuture<List<CMovie>> similarMovies = movieService.fetchSimilarMovies(id, page);
        CompletableFuture.completedFuture(similarMovies).join();
        return similarMovies.get();
    }
}
