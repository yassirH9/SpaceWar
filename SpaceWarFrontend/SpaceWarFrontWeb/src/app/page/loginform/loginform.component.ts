import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ILogin } from 'src/app/models/ILogin';
import { ILoginResponse } from 'src/app/models/ILoginResponse';
import { AuthServiceService } from 'src/app/service/auth-service.service';
//cookie
import { CookieService } from 'ngx-cookie-service';
import { StorageserviceService } from '../../service/TokenService/storageservice.service'
import { RoleserviceService } from 'src/app/service/RolService/roleservice.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent implements OnInit {

  constructor(private roleservice: RoleserviceService, private auth: AuthServiceService, private cookie: CookieService,private storage: StorageserviceService) { }


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
