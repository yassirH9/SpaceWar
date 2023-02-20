import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RankingModel } from 'src/app/models/RankingModel';
import { EndpointServiceService } from 'src/app/service/endpoint-service.service';
import { RoleserviceService } from 'src/app/service/RolService/roleservice.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

import { ReportServiceService } from 'src/app/service/ReportService/report-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { SendEmailDialogChartComponent } from 'src/app/components/send-email-dialog-chart/send-email-dialog-chart.component';
import { SendEmailDialogComponent } from 'src/app/components/send-email-dialog/send-email-dialog.component';
import { WSRanking } from 'src/app/models/WSRanking';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  //array para almacenar el ranking
  rankingData: WSRanking[] = [];

  webSocket: WebSocket = new WebSocket('wss://localhost:443/ws/ranking-socket');

  constructor(
    private service: EndpointServiceService,
    private roleservice: RoleserviceService,
    private role: RoleserviceService,
    private route: Router,
    private report: ReportServiceService,
    private mDialog: MatDialog,
  ) { 
    
  }
  ngOnInit(): void {
    //loguea tras recargar los datos cambiados
    if (window.localStorage.getItem("ROLE") != null) {
      this.role.login(window.localStorage.getItem("ROLE")!);
    } else {
      this.route.navigateByUrl("/ranking");
    }

    this.webSocket.onmessage = (event) => {
      this.rankingData.splice(0, this.rankingData.length);
      const Rankings = JSON.parse(event.data);
      for (let i = 0; i < Rankings.length; i++) {
        const obj = Rankings[i];
        console.log(obj);
        this.rankingData.push(obj);
      }
    };    
  }
  //Obsoleto: sustituido por websockets
  // getDataTable() {
  //   this.service.getAllRanking().subscribe((data) => {
  //     //console.log(data);
  //     this.rankingData = data;

  //     //ordena el vector de mayor a menor puesto en base a sus puntos
  //     this.rankingData.sort((a, b) =>
  //       a.points > b.points ? -1 :
  //         0
  //     );
  //     document.getElementById("error")!.style.display = "none";
  //   },
  //     (error_) => {
  //       if (error_.status == 504) {
  //         Swal.fire(
  //           'Please try again later',
  //           'We are currently experiencing unexpected problems with the server.',
  //           'warning'
  //         )
  //         document.getElementById("error")!.style.display = "block";
  //       }
  //       if (error_.status == 500) {
  //         Swal.fire(
  //           'Please try again later',
  //           'Server validation error',
  //           'warning'
  //         )
  //       }
  //       if (error_.status == 504) {
  //         Swal.fire(
  //           'Please try again later',
  //           'Server validation error',
  //           'warning'
  //         )
  //       }
  //       if (error_.status == 401) {
  //         Swal.fire(
  //           'Unauthorized',
  //           'please log in.',
  //           'warning'
  //         )
  //       }
  //     });
  // }

  checkboxControl = new FormControl(false);
  DownloadReport() {
    if (this.checkboxControl.value) {
      this.report.getRReportChart().subscribe((response) => {
        const fileURL = URL.createObjectURL(response);
        window.open(fileURL, '_blank');
      })
    } else {
      this.report.getRReport().subscribe((response) => {
        const fileURL = URL.createObjectURL(response);
        window.open(fileURL, '_blank');
      })
    }

  }
  SendReport(){
    console.log("send email");
    if(this.checkboxControl.value){
      this.mDialog.open(SendEmailDialogChartComponent, {
        width: '500px',
        height: '400px',
      }).beforeClosed().subscribe(data => {

      });
    }else{
      this.mDialog.open(SendEmailDialogComponent, {
        width: '500px',
        height: '400px',
      }).beforeClosed().subscribe(data => {

      });
    }
  }
}
