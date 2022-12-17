import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { IImage } from '../models/IImage';
@Injectable({
  providedIn: 'root'
})
export class ImageserviceService {

  constructor(private HttpClient: HttpClient) { }
  
  getImageByUserID(plid: any) {
    return this.HttpClient.get<IImage>("/api/get/image/user/" + plid);
  }
  //---------------------------------------
  putImageByUserID(image: File, plid: any) {
    const formData = new FormData();
    formData.append('image',image);
    formData.append('user',plid);

    return this.HttpClient.put('/api/put/image/', formData);
  }
  //---------------------------------------
  postImageByUserID(image:File,plid:any){
    const formData = new FormData();
    formData.append('image',image);
    formData.append('user',plid);

    return this.HttpClient.post('/api/upload/image', formData);
  }
  //---------------------------------------
  deleteImageByUserID(plid:any){
    return this.HttpClient.delete("/api/del/image/"+plid);
  }
}
