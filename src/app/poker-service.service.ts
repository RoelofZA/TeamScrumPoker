import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PokerServiceService {
  dict = [];
  items: Observable<any[]>;

  constructor(){}
  // constructor(db: AngularFirestore) {
  //   this.items = db.collection('scrumpokerv2/team').valueChanges();
  // }

  addScore(key:string,val:number){
    var hasKey = false;
    for(var i = 0; i < this.dict.length; i++)
    {
      if (this.dict[i].key==key){
        hasKey = true;
        this.dict[i].value = val;
      }
    }
    
    if (!hasKey){
      this.dict.push({
        key:   key,
        value: val
      });
      
    }
  }

  getScore():Observable<number>{
    var totalScore = 0;
    for(var i = 0; i < this.dict.length; i++)
    {
      totalScore += this.dict[i].value;
    }

    // var result = firebase.database().ref('scrumpokerv2/team');
    //     result.on('value', function(snapshot) {
    //         snapshot.forEach(function(child) {
    //             var highScore = child.val();
    //             totalScore += highScore.score;
    //             console.log(totalScore);
    //         });
    //     }, this);

    return of(totalScore);
  }
}
