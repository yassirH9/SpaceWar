import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typeauthselector',
  templateUrl: './typeauthselector.component.html',
  styleUrls: ['./typeauthselector.component.scss']
})
export class TypeauthselectorComponent implements OnInit {

  constructor() { }
  LoginImagePath:string = "../../../assets/images/icons/spaceman_login.png"
  RegisterImagePath:string = "../../../assets/images/icons/spaceman_register.png"
  ngOnInit(): void {
  }
  goToLogin(){
    window.location.href="/login";
  }
  goToRegister(){
    window.location.href="/register";
  }
}
