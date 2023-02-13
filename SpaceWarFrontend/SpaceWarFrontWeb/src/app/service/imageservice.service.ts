import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { IImage } from '../models/IImage';
@Injectable({
  providedIn: 'root'
})
export class ImageserviceService {
  enpoint:string="https://localhost:443";

  constructor(private HttpClient: HttpClient) { }
  
  getImageByUserID(plid: any) {
    return this.HttpClient.get<IImage>(this.enpoint+"/api/get/image/user/" + plid);
  }
  //---------------------------------------
  putImageByUserID(image: File, plid: any) {
    const formData = new FormData();
    formData.append('image',image);
    formData.append('user',plid);

    return this.HttpClient.put(this.enpoint+'/api/put/image/', formData);
  }
  //---------------------------------------
  postImageByUserID(image:File,plid:any){
    const formData = new FormData();
    formData.append('image',image);
    formData.append('user',plid);

    return this.HttpClient.post(this.enpoint+'/api/upload/image', formData);
  }
  //---------------------------------------
  deleteImageByUserID(plid:any){
    return this.HttpClient.delete(this.enpoint+"/api/del/image/"+plid);
  }
}
