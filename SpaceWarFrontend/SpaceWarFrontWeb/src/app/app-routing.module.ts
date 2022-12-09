import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginformComponent } from './page/loginform/loginform.component';
import { RankingComponent } from './page/ranking/ranking.component';
import { RegisterformComponent } from './page/registerform/registerform.component';
import { TypeauthselectorComponent } from './page/typeauthselector/typeauthselector.component';

const routes: Routes = [
  {path:'', component:RankingComponent},
  {path:'login', component:LoginformComponent},
  {path:'register', component:RegisterformComponent},
  {path:"select", component:TypeauthselectorComponent},
  {path:"ranking", component:RankingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
