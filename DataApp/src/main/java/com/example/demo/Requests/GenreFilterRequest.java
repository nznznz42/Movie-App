package com.example.demo.Requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GenreFilterRequest {
    private List<Integer> genres;
    private Boolean orQuery;
    private int pageNumber;
}
