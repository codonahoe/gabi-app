import { Injectable } from '@angular/core';
import { Movie } from './interfaces/movie';
import { HttpClient } from "@angular/common/http";
import { text } from 'express';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
  public movies:Movie[] = [];
  constructor(public http:HttpClient) {
    this.setMovies('');
  }

  setMovies(typedResult:string){
    this.http.get('assets/FIlm Library.GV.csv', { responseType: 'text' })
      .subscribe(csvData => {
        this.movies = [];
        let csvToRowArray = csvData.split("\n");
        for(let i = 1; i < csvToRowArray.length - 1; i++){
          let row = csvToRowArray[i].split(",");
          if(row[1] === '') continue;
          if(row[2] === ' the"' || row[2] === ' the : Extended"' || row[2] === ' the "'){

            row[1] = row[1].replace(/"/g,"");
            row[2] = row[2].replace(/"/g," ");

            const firstLetter = row[2].charAt(1);
            const firstLetterCap = firstLetter.toUpperCase(); 
            const word = row[2].slice(2);

            row[2] = firstLetterCap + word;
            let movie:Movie = {
              movieNumber: row[0],
              movieName: row[2] + row[1],
              date: row[3],
              genre: row[4],
              director: row[5],
              mainCast: row[6],
              dvdType: row[7],
              rating: null
            }
            if(movie.movieName !== 'Title'){
              this.movies.push(movie);
            }
          }
          else{
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
        this.movies = this.movies
          .filter(m => m.movieName.includes(typedResult) || m.director.includes(typedResult) || m.genre.includes(typedResult));
      }
    })
  }
}
