import { Component, OnInit } from '@angular/core';
import { PokerGame } from '../poker-game';
import { PokerServiceService } from "../poker-service.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { PokerVote } from '../poker-vote';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-poker-hand',
  templateUrl: './poker-hand.component.html',
  styleUrls: ['./poker-hand.component.css']
})
export class PokerHandComponent implements OnInit {
  items: Observable<any[]>;
  totalScore: number;
  dbOne: AngularFireDatabase;
  pokerGame: PokerGame = {
    score: 0,
    teamName: 'phoenix',
    playerGUID: ''
  }
  cookieValue = 'UNKNOWN';
  cookieService:CookieService;

  constructor(private pokerServiceService: PokerServiceService,db: AngularFireDatabase,cookieService: CookieService ) {
    this.cookieService = cookieService;
  //   db.list("scrumpokerv2/teams/" + this.pokerGame.teamName.toLowerCase() + "/users").valueChanges().subscribe(scores => {
  //     this.totalScore = 0;
  //     for (const key in scores) {
  //       if (scores.hasOwnProperty(key)) {
  //         var pv1: PokerVote = scores[key] as PokerVote;
  //         console.log(pv1.vote);
  //         this.totalScore+=pv1.vote;
  //       }
  //     }
  //     this.totalScore = this.totalScore / scores.length;
  // });
    this.dbOne = db;
   }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('PlayerGuid');
    if (this.cookieValue===''){
      this.pokerGame.playerGUID = this.guid();
      this.cookieService.set( 'PlayerGuid', this.pokerGame.playerGUID );
    }
    else
    {
      this.pokerGame.playerGUID = this.cookieValue;
    }

    this.pokerServiceService.addScore(this.pokerGame.playerGUID, 0);
  }
  
  onClickReset(){
    this.dbOne.list("scrumpokerv2/teams/" + this.pokerGame.teamName.toLowerCase()).set("users", {}
    );
    this.pokerGame.score = 0;
  }

  onClick(score: number){
    this.pokerServiceService.addScore(this.pokerGame.playerGUID, score);
    this.pokerGame.score = score;
    //this.pokerServiceService.getScore().subscribe(score => this.pokerGame.score = score);
    this.dbOne.list("scrumpokerv2/teams/" + this.pokerGame.teamName.toLowerCase() + "/users").update(this.pokerGame.playerGUID,
      { name:this.pokerGame.playerGUID, vote:score }
    );
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

}
