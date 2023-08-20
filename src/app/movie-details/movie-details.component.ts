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

export class MovieDetailsComponent implements OnInit {

  public movie:Movie | null = null;

  constructor(public router:Router,
              public movieService:MoviesService){
                this.movieService.emitMovie.subscribe((m) => {
                  this.movie = m;
                })
              }
  
  ngOnInit(){
    this.movieService.emitMovie.subscribe((m) => {
      this.movie = m;
      console.log(this.movie)
      })
  }
  ngAfterViewInit(){
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

}
