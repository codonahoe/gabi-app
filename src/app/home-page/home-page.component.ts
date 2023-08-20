import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
    title = 'gabi-movie-app';

    constructor(private router:Router,
                public movieService:MoviesService){}

    ngOnInit(): void {
    }
    routeToMovies(path:string){
      this.movieService.setMovies('');
      this.router.navigate([path]);
  }
}
