import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
//form
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { EndpointServiceService } from 'src/app/service/endpoint-service.service';
import { ILoginResponse } from 'src/app/models/ILoginResponse';
import { IUserSimple } from 'src/app/models/IUserSimple';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {

  plid: any;
  mail: any;
  nickname: any;
  pswd: any;
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
  send() {
    this.plid = this.editForm.get("plid")!.value;
    this.mail = this.editForm.get("email")!.value;
    this.nickname = this.editForm.get("nickname")!.value;
    this.pswd = this.editForm.get("password")!.value;

    //validaciono de campos
    var mailIsValid: boolean = false;
    var userIsValid: boolean = false;
    var pswdIsValid: boolean = false;
    //labels de error
    var mailLabel = document.getElementById("mail-label");
    var nicknameLabel1 = document.getElementById("nickname-label1");
    var nicknameLabel2 = document.getElementById("nickname-label2");
    var pswdLabel1 = document.getElementById("pswd-label1");
    var pswdLabel2 = document.getElementById("pswd-label2");
    //regex
    const mailRegex = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
    const pswdRegex = new RegExp(/^[\x20-\x7E]{8,64}$/);
    //validacion
    if (mailRegex.test(this.editForm.value.email!)) {
      // console.log("mail valido");
      mailIsValid = true;
      mailLabel!.style.display = "none";
    } else {
      // console.log("mail no valido");
      mailIsValid = false;
      mailLabel!.style.display = "block";
    }
    if (pswdRegex.test(this.editForm.value.password!)) {
      // console.log("pswd valido");
      pswdIsValid = true;
      pswdLabel1!.style.display = "none";
      pswdLabel2!.style.display = "none";
    } else {
      // console.log("pswd no valido");
      pswdIsValid = false;
      pswdLabel1!.style.display = "block";
      pswdLabel2!.style.display = "block";
    }
    if (this.editForm.value.nickname! != "" && this.editForm.value.nickname!.length > 5 && this.editForm.value.nickname!.length < 15) {
      // console.log("nickname valido");
      userIsValid = true;
      nicknameLabel1!.style.display = "none";
      nicknameLabel2!.style.display = "none";
    } else {
      // console.log("nickname no valido");
      userIsValid = false;
      nicknameLabel1!.style.display = "block";
      nicknameLabel2!.style.display = "block";
    }


    //---------------------------------------------------
    if (mailIsValid && pswdIsValid && userIsValid) {
      const user: IUserSimple = {
        NICKNAME: this.nickname,
        MAIL: this.mail,
        PSWD: this.pswd,
      };

      console.log(user);
      this.endpoint.putUser(this.plid, user).subscribe(data => {
        Swal.fire(
          'User edited',
          '',
          'success'
        ).then((data)=>{
          this.dialogRef.close();
        })
      },(error_) => {
        if (error_.status == 504) {
          Swal.fire(
            'Please try again later',
            'We are currently experiencing unexpected problems with the server.',
            'warning'
          )
        }
        if (error_.status == 500) {
          Swal.fire(
            'Please try again later',
            'Server validation error',
            'warning'
          )
        }
        if (error_.status == 401) {
          Swal.fire(
            'Unauthorized',
            'please log in.',
            'warning'
          )
        }
      })
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
