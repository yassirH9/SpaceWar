import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { authInterceptorProviders, InterceptorService } from './service/TokenService/interceptor.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DownloadComponent } from './page/download/download.component';
import { AdminzoneComponent } from './page/adminzone/adminzone.component';
import { UserEditDialogComponent } from './components/user-edit-dialog/user-edit-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RankingEditDialogComponent } from './components/ranking-edit-dialog/ranking-edit-dialog.component';
import { RankingNewDialogComponent } from './components/ranking-new-dialog/ranking-new-dialog.component';
import { MasterAchEditDialogComponent } from './components/master-ach-edit-dialog/master-ach-edit-dialog.component';
import { MasterAchNewDialogComponent } from './components/master-ach-new-dialog/master-ach-new-dialog.component';
import { AchivementEditDialogComponent } from './components/achivement-edit-dialog/achivement-edit-dialog.component';
import { AchivementNewDialogComponent } from './components/achivement-new-dialog/achivement-new-dialog.component';
import { AchivementComponent } from './page/achivement/achivement.component';
import { UserDataComponent } from './page/user-data/user-data.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginformComponent,
    RegisterformComponent,
    TypeauthselectorComponent,
    RankingComponent,
    StatisticsComponent,
    DownloadComponent,
    AdminzoneComponent,
    UserEditDialogComponent,
    RankingEditDialogComponent,
    RankingNewDialogComponent,
    MasterAchEditDialogComponent,
    MasterAchNewDialogComponent,
    AchivementEditDialogComponent,
    AchivementNewDialogComponent,
    AchivementComponent,
    UserDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    MatDialogModule,
  ],
  entryComponents:[ 
    UserEditDialogComponent,
   ],
  providers: [
    authInterceptorProviders

  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
