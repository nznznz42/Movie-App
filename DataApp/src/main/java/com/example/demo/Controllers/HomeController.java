package com.example.demo.Controllers;


import com.example.demo.Configs.TmdbApiKey;
import com.example.demo.Models.CMovie;
import com.example.demo.Requests.HomeCategory;
import com.example.demo.Requests.HomeCategoryPacket;
import com.example.demo.Requests.HomeResponse;
import info.movito.themoviedbapi.TmdbApi;

import info.movito.themoviedbapi.model.core.Movie;
import info.movito.themoviedbapi.model.movies.MovieDb;
import info.movito.themoviedbapi.tools.TmdbException;
import info.movito.themoviedbapi.tools.appendtoresponse.MovieAppendToResponse;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/home")
@CrossOrigin(originPatterns = "*")
public class HomeController {

    private final TmdbApiKey apiKey;
    private final TmdbApi api;

    public HomeController(TmdbApiKey apiKey) {
        this.apiKey = apiKey;
        this.api = new TmdbApi(apiKey.apiKey());
    }

    @GetMapping
    public HomeResponse getMoviesForHomePage() throws TmdbException {
        List<Movie> nowPlayingApi = api.getMovieLists().getNowPlaying("en-US", 1, "US").getResults();
        List<Movie> upcomingApi = api.getMovieLists().getUpcoming("en-US", 1, "US").getResults();
        List<Movie> popularApi = api.getMovieLists().getPopular("en-US", 1, "US").getResults();
        List<Movie> topRatedApi = api.getMovieLists().getTopRated("en-US", 1, "US").getResults();

        List<CMovie> nowPlayingMovies = new ArrayList<>();

        for(Movie movie: nowPlayingApi) {
            MovieDb movieDetails = api.getMovies().getDetails(movie.getId(), "en-US", MovieAppendToResponse.VIDEOS);
            nowPlayingMovies.add(CMovie.convertMovieDbToMovie(movieDetails));
        }
        HomeCategoryPacket nowPlaying = new HomeCategoryPacket(HomeCategory.NOW_PLAYING, nowPlayingMovies);

        List<CMovie> upcomingMovies = new ArrayList<>();

        for(Movie movie: upcomingApi) {
            MovieDb movieDetails = api.getMovies().getDetails(movie.getId(), "en-US", MovieAppendToResponse.VIDEOS);
            upcomingMovies.add(CMovie.convertMovieDbToMovie(movieDetails));
        }

        HomeCategoryPacket upcoming = new HomeCategoryPacket(HomeCategory.UPCOMING, upcomingMovies);

        List<CMovie> popularMovies = new ArrayList<>();

        for(Movie movie: popularApi) {
            MovieDb movieDetails = api.getMovies().getDetails(movie.getId(), "en-US", MovieAppendToResponse.VIDEOS);
            popularMovies.add(CMovie.convertMovieDbToMovie(movieDetails));
        }

        HomeCategoryPacket popular = new HomeCategoryPacket(HomeCategory.POPULAR, popularMovies);

        List<CMovie> topRatedMovies = new ArrayList<>();

        for(Movie movie: topRatedApi) {
            MovieDb movieDetails = api.getMovies().getDetails(movie.getId(), "en-US", MovieAppendToResponse.VIDEOS);
            topRatedMovies.add(CMovie.convertMovieDbToMovie(movieDetails));
        }

        HomeCategoryPacket topRated = new HomeCategoryPacket(HomeCategory.TOP_RATED, topRatedMovies);

        List<HomeCategoryPacket> packets = new ArrayList<>();
        packets.add(nowPlaying);
        packets.add(upcoming);
        packets.add(popular);
        packets.add(topRated);

        return new HomeResponse(packets);
    }

    @GetMapping("/upcoming")
    public List<CMovie> getUpcoming(@RequestParam(value = "page") int page) throws TmdbException {
        List<Movie> upcomingApi = api.getMovieLists().getUpcoming("en-US", page, "US").getResults();
        List<CMovie> upcomingMovies = new ArrayList<>();

        for(Movie movie: upcomingApi) {
            MovieDb movieDetails = api.getMovies().getDetails(movie.getId(), "en-US", MovieAppendToResponse.VIDEOS);
            upcomingMovies.add(CMovie.convertMovieDbToMovie(movieDetails));
        }

        return upcomingMovies;
    }

    @GetMapping("/top-rated")
    public List<CMovie> getTopRated(@RequestParam(value = "page") int page) throws TmdbException {
        List<Movie> topRatedApi = api.getMovieLists().getTopRated("en-US", page, "US").getResults();
        List<CMovie> topRatedMovies = new ArrayList<>();

        for(Movie movie: topRatedApi) {
            MovieDb movieDetails = api.getMovies().getDetails(movie.getId(), "en-US", MovieAppendToResponse.VIDEOS);
            topRatedMovies.add(CMovie.convertMovieDbToMovie(movieDetails));
        }

        return topRatedMovies;
    }

    @GetMapping("/popular")
    public List<CMovie> getPopular(@RequestParam(value = "page") int page) throws TmdbException {
        List<Movie> popularApi = api.getMovieLists().getPopular("en-US", page, "US").getResults();
        List<CMovie> popularMovies = new ArrayList<>();

        for(Movie movie: popularApi) {
            MovieDb movieDetails = api.getMovies().getDetails(movie.getId(), "en-US", MovieAppendToResponse.VIDEOS);
            popularMovies.add(CMovie.convertMovieDbToMovie(movieDetails));
        }

        return popularMovies;
    }

    @GetMapping("/now-playing")
    public List<CMovie> getNowPlaying(@RequestParam(value = "page") int page) throws TmdbException {
        List<Movie> nowPlayingApi = api.getMovieLists().getNowPlaying("en-US", page, "US").getResults();
        List<CMovie> nowPlayingMovies = new ArrayList<>();

        for(Movie movie: nowPlayingApi) {
            MovieDb movieDetails = api.getMovies().getDetails(movie.getId(), "en-US", MovieAppendToResponse.VIDEOS);
            nowPlayingMovies.add(CMovie.convertMovieDbToMovie(movieDetails));
        }

        return nowPlayingMovies;
    }

}
