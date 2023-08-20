import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
import { Movie } from '../interfaces/movie';
@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit, AfterViewInit {

  public searchedMovie:string = '';
  public selectedMovie:Movie | null = null;
  constructor(public movieService:MoviesService,
              private router:Router){}

  ngOnInit(): void {

  }
  ngAfterViewInit(){}

  searchMovies(typedResult:string){
    this.movieService.setMovies(typedResult);
  }
  routeToHome(path:string){
    this.movieService.setMovies('');
    this.router.navigate([path]);
  }
  routeToMovie(){
    this.router.navigate(['details']);
  }
  getMovieData(movieName:string){
    this.movieService.getMovieData(movieName)
      .subscribe(d => {
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
        this.routeToMovie();
      })
  }
}
