import {Component, OnInit} from '@angular/core';
import { SensorService } from './sensor.service';
import {interval, startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-frontend';
  length: number = 0;

  constructor(private sensorService: SensorService){

  }

  ngOnInit(): void {
    interval(1000) // run every 1 second
      .pipe(
        startWith(0),
        switchMap(() => this.sensorService.getSensorData())
      ).subscribe(
        res => {console.debug(res);}
      );


  }

}
