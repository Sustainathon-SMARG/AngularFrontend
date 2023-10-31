import {Injectable} from '@angular/core';
import {ChallengeModel} from "./model/challenge.model";
import {filter, map, Observable, Subject} from "rxjs";
import {ChallengeType} from "./model/challenge-type";
import {SensorService} from "./sensor.service";

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {

  observable: Subject<ChallengeModel[] | null> = new Subject<ChallengeModel[] | null>();
  currentElectricityConsumption: number = 97;
  challenges = [
    new ChallengeModel("Turn Off 3 Devices in your Room.", 500, false, 2, 3, ChallengeType.Electricity),
    new ChallengeModel("Reduce Room Temperature to 18°C.", 350, false, 0, 1, ChallengeType.Temperature),
    new ChallengeModel("Enter Next Week's Schedule.", 1000, false, 0, 5, ChallengeType.Schedule)
  ];

  constructor(private sensorService: SensorService) {
    this.sensorService.subscribeToSensorData().pipe(
      map(sensorData => {
          console.log(`sensor: ${sensorData}, current: ${this.currentElectricityConsumption}`);
          if (sensorData < this.currentElectricityConsumption) {
            let electChallenges = this.challenges
              .filter(c => c.type === ChallengeType.Electricity)
              .filter(c => !c.accomplished);

            if (electChallenges.length > 0) {
              for (let ch of electChallenges) {
                ch.step++;

                if (ch.step === ch.steps) {
                  ch.accomplished = true;
                }
              }

              return electChallenges;
            } else {
              return null;
            }
          }
          this.currentElectricityConsumption = sensorData;

          return null;
        }
      ),
      filter(chs => chs !== null)
    ).subscribe(ch => {
      if (ch !== undefined) {
        this.observable.next(ch);
      }
    });
  }

  getChallenges(): ChallengeModel[] {
    return this.challenges;
  }

  subscribeToChangedChallenges(): Observable<ChallengeModel[] | null> {
    return this.observable;
  }
}
