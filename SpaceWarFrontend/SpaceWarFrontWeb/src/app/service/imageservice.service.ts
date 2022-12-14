import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ImageserviceService {

  constructor(private HttpClient: HttpClient) { }

  getUserImage(plid:number){
    return this.HttpClient.get<any>("/api/get/image/user/"+plid);
  }
  
}
