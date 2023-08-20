import { Injectable } from '@angular/core';
import { Movie } from './interfaces/movie';
import { HttpClient } from "@angular/common/http";
import { text } from 'express';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
  public movies:Movie[] = [];
  constructor(public http:HttpClient) {
    this.setMovies();
  }

  setMovies(){
    this.http.get('assets/FIlm Library.GV.csv', { responseType: 'text' })
      .subscribe(csvData => {
        let csvToRowArray = csvData.split("\n");
        console.log(csvToRowArray);
        for(let i = 1; i < csvToRowArray.length - 1; i++){
          let row = csvToRowArray[i].split(",");
          let movie:Movie = {
            movieNumber: row[0],
            movieName: row[1],
            date: row[2],
            genre: row[3],
            director: row[4],
            mainCast: row[5],
            dvdType: row[6],
            rating: null
          }
          if(movie.movieName !== 'Title'){
            this.movies.push(movie);
          }
        }
        console.log(this.movies)
      })
  }
}
