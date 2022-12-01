import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';

//models
import { RankingModel } from '../models/RankingModel';

@Injectable({
  providedIn: 'root'
})

export class EndpointServiceService {
  //definicion del endpoint
  endpoint = "localhost:8080/";

  //instancia del modulo httpclient
  constructor(private HttpClient: HttpClient) { }

  getAllRanking(){
      return this.HttpClient.get<Array<RankingModel>>(this.endpoint+"ranking");
  }

}
