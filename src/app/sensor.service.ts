import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {SensorDataModel} from "./sensor-data.model";

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) { }

  dataServiceUrl = 'http://localhost:3000/devicedata?count=10&uid=FF.3C6105DD559D';

  getSensorData(): Observable<number>{
    return this.http.get<SensorDataModel>(this.dataServiceUrl).pipe(
      map((data: SensorDataModel)=>data.FPD[0][0][2][0][0])
    );
  }
}
