import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title:string = 'gabi-app';
  public profile:any;
  public icon:any;
  constructor(public homeService:HomeService){}


  ngOnInit(){}



  

}
