import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ILogin } from 'src/app/models/ILogin';
import { ILoginResponse } from 'src/app/models/ILoginResponse';
import { EndpointServiceService } from 'src/app/service/endpoint-service.service';

//matdialog
import {MatDialog} from '@angular/material/dialog';
import { UserEditDialogComponent } from 'src/app/components/user-edit-dialog/user-edit-dialog.component';
import { Router } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-adminzone',
  templateUrl: './adminzone.component.html',
  styleUrls: ['./adminzone.component.scss']
})
export class AdminzoneComponent implements OnInit {
  users: Array<ILoginResponse> = [];
  constructor(
    private endpoint: EndpointServiceService,
    private mDialog: MatDialog,
    private route:Router,
  ) { }

  ngOnInit(): void {
    this.endpoint.getAllUser().subscribe((data) => {
      //console.log(data);
      this.users = data;
    });
  }

  //users actions
  delUser(plid: any) {
    console.log("Delete user by ID: " + plid);
    this.endpoint.delUser(plid).subscribe((data) => {

    });
    this.route.navigateByUrl("/adminzone");
  }
  putUser(plid: any,mail:any,nickname:any,pswd:any) {
    //console.log("Updated user by id: " + plid);
    this.mDialog.open(UserEditDialogComponent, {
      data: {
        id: plid,
        mail: mail,
        nickname: nickname,
        pswd: pswd,
      },
      width: '500px',
      height: '400px',
    });
  }
}
