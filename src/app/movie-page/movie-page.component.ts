import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit, AfterViewInit {

  public searchedMovie:string = '';
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
  
  getMovieData(movieName:string){
    this.movieService.getMovieData(movieName)
      .subscribe(d => console.log(d))
  }
}
