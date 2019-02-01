import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { PokerHandComponent } from './poker-hand/poker-hand.component';

const routes: Routes = [
  { path: 'scoreboard', component: ScoreBoardComponent },
  { path: 'vote', component: PokerHandComponent },
  { path: '', redirectTo: '/vote', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
