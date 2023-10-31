import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {SensorService} from "../sensor.service";
import {ChallengesService} from "../challenges.service";
import {ChallengeModel} from "../model/challenge.model";
import {checkBudgets} from "@angular-devkit/build-angular/src/utils/bundle-calculator";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  HAPPY_MESSAGE = 'I am so happy now!';
  SAD_MESSAGE = 'I woke up sad today...';
  petName: string = 'dot';
  message = this.SAD_MESSAGE;
  challenges: ChallengeModel[] = new Array<ChallengeModel>;

  constructor(private userService: UserService,
              private sensorService: SensorService,
              private challengesService: ChallengesService) {
  }

  ngOnInit(): void {
    this.petName = `${this.userService.userName}'s dot`;
    this.challenges = this.challengesService.getChallenges();

  }

}
