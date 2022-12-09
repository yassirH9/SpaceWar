import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { IRegister } from 'src/app/models/IRegister';
//cookie
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.scss']
})
export class RegisterformComponent implements OnInit {

  constructor(private auth: AuthServiceService, private cookie: CookieService) { }
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
    const userdata: IRegister = {
      nickname: btoa(this.register.value.nickname!),
      mail: this.register.value.mail!,
      pswd: btoa(this.register.value.password!),
    }
    this.auth.register(userdata).subscribe((data) => {
      console.log(data);
      this.isSuccessful = true;
      this.isSignUpFailed = false;
    })

  }
}
