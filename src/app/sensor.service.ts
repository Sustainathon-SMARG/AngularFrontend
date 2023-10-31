import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, filter, interval, map, Observable, of, startWith, switchMap, tap} from "rxjs";
import {SensorDataModel} from "./model/sensor-data.model";

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) {
    //this.sensorDataObservable = interval(1000) // run every 1 second
     // .pipe(
     //   startWith(0),
     //   switchMap(() => this.getSensorData())
     // );

    this.sensorDataObservable = interval(10000) // run every 1 second
      .pipe(
        startWith(0),
        switchMap(() => this.getMockData())
      );
  }

  dataServiceUrl = 'http://localhost:3000/devicedata?count=10&uid=FF.3C6105DD559D';
  sensorDataObservable: Observable<number>;
  mockSensorValue = 100;

  getSensorData(): Observable<number> {
    return this.http.get<SensorDataModel>(this.dataServiceUrl).pipe(
      map((data: SensorDataModel) => data.FPD[0][0][2][0][0])
    );
  }

  getMockData(): Observable<number> {
    this.mockSensorValue--;
    return of(this.mockSensorValue);
  }

  subscribeToSensorData(): Observable<number> {
    return this.sensorDataObservable;
  }
}
