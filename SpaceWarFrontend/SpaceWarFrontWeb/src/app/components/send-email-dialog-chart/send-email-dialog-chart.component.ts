import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
//form
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { IUserSimple } from 'src/app/models/IUserSimple';
import Swal from 'sweetalert2';
import { ReportServiceService } from 'src/app/service/ReportService/report-service.service';

@Component({
  selector: 'app-send-email-dialog-chart',
  templateUrl: './send-email-dialog-chart.component.html',
  styleUrls: ['./send-email-dialog-chart.component.scss']
})
export class SendEmailDialogChartComponent {

  constructor(
    public dialogRef: MatDialogRef<SendEmailDialogChartComponent>,
    private report:ReportServiceService,
  ){}
  editForm = new FormGroup({
    email: new FormControl(''),
  })

  onNoClick(){
    this.dialogRef.close();
  }
  send(){
    var email = this.editForm.get("email")!.value;
    this.report.SendReportChart(email!).subscribe((data)=>{
      Swal.fire(
        'Email sent successfully!',
        '',
        'success'
      ).then((data)=>{
        this.dialogRef.close();
      })
    });
  }
}
