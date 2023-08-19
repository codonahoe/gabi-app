import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'movies', component: MoviePageComponent},
];

@NgModule({
  declarations: [],
  imports: [
    
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
