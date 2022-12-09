import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginformComponent } from './page/loginform/loginform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterformComponent } from './page/registerform/registerform.component';
import { TypeauthselectorComponent } from './page/typeauthselector/typeauthselector.component';
import { RankingComponent } from './page/ranking/ranking.component';
import { StatisticsComponent } from './page/statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginformComponent,
    RegisterformComponent,
    TypeauthselectorComponent,
    RankingComponent,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
