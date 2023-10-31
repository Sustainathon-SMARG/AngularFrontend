import {Component, OnInit} from '@angular/core';
import {SensorService} from './sensor.service';
import {interval, startWith, switchMap} from "rxjs";
import {ChallengesService} from "./challenges.service";
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-frontend';
  currentPoints: number = 0;
  currentPowerConsumption = 0;

  constructor(private challengesService: ChallengesService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.challengesService.subscribeToChangedChallenges().subscribe(changedChallenges => {
      if (changedChallenges != null) {
        changedChallenges.filter(ch => ch.accomplished).forEach(ch => this.currentPoints += ch.award);
      }
    });
    this.currentPoints = this.userService.score
  }

}
