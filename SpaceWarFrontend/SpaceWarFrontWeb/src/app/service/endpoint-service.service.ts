import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

//models
import { RankingModel } from '../models/RankingModel';
import { ILoginResponse } from '../models/ILoginResponse';
import { IUserSimple } from '../models/IUserSimple';

@Injectable({
  providedIn: 'root'
})

export class EndpointServiceService {
  //instancia del modulo httpclient
  constructor(private HttpClient: HttpClient) { }

  //---------------------------------------------------------
  //Ranking
  getAllRanking() {
    return this.HttpClient.get<Array<RankingModel>>("/api/ranking");
  }
  getRanking(plid: string) {
    return this.HttpClient.get<RankingModel>("/api/ranking/" + plid);
  }
  putRanking(rank: RankingModel, id: string) {

  }
  postRanking(rank: RankingModel) {

  }
  //---------------------------------------------------------
  //User
  //NOTA: el usuario tiene crud completo con el registro(POST)
  getAllUser() {
    return this.HttpClient.get<Array<ILoginResponse>>("/api/user");
  }
  getUser(plid: string) {

  }
  putUser(plid: string, user: IUserSimple) {
    // return this.HttpClient.put<IUserSimple>("/api/user/"+plid,user);

    let body = new URLSearchParams();
    body.set("NICKNAME", user.NICKNAME);
    body.set("MAIL", user.MAIL);
    body.set("PSWD", user.PSWD);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.HttpClient.put('/api/user/'+plid, body.toString(), options);
  }
  delUser(plid: string) {
    return this.HttpClient.delete("/api/user/" + plid);
  }
  //---------------------------------------------------------
  //Achivement
  getAllAchivement() {

  }
  getAchivement(plid: string) {

  }
  putAchivement() {
    //achivement requiere de una interfaz
  }
  postAchivement() {

  }
  delArchivement() {

  }
  //---------------------------------------------------------
  //Master achivement
  getAllMasterAchivement() {

  }
  getMasterAchivement() {

  }
  putMasterAchivement() {

  }
  postMasterAchivement() {

  }
  delMasterAchivement() {

  }


}
