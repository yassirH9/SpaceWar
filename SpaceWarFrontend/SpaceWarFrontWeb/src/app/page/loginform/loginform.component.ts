import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ILogin } from 'src/app/models/ILogin';
import { ILoginResponse } from 'src/app/models/ILoginResponse';
import { AuthServiceService } from 'src/app/service/auth-service.service';
//cookie
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent implements OnInit {

  constructor(private auth:AuthServiceService,private cookie:CookieService) { }

  
  //loginformw
  login = new FormGroup({
    nickname: new FormControl(''),
    password: new FormControl(''),
  })

  ngOnInit(): void {
  }

  onLogin(){
    const userdata: ILogin = {
      nickname: btoa(this.login.value.nickname!),
      pswd: btoa(this.login.value.password!),
    }
    this.auth.login(userdata).subscribe((data)=>{
      this.cookie.set('userToken',data.accessToken);
      //console.log(data.nickname+":"+data.accessToken+":"+data.mail+":"+data.plid+":"+data.rol);
    });

    window.location.href="/ranking";
    //alert(this.login.get('nickname')?.value+":"+this.login.get('password')?.value);
  }
}
