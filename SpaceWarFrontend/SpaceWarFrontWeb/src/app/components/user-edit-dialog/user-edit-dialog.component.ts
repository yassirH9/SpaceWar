import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
//form
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { EndpointServiceService } from 'src/app/service/endpoint-service.service';
import { ILoginResponse } from 'src/app/models/ILoginResponse';
import { IUserSimple } from 'src/app/models/IUserSimple';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {

  plid: any;
  mail:any;
  nickname:any;
  pswd:any;
  //form control
  editForm = new FormGroup({
    plid: new FormControl(''),
    email: new FormControl(''),
    nickname: new FormControl(''),
    password: new FormControl(''),
  })
  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    private endpoint: EndpointServiceService,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.plid = data.id;
    this.mail = data.mail;
    this.nickname = data.nickname;
    this.pswd = "";
  }

  ngOnInit(): void {

    this.editForm.setValue({
      plid: this.plid,
      email: this.mail,
      nickname: this.nickname,
      password: this.pswd,
    });
    
  }
  send(){
    this.plid = this.editForm.get("plid")!.value;
    this.mail = this.editForm.get("email")!.value;
    this.nickname = this.editForm.get("nickname")!.value;
    this.pswd = this.editForm.get("password")!.value;


    const user: IUserSimple = {
      NICKNAME: this.nickname,
      MAIL: this.mail,
      PSWD: this.pswd,
    };
    
    console.log(user);
    this.endpoint.putUser(this.plid,user).subscribe(data=>{

    })
    this.dialogRef.close();
  }
  onNoClick(): void {
   this.dialogRef.close();
  }
}
