import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userName: string = "marc";
  private _score: number = 223;

  constructor() { }


  get userName(): string {
    return this._userName;
  }

  get score(): number {
    return this._score;
  }

  set score(newValue:number) {
    this._score = newValue;
  }
}
