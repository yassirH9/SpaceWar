import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  enpoint:string="https://localhost:443";

  constructor(private HttpClient:HttpClient) { }

  //get a report without chart report
  getRReport(){
    return this.HttpClient.get(this.enpoint+"/api/report", { responseType: 'blob' });
  }
  //get a report with chart
  getRReportChart(){
    return this.HttpClient.get(this.enpoint+"/api/report/chart", { responseType: 'blob' });
  }
  //semd a report by email
  SendReport(email:string){
    return this.HttpClient.get(this.enpoint+"/api/report/send/"+email);
  }
  SendReportChart(email:string){
    return this.HttpClient.get(this.enpoint+"/api/report/send/chart/"+email);
  }
}
