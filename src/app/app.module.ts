import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PokerHandComponent } from './poker-hand/poker-hand.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    PokerHandComponent,
    ScoreBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase,'HubMobile'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireDatabaseModule, AppRoutingModule
  ],
  providers: [CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
