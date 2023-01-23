import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

//models
import { RankingModel } from '../models/RankingModel';
import { ILoginResponse } from '../models/ILoginResponse';
import { IUserSimple } from '../models/IUserSimple';
import { MasterAchivement } from '../models/MasterAchivement';
import { Achivement } from '../models/Achivement';
import { IImage } from '../models/IImage';

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
  getRankingByPlid(plid:string){
    return this.HttpClient.get<RankingModel>("/api/ranking/plid/"+plid);
  }
  putRanking(rank: RankingModel, id: number) {
    let body = new URLSearchParams();
    body.set("POINTS", rank.points.toString());
    body.set("userplid", rank.userplid.plid.toString());

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.HttpClient.put('/api/ranking/' + id, body.toString(), options);
  }
  postRanking(rank: RankingModel) {
    let body = new URLSearchParams();
    body.set("POINTS", rank.points.toString());
    body.set("userplid", rank.userplid.plid.toString());

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.HttpClient.post('/api/ranking', body.toString(), options);
  }
  delRanking(id: number) {
    return this.HttpClient.delete("/api/ranking/" + id);
  }
  //---------------------------------------------------------
  //User
  //NOTA: el usuario tiene crud completo con el registro(POST)
  getAllUser() {
    return this.HttpClient.get<Array<ILoginResponse>>("/api/user");
  }
  getUser(plid: string) {
    return this.HttpClient.get<ILoginResponse>("/api/user/" + plid);
  }
  putUser(plid: string, user: IUserSimple) {
    // return this.HttpClient.put<IUserSimple>("/api/user/"+plid,user);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    console.log(user.NICKNAME+" "+user.MAIL+" "+user.PSWD);
    
    const body = new URLSearchParams();
    body.set('NICKNAME', user.NICKNAME);
    body.set('MAIL', user.MAIL);
    body.set('PSWD', user.PSWD);

    return this.HttpClient.put('/api/user/'+plid, body.toString(), httpOptions);
    
  }
  delUser(plid: string) {
    return this.HttpClient.delete("/api/user/" + plid);
  }
  //---------------------------------------------------------
  //Achivement
  getAllAchivement() {
    return this.HttpClient.get<Array<Achivement>>("/api/archivement");
  }
  getAchivement(plid: string) {
    return this.HttpClient.get<Achivement>("/api/archivement/" + plid);
  }
  putAchivement(achivement: Achivement, id: number) {
    let body = new URLSearchParams();
    body.set("masterAchivement", achivement.masterAchivement.id);
    body.set("userm", achivement.userm.plid.toString());

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.HttpClient.put('/api/archivement/' + id, body.toString(), options);
  }
  postAchivement(achivement: Achivement) {
    let body = new URLSearchParams();
    body.set("masterAchivement", achivement.masterAchivement.id);
    body.set("userm", achivement.userm.plid.toString());

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.HttpClient.post('/api/archivement', body.toString(), options);
  }
  delArchivement(id: number) {
    return this.HttpClient.delete("/api/archivement/" + id);
  }
  //---------------------------------------------------------
  //Master achivement
  getAllMasterAchivement() {
    return this.HttpClient.get<Array<MasterAchivement>>("/api/masterachive");
  }
  getMasterAchivement(id: number) {
    return this.HttpClient.get<MasterAchivement>("/api/masterachive" + id);
  }
  putMasterAchivement(MastAch: MasterAchivement, id: number) {
    let body = new URLSearchParams();
    body.set("NAME", MastAch.name);
    body.set("DESCRIPTION", MastAch.description);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.HttpClient.put('/api/masterachive/' + id, body.toString(), options);
  }
  postMasterAchivement(MastAch: MasterAchivement) {
    let body = new URLSearchParams();
    body.set("NAME", MastAch.name);
    body.set("DESCRIPTION", MastAch.description);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.HttpClient.post('/api/masterachive', body.toString(), options);

  }
  delMasterAchivement(id: number) {
    return this.HttpClient.delete("/api/masterachive/" + id);
  }

  //---------------------------------------
  //test
  getAllAchivementByUser(plid: string) {
    return this.HttpClient.get<Array<Achivement>>("/api/archivement/user/" + plid);
  }
}
