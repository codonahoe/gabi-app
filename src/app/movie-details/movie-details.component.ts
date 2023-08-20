import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})

export class MovieDetailsComponent {

  public movie:Movie | null = null;

  constructor(public router:Router,
              public movieService:MoviesService){
                this.movieService.emitMovie.subscribe((m) => {
                  this.movie = m;
                })
              }


  routeToHome(path:string){
    this.movieService.setMovies('');
    this.router.navigate([path]);
  }

  routeToMovies(path:string){
    this.movieService.setMovies('');
    this.router.navigate([path]);
  }

  previousMovie(){
    for(let i = 0; i < this.movieService.movies.length; i++){
      if(this.movie?.movieNumber === this.movieService.movies[i].movieNumber){
        this.movieService.getMovieData(this.movieService.movies[i - 1].movieName)
        .subscribe((d) => {
          if(!this.movieService.selectedMovie) return;
            const movie:Movie = {
            movieName:d.Title,
            director:d.Director,
            date:d.Year,
            movieNumber:this.movieService.selectedMovie?.movieNumber,
            genre:d.Genre,
            mainCast:d.Actors,
            dvdType:this.movieService.selectedMovie.dvdType,
            rating:d.Ratings[1].Value,
            poster:d.Poster,
            plot:d.Plot,
          }
        this.movieService.emitMovie.next(movie);
      })
      break;
      }
    }
  }
  nextMovie(){
    for(let i = 0; i < this.movieService.movies.length; i++){
      if(this.movie?.movieNumber === this.movieService.movies[i].movieNumber){
        this.movieService.getMovieData(this.movieService.movies[i + 1].movieName)
        .subscribe((d) => {
          if(!this.movieService.selectedMovie) return;
          if(!d.Ratings[1]){
            const movie:Movie = {
              movieName:d.Title,
              director:d.Director,
              date:d.Year,
              movieNumber:this.movieService.selectedMovie?.movieNumber,
              genre:d.Genre,
              mainCast:d.Actors,
              dvdType:this.movieService.selectedMovie.dvdType,
              rating:d.Ratings[0].Value,
              poster:d.Poster,
              plot:d.Plot,
            }
            this.movieService.emitMovie.next(movie);
          }
          else{
            const movie:Movie = {
            movieName:d.Title,
            director:d.Director,
            date:d.Year,
            movieNumber:this.movieService.selectedMovie?.movieNumber,
            genre:d.Genre,
            mainCast:d.Actors,
            dvdType:this.movieService.selectedMovie.dvdType,
            rating:d.Ratings[1].Value ? d.Ratings[1].Value : d.Ratings[0].Value,
            poster:d.Poster,
            plot:d.Plot,
          }
          this.movieService.emitMovie.next(movie);
        }
      })
      break;
      }
    }

  }

}
