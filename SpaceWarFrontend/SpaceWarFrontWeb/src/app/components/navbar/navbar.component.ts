import { Component, OnInit, HostListener } from '@angular/core';
//cookie
import { CookieService } from 'ngx-cookie-service';
import { ImageserviceService } from 'src/app/service/imageservice.service';
//storage service
import { StorageserviceService } from 'src/app/service/TokenService/storageservice.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RoleserviceService } from 'src/app/service/RolService/roleservice.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private cookie: CookieService,
    private storage: StorageserviceService,
    private imageService: ImageserviceService,
    private sanitizer: DomSanitizer,
    private route: Router,
    private roleservice: RoleserviceService,
  ) { }
  menuicon = "../../../assets/images/icons/menu.png"
  imgsrc = "../../../assets/images/icons/user-placeholder.png"
  thumbnail: any;

  //links section
  ranking = "/ranking"
  select = "/select"
  statistics = "/statistics"
  achivement = "/achivement"
  download = "/download"
  admin = "/adminzone"
  userdata = "/userdata"
  ngOnInit(): void {
    
  }
  goStatistics() {
    this.route.navigateByUrl(this.statistics);
  }
  goAchivement() {
    this.route.navigateByUrl(this.achivement);
  }
  goDownload() {
    this.route.navigateByUrl(this.download);
  }
  goAdminZone() {
    this.route.navigateByUrl(this.admin);
  }
  goRanking() {
    this.route.navigateByUrl(this.ranking);
  }
  onUser() {
    //if(this.cookie.get('userToken')==""){
    if (this.storage.getToken() == null) {
      console.log(this.storage.getToken());
      this.route.navigateByUrl(this.select);
    } else {
      this.route.navigateByUrl(this.userdata);
      console.log(this.storage.getToken());
      this.route.navigateByUrl("/userdata");
    }
  }
  openmenu() {
    //alert("works")
    var hammenu = document.getElementById("hammenu");
    if (hammenu?.style.visibility == "visible") {
      hammenu.style.visibility = "hidden";
    } else {
      hammenu!.style.visibility = "visible";
    }
    // document.getElementById("hammenu")!.style.visibility = "visible";
  }


  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth > 800) {
      document.getElementById("hammenu")!.style.visibility = "hidden";
    }
  }
}
