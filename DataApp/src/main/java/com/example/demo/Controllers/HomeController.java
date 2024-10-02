package com.example.demo.Controllers;


import com.example.demo.Configs.TmdbApiKey;
import com.example.demo.Models.CMovie;
import com.example.demo.Requests.HomeCategory;
import com.example.demo.Requests.HomeCategoryPacket;
import com.example.demo.Requests.HomeResponse;
import com.example.demo.Services.HomeService;
import info.movito.themoviedbapi.TmdbApi;

import info.movito.themoviedbapi.model.core.Movie;
import info.movito.themoviedbapi.model.movies.MovieDb;
import info.movito.themoviedbapi.tools.TmdbException;
import info.movito.themoviedbapi.tools.appendtoresponse.MovieAppendToResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

/*
* TODO: Set up correct error handling and status responses, maybe refactor for added performance
* */

@RestController
@RequestMapping("/home")
@CrossOrigin(originPatterns = "*")
public class HomeController {

    @Autowired
    private HomeService homeService;

    @GetMapping
    public HomeResponse getMoviesForHomePage() throws TmdbException, ExecutionException, InterruptedException {
        CompletableFuture<List<CMovie>> upcomingMovies = homeService.fetchUpcoming(1);
        CompletableFuture<List<CMovie>> nowPlayingMovies = homeService.fetchNowPlaying(1);
        CompletableFuture<List<CMovie>> popularMovies = homeService.fetchPopular(1);
        CompletableFuture<List<CMovie>> topRatedMovies = homeService.fetchTopRated(1);

        CompletableFuture.allOf(upcomingMovies, nowPlayingMovies, popularMovies, topRatedMovies).join();

        HomeCategoryPacket nowPlaying = new HomeCategoryPacket(HomeCategory.NOW_PLAYING, nowPlayingMovies.get());
        HomeCategoryPacket upcoming = new HomeCategoryPacket(HomeCategory.UPCOMING, upcomingMovies.get());
        HomeCategoryPacket popular = new HomeCategoryPacket(HomeCategory.POPULAR, popularMovies.get());
        HomeCategoryPacket topRated = new HomeCategoryPacket(HomeCategory.TOP_RATED, topRatedMovies.get());

        List<HomeCategoryPacket> packets = new ArrayList<>();
        packets.add(nowPlaying);
        packets.add(upcoming);
        packets.add(popular);
        packets.add(topRated);

        return new HomeResponse(packets);
    }

    @GetMapping("/upcoming")
    public List<CMovie> getUpcomingMovies(@RequestParam(value = "page") int page) throws ExecutionException, InterruptedException, TmdbException {
        CompletableFuture<List<CMovie>> upcomingMovies = homeService.fetchUpcoming(page);
        CompletableFuture.allOf(upcomingMovies).join();

        List<CMovie> upcoming = upcomingMovies.get();
        return upcoming;
    }

    @GetMapping("/top-rated")
    public List<CMovie> getTopRated(@RequestParam(value = "page") int page) throws TmdbException, ExecutionException, InterruptedException {
        CompletableFuture<List<CMovie>> topRatedMovies = homeService.fetchTopRated(page);
        CompletableFuture.allOf(topRatedMovies).join();

        List<CMovie> topRated = topRatedMovies.get();
        return topRated;
    }

    @GetMapping("/popular")
    public List<CMovie> getPopular(@RequestParam(value = "page") int page) throws TmdbException, ExecutionException, InterruptedException {
        CompletableFuture<List<CMovie>> popularMovies = homeService.fetchPopular(page);
        CompletableFuture.allOf(popularMovies).join();

        List<CMovie> popular = popularMovies.get();
        return popular;
    }

    @GetMapping("/now-playing")
    public List<CMovie> getNowPlaying(@RequestParam(value = "page") int page) throws TmdbException, ExecutionException, InterruptedException {
        CompletableFuture<List<CMovie>> nowPlayingMovies = homeService.fetchNowPlaying(page);
        CompletableFuture.allOf(nowPlayingMovies).join();

        List<CMovie> nowPlaying = nowPlayingMovies.get();
        return nowPlaying;
    }

}
