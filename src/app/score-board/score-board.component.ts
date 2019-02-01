import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { PokerVote } from '../poker-vote';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {
  avgScore: number = 0;
  Scores: number[] = [0,0,0,0,0,0,0,0,0,0];
  ScoresStr: string;

  constructor(db: AngularFireDatabase ) {
    db.list("scrumpokerv2/teams/phoenix/users").valueChanges().subscribe(scores => {
      this.avgScore = 0;
      this.Scores = [0,0,0,0,0,0,0,0,0,0];
      this.ScoresStr = '';
      
      for (const key in scores) {
        if (scores.hasOwnProperty(key)) {
          var pv1: PokerVote = scores[key] as PokerVote;

          switch(pv1.vote) {
            case 1:
              this.Scores[0]++;
              break;
            case 2:
              this.Scores[1]++;
              break;
            case 3:
              this.Scores[2]++;
              break;
             case 5:
              this.Scores[3]++;
              break;
            case 8:
              this.Scores[4]++;
              break;
            case 13:
              this.Scores[5]++;
              break;
            case 21:
              this.Scores[6]++;
              break;
            case 34:
              this.Scores[7]++;
              break;
            default:
              this.Scores[8]++;
              break;
          }

          this.avgScore+=pv1.vote;
        }
      }
      this.avgScore = this.avgScore / scores.length;
      var str = '<canvas  class="boxy" width="' + (10 * this.Scores[0]).toString() + 'px">&nbsp;</canvas><br/>';
      str += '<canvas class="boxy" height="20px;" width="' + (10 * this.Scores[1]).toString() + 'px">&nbsp;</canvas><br/>';
      str += '<canvas class="boxy" height="20px;" width="' + (10 * this.Scores[2]).toString() + 'px">&nbsp;</canvas><br/>';
      str += '<canvas class="boxy" height="20px;" width="' + (10 * this.Scores[3]).toString() + 'px">&nbsp;</canvas><br/>';
      str += '<canvas class="boxy" height="20px;" width="' + (10 * this.Scores[4]).toString() + 'px">&nbsp;</canvas><br/>';
      str += '<canvas class="boxy" height="20px;" width="' + (10 * this.Scores[5]).toString() + 'px">&nbsp;</canvas><br/>';
      str += '<canvas class="boxy" height="20px;" width="' + (10 * this.Scores[6]).toString() + 'px">&nbsp;</canvas><br/>';
      str += '<canvas class="boxy" height="20px;" width="' + (10 * this.Scores[7]).toString() + 'px">&nbsp;</canvas><br/>';
      str += '<canvas class="boxy" height="20px;" width="' + (10 * this.Scores[8]).toString() + 'px">&nbsp;</canvas><br/>';

      this.ScoresStr = str;
    });
  }

  ngOnInit() {
  }

}
