import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { IRegister } from 'src/app/models/IRegister';
//cookie
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.scss']
})
export class RegisterformComponent implements OnInit {

  constructor(private auth: AuthServiceService, private cookie: CookieService, private route: Router) { }
  //loginformw
  register = new FormGroup({
    nickname: new FormControl(''),
    mail: new FormControl(''),
    password: new FormControl(''),
  })

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  ngOnInit(): void {
  }

  onRegister() {

    var mailIsValid: boolean = false;
    var userIsValid: boolean = false;
    var pswdIsValid: boolean = false;

    //Labels de error de usuario
    var mailLabel = document.getElementById("mail-label");
    var nicknameLabel1 = document.getElementById("nickname-label1");
    var nicknameLabel2 = document.getElementById("nickname-label2");
    var pswdLabel1 = document.getElementById("pswd-label1");
    var pswdLabel2= document.getElementById("pswd-label2");


    //VALIDACION DE CAMPOS
    //estandar RFC 5322

    //emial
    const mailRegex = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
    if (mailRegex.test(this.register.value.mail!)) {
      // console.log("mail valido");
      mailIsValid = true;
      mailLabel!.style.display = "none";
    } else {
      // console.log("mail no valido");
      mailIsValid = false;
      mailLabel!.style.display = "block";
    }
    //contraseña
    /*
    Contenga entre 8 y 64 caracteres.
    Cada carácter de la contraseña sea uno de los siguientes:
    Cualquier carácter imprimible en ASCII (códigos de carácter de 32 a 126, inclusive).
    */
    const pswdRegex = new RegExp(/^[\x20-\x7E]{8,64}$/);
    if (pswdRegex.test(this.register.value.password!)) {
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
    //nickname
    /*
    nickname entre 5 y 15 caracteres numero o letra
    no ser nulo
    */
    if (this.register.value.nickname! != "" && this.register.value.nickname!.length > 5 && this.register.value.nickname!.length < 15) {
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

    if (mailIsValid && pswdIsValid && userIsValid) {
      console.log("validacion completa");
      const userdata: IRegister = {
        nickname: btoa(this.register.value.nickname!),
        mail: this.register.value.mail!,
        pswd: btoa(this.register.value.password!),
      }
      this.auth.register(userdata).subscribe((data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.route.navigateByUrl("/login");
      }, (error_) => {
        if (error_.status == 504) {
          Swal.fire(
            'Please try again later',
            'We are currently experiencing unexpected problems with the server.',
            'warning'
          )
        }
      })
    }else{
      console.log("validacion incompleta");
    }
    //--------------------------------
    // const userdata: IRegister = {
    //   nickname: btoa(this.register.value.nickname!),
    //   mail: this.register.value.mail!,
    //   pswd: btoa(this.register.value.password!),
    // }
    // this.auth.register(userdata).subscribe((data) => {
    //   console.log(data);
    //   this.isSuccessful = true;
    //   this.isSignUpFailed = false;
    //   this.route.navigateByUrl("/login");
    // }, (error_) => {
    //   if (error_.status == 504) {
    //     Swal.fire(
    //       'Please try again later',
    //       'We are currently experiencing unexpected problems with the server.',
    //       'warning'
    //     )
    //   }
    // })
  }
}
