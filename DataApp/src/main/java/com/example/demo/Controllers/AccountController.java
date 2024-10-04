package com.example.demo.Controllers;

import com.example.demo.Models.AccountDetails;
import com.example.demo.Models.Watchlist;
import com.example.demo.Services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping
    public ResponseEntity<AccountDetails> getUserAccount(@RequestParam String username) throws Exception {
        AccountDetails account = accountService.getAccountByUsername(username);
        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(account);
    }

    @GetMapping("/add-watchlist")
    public ResponseEntity<AccountDetails> addWatchList(@RequestParam String username, @RequestParam String watchlistName) throws Exception {
        Watchlist watchlist = new Watchlist(watchlistName);
        AccountDetails account = accountService.addWatchlist(username, watchlist);
        return ResponseEntity.ok(account);
    }

    @GetMapping("/delete-watchlist")
    public ResponseEntity<AccountDetails> deleteWatchlist(@RequestParam String username, @RequestParam String watchlistName) throws Exception {
        AccountDetails account = accountService.deleteWatchlist(username, watchlistName);
        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(account);
    }

    @GetMapping("/add-movie")
    public ResponseEntity<AccountDetails> addMovieToWatchlist(@RequestParam String username, @RequestParam String watchlistname, @RequestParam int id) throws Exception {
        AccountDetails account = accountService.addMovieToWatchlist(username, watchlistname, id);
        return ResponseEntity.ok(account);
    }

    @GetMapping("/delete-movie")
    public ResponseEntity<AccountDetails> deleteMovieFromWatchList(@RequestParam String username, @RequestParam String watchlistname, @RequestParam int id) throws Exception {
        AccountDetails account = accountService.deleteMovieFromWatchlist(username, watchlistname, id);
        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(account);
    }
}

