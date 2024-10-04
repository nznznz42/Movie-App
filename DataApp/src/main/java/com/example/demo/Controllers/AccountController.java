package com.example.demo.Controllers;

import com.example.demo.Models.AccountDetails;
import com.example.demo.Models.Watchlist;
import com.example.demo.Services.AccountService;
import info.movito.themoviedbapi.tools.TmdbException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping
    public AccountDetails getUserAccount(@RequestParam String username) {
        return accountService.getAccountByUsername(username);
    }

    @GetMapping("/add-watchlist")
    public AccountDetails addWatchList(@RequestParam String username, @RequestParam String watchlistName) {
        Watchlist watchlist = new Watchlist(watchlistName);
        return accountService.addWatchlist(username, watchlist);
    }

    @GetMapping("/delete-watchlist")
    public AccountDetails deleteWatchlist(@RequestParam String username, @RequestParam String watchlistName) {
        return accountService.deleteWatchlist(username, watchlistName);
    }

    @GetMapping("/add-movie")
    public AccountDetails addMovieToWatchlist(@RequestParam String username, @RequestParam String watchlistname, @RequestParam int id) throws TmdbException {
        return accountService.addMovieToWatchlist(username, watchlistname, id);
    }

    @GetMapping("/delete-movie")
    public AccountDetails deleteMovieFromWatchList(@RequestParam String username, @RequestParam String watchlistname, @RequestParam int id) {
        return accountService.deleteMovieFromWatchlist(username, watchlistname, id);
    }
}
