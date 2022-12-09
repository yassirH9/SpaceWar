import { Component, OnInit,HostListener } from '@angular/core';
//cookie
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 
  constructor(private cookie:CookieService) { }
  menuicon = "../../../assets/images/icons/menu.png"
  imgsrc = "../../../assets/images/icons/user-placeholder.png"

  //links section
  ranking = "/ranking"
  select = "/select"
  statistics = "/statistics"
  achivement = "/achivement"
  download = "/download"
  admin="/adminzone"
  ngOnInit(): void {
    
  }
  onUser(){
    if(this.cookie.get('userToken')==""){
      console.log(this.cookie.get('userToken'));
      window.location.href = this.select;
    }else{
      //cambiar img a la del usuario
      //hacer que el boton dirija a la pestaña del usuario
      //cambiar css para que la imagen se vea circular
      this.imgsrc = "";
    }
  }

  openmenu(){
    //alert("works")
    var hammenu =  document.getElementById("hammenu");
    if(hammenu?.style.visibility == "visible"){
      hammenu.style.visibility = "hidden";
    }else{
      hammenu!.style.visibility = "visible";
    }
    // document.getElementById("hammenu")!.style.visibility = "visible";
  }


  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if(window.innerWidth > 800){
      document.getElementById("hammenu")!.style.visibility = "hidden";
    }
  }
}
