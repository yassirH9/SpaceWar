import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AchivementComponent } from './page/achivement/achivement.component';
import { AdminzoneComponent } from './page/adminzone/adminzone.component';
import { DownloadComponent } from './page/download/download.component';
import { LoginformComponent } from './page/loginform/loginform.component';
import { RankingComponent } from './page/ranking/ranking.component';
import { RegisterformComponent } from './page/registerform/registerform.component';
import { StatisticsComponent } from './page/statistics/statistics.component';
import { TypeauthselectorComponent } from './page/typeauthselector/typeauthselector.component';
import { UserDataComponent } from './page/user-data/user-data.component';
import { AuthGuardService } from './service/RolService/auth.guard.service';

const routes: Routes = [
  {path:'', component:RankingComponent},
  {path:'login', component:LoginformComponent},
  {path:'register', component:RegisterformComponent},
  {path:"select", component:TypeauthselectorComponent},
  {path:"ranking", component:RankingComponent},
  {path:"statistics", component:StatisticsComponent},
  {path:"download",component:DownloadComponent},
  {path:"adminzone",component:AdminzoneComponent},
  {path:"achivement",component:AchivementComponent},
  {path:"userdata",component:UserDataComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
