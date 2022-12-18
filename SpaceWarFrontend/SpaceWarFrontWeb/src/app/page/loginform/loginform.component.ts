import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ILogin } from 'src/app/models/ILogin';
import { ILoginResponse } from 'src/app/models/ILoginResponse';
import { AuthServiceService } from 'src/app/service/auth-service.service';
//cookie
import { CookieService } from 'ngx-cookie-service';
import { StorageserviceService } from '../../service/TokenService/storageservice.service'
import { RoleserviceService } from 'src/app/service/RolService/roleservice.service';
import { Router } from '@angular/router';
import { ImageserviceService } from 'src/app/service/imageservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent implements OnInit {

  constructor(
    private roleservice: RoleserviceService,
    private auth: AuthServiceService, 
    private cookie: CookieService,
    private storage: StorageserviceService,
    private route:Router,
    private imageService:ImageserviceService,
    ) { }


  //loginformw
  login = new FormGroup({
    nickname: new FormControl(''),
    password: new FormControl(''),
  })

  //TOKEN
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  //TOKEN

  ngOnInit(): void {

  }

  onLogin() {
    const userdata: ILogin = {
      nickname: btoa(this.login.value.nickname!),
      pswd: btoa(this.login.value.password!),
    }
    this.auth.login(userdata).subscribe((data) => {
      this.cookie.set('userToken', data.accessToken);
      this.storage.saveToken(data.accessToken,data.plid.toString());

      console.log(data.accessToken)
      //console.log(data.nickname+":"+data.accessToken+":"+data.mail+":"+data.plid+":"+data.rol);
    
      this.roleservice.login(data.rol).subscribe(response=>{
        this.updateAuthInfo(data.rol,true);
        console.log("ROLE: "+data.rol);
      })

      this.route.navigateByUrl("/ranking");
    },(error_)=>{
      if(error_.status==500){
        Swal.fire(
          'Please try again later',
          'We are currently experiencing unexpected problems with the server.',
          'warning'
        )
      }
      if(error_.status==504){
        Swal.fire(
          'Please try again later',
          'We are currently experiencing unexpected problems with the server.',
          'warning'
        )
      }
      if(error_.status==401){
        Swal.fire(
          'Incorrect username or password',
          'Try again and if you do not remember your password or user name, please contact an administrator.',
          'warning'
        )
      }
      
    });
    //window.location.href="/ranking";
  }
  updateAuthInfo(role:string,islogin:boolean){
    window.localStorage.setItem("ROLE",role);
    if(islogin==true){
      window.localStorage.setItem("islogin","true");
    }else{
      window.localStorage.setItem("islogin","false");
    }

  }
}
