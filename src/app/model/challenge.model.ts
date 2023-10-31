import {ChallengeType} from "./challenge-type";

export class ChallengeModel {
  name: string = "";
  award: number = 0;
  start: Date = new Date();
  end: Date = new Date();
  accomplished: boolean = false;
  step: number = 0;
  steps: number = 0;
  type: ChallengeType;


  constructor(name: string, award: number, accomplished: boolean, step: number, steps: number, type: ChallengeType) {
    this.name = name;
    this.award = award;
    this.accomplished = accomplished;
    this.step = step;
    this.steps = steps;
    this.type = type;
  }
}
