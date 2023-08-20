import { Injectable } from '@angular/core';
import { Movie } from './interfaces/movie';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
  public movies:Movie[] = [];
  public selectedMovie:Movie | null = null;
  public emitMovie = new ReplaySubject<Movie>();

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
          console.log(row)
          if(row[2] ===  ' the""' || row[2] === ' the : Extended"' || row[2] === ' the "'){

            row[1] = row[1].replace(/"/g,"");
            row[2] = row[2].replace(/"/g," ");

            const firstLetter = row[2].charAt(1);
            const firstLetterCap = firstLetter.toUpperCase(); 
            const word = row[2].slice(2);

            row[2] = firstLetterCap + word;
            let movie:Movie = {
              movieNumber:row[0],
              movieName:row[2] + row[1],
              date:row[3],
              genre:row[4],
              director:row[5],
              mainCast:row[6],
              dvdType:row[7],
              rating:null,
              poster:null,
              plot:null,
            }
            if(movie.movieName !== 'Title'){
              this.movies.push(movie);
            }
          }
          else{
            let movie:Movie = {
              movieNumber:row[0],
              movieName:row[1],
              date:row[2],
              genre:row[3],
              director:row[4],
              mainCast:row[5],
              dvdType:row[6],
              rating:null,
              poster:null,
              plot:null,
            }
            if(movie.movieName !== 'Title'){
              this.movies.push(movie);
            }
        }
        this.movies.forEach(m =>{
          m.movieName = m.movieName.toLowerCase();
          m.director = m.director.toLowerCase();
          m.genre = m.genre.toLowerCase();
        })
        this.movies = this.movies
          .filter(m => m.movieName.includes(typedResult.toLowerCase()) || m.director.includes(typedResult.toLowerCase()) || m.genre.includes(typedResult.toLowerCase()));
        
          this.movies.forEach(m =>{
            m.movieName = m.movieName.split(' ').map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join(' ');
            m.director = m.director.split(' ').map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join(' ');
            m.genre = m.genre.split(' ').map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join(' ');
          })
          this.movies.forEach(m =>{
            m.movieName = m.movieName.split('/').map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join('/');
            m.director = m.director.split('/').map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join('/');
            m.genre = m.genre.split('/').map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join('/');
          })
      }
    })
  }

  getMovieData(movieName:string){
    for(let i = 0; i < this.movies.length; i++){
      if(movieName === this.movies[i].movieName){
        this.selectedMovie = this.movies[i];
      }
    }
    return this.http.get<any>(`http://www.omdbapi.com/?apikey=3b16d23d&t=${movieName}`);
  }
}
