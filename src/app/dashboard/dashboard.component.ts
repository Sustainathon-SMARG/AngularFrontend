import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {SensorService} from "../sensor.service";
import {ChallengesService} from "../challenges.service";
import {ChallengeModel} from "../model/challenge.model";
import {checkBudgets} from "@angular-devkit/build-angular/src/utils/bundle-calculator";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  HAPPY_MESSAGE = 'I am so happy now!';
  SAD_MESSAGE = 'I woke up sad today...';
  SAD_IMAGE: string = "assets/saddot.jpg";
  HAPPY_IMAGE: string = "assets/happydot.jpg";
  petName: string = 'dot';
  message = this.SAD_MESSAGE;
  image: string = this.SAD_IMAGE;
  challenges: ChallengeModel[] = new Array<ChallengeModel>;

  constructor(private userService: UserService,
              private challengesService: ChallengesService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.petName = `${this.userService.userName}'s dot`;
    this.challenges = this.challengesService.getChallenges();
    this.challengesService.subscribeToChangedChallenges().subscribe(challenges => {
      console.log("triggered");
      let completedChallenges = challenges?.filter(ch => ch.accomplished);
      if (completedChallenges != undefined) {
        this.handleChallengesAccomplished(completedChallenges);
      }
    });

  }

  handleChallengesAccomplished(challenges: ChallengeModel[]) {
    this.image = this.HAPPY_IMAGE;
    this.message = this.HAPPY_MESSAGE;
    this.challenges = this.challengesService.getChallenges();
    this.snackBar.open("You conquered a challenge !!", 'OK', {duration:3000});
  }

}
