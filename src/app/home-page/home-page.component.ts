import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
    title = 'gabi-movie-app';

    constructor(private router:Router){}

    routeToMovies(path:string){
      this.router.navigate([path]);
  }
}
