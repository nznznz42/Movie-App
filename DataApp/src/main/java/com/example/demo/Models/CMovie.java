package com.example.demo.Models;

import info.movito.themoviedbapi.model.core.Genre;
import info.movito.themoviedbapi.model.core.Movie;
import info.movito.themoviedbapi.model.core.ProductionCountry;
import info.movito.themoviedbapi.model.core.video.Video;
import info.movito.themoviedbapi.model.movies.MovieDb;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CMovie {
    private int id;
    private String backdropPath;
    private List<String> genres;
    private List<String> trailers;
    private List<String> countries;
    private String original_language;
    private String original_title;
    private String overview;
    private String release_date;
    private int runtime;
    private double vote_average;
    private String status;
    private String posterPath;

    public static CMovie convertMovieDbToMovie(MovieDb movieDb) {
        CMovie movie = new CMovie();
        movie.setId(movieDb.getId());
        movie.setBackdropPath(movieDb.getBackdropPath());

        List<Genre> genres = movieDb.getGenres();
        List<String> genres_str = new ArrayList<>();

        for(Genre genre: genres) {
            genres_str.add(genre.getName());
        }

        movie.setGenres(genres_str);

        List<Video> videos = movieDb.getVideos().getResults();
        List<String> trailers = new ArrayList<>();

        for(Video video: videos) {
            if(video.getType().equals("Trailer")  && video.getSite().equals("YouTube") && video.getOfficial()) {
                trailers.add(video.getKey());
            }
        }

        movie.setTrailers(trailers);

        List<ProductionCountry> prodCountries = movieDb.getProductionCountries();
        List<String> countries = new ArrayList<>();

        for(ProductionCountry country: prodCountries) {
            countries.add(country.getName());
        }

        movie.setCountries(countries);

        movie.setOriginal_language(movieDb.getOriginalLanguage());
        movie.setOriginal_title(movieDb.getOriginalTitle());
        movie.setOverview(movieDb.getOverview());
        movie.setRelease_date(movieDb.getReleaseDate());
        movie.setRuntime(movieDb.getRuntime());
        movie.setVote_average(movieDb.getVoteAverage());
        movie.setStatus(movieDb.getStatus());
        movie.setPosterPath(movieDb.getPosterPath());

        return movie;
    }
}

/*
* MovieDb(adult=false, backdropPath=/Asg2UUwipAdE87MxtJy7SQo08XI.jpg,
* belongsToCollection=null, budget=50000000, genres=[NamedIdElement(name=Action), NamedIdElement(name=Fantasy), NamedIdElement(name=Horror), NamedIdElement(name=Thriller), NamedIdElement(name=Crime)],
* homepage=https://thecrow.movie/, imdbID=tt1340094, originalLanguage=en, originalTitle=The Crow,
* overview= overview text, popularity=1590.34, posterPath=/58QT4cPJ2u2TqWZkterDq9q4yxQ.jpg,
* productionCompanies=[ProductionCompany(logoPath=/kZ99mxyNvNgyAFjm7rcl9vfYmU8.png, originCountry=FR), ProductionCompany(logoPath=/mc3rMk0tW5ajjbfqkB8xlp85Cdy.png, originCountry=US), ProductionCompany(logoPath=null, originCountry=US), ProductionCompany(logoPath=/oV2FZfhRcEc1HReC66e1L4t2qPV.png, originCountry=GB), ProductionCompany(logoPath=/tKIimrvYUH02D4km00lCEDUYvIF.png, originCountry=US), ProductionCompany(logoPath=/hu0qcD4k7kfWpdAewqmJSUyZPa7.png, originCountry=US), ProductionCompany(logoPath=/15T4Bx9M21VUwtWF6HcKJhew8ex.png, originCountry=CN)], productionCountries=[ProductionCountry(isoCode=FR, name=France),
* ProductionCountry(isoCode=US, name=United States of America), ProductionCountry(isoCode=GB, name=United Kingdom), ProductionCountry(isoCode=HK, name=Hong Kong)],
* releaseDate=2024-08-21, revenue=13690814, runtime=111, spokenLanguages=[Language(iso6391=en, englishName=English, name=English)],
* status=Released, tagline=True love never dies., title=The Crow, video=false, voteAverage=5.409, voteCount=450, accountStates=null,
*  alternativeTitles=null, credits=null, changes=null, externalIds=null, images=null, keywords=null, recommendations=null, releaseDates=null, lists=null, reviews=null,
* similar=null, translations=null,
* videos=Results(results=[Video(iso6391=en, iso31661=US, key=cT4CCK3lxiI, site=YouTube, size=1080, type=Teaser, official=true, publishedAt=2024-08-16T18:02:48.000Z),
* Video(iso6391=en, iso31661=US, key=AOnjHigFVa8, site=YouTube, size=1080, type=Clip, official=true, publishedAt=2024-08-16T16:49:15.000Z),
* Video(iso6391=en, iso31661=US, key=2wNOfSJDAoU, site=YouTube, size=1080, type=Clip, official=true, publishedAt=2024-08-14T17:00:19.000Z),
* Video(iso6391=en, iso31661=US, key=9ttwmSTaX1A, site=YouTube, size=1080, type=Teaser, official=true, publishedAt=2024-08-13T09:24:27.000Z),
* Video(iso6391=en, iso31661=US, key=VLFljn4gdKk, site=YouTube, size=1080, type=Teaser, official=true, publishedAt=2024-08-13T09:24:15.000Z),
* Video(iso6391=en, iso31661=US, key=Oz2tuUvzevk, site=YouTube, size=1080, type=Teaser, official=true, publishedAt=2024-08-13T09:23:59.000Z),
* Video(iso6391=en, iso31661=US, key=HFlSCFy2sKQ, site=YouTube, size=1080, type=Teaser, official=true, publishedAt=2024-08-13T09:23:30.000Z),
* Video(iso6391=en, iso31661=US, key=4CLE3pWAAr8, site=YouTube, size=1080, type=Trailer, official=true, publishedAt=2024-08-05T08:25:46.000Z),
* Video(iso6391=en, iso31661=US, key=iFuT1BsZRiw, site=YouTube, size=1080, type=Clip, official=true, publishedAt=2024-07-25T19:00:15.000Z),
* Video(iso6391=en, iso31661=US, key=djSKp_pwmOA, site=YouTube, size=2160, type=Trailer, official=true, publishedAt=2024-03-14T14:00:03.000Z),
* Video(iso6391=en, iso31661=US, key=VzXAsxGLEQI, site=YouTube, size=1080, type=Teaser, official=true, publishedAt=2024-03-13T16:14:01.000Z)]),
* watchProviders=null)

 * */
