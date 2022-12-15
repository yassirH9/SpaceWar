import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleserviceService } from 'src/app/service/RolService/roleservice.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  imgpath = "../../../assets/images/icons/download.png";
  constructor(
    private role:RoleserviceService,
    private route:Router,
  ) { }

  ngOnInit(): void {
    //loguea tras recargar los datos cambiados
    if(window.localStorage.getItem("ROLE")!=null){
      this.role.login(window.localStorage.getItem("ROLE")!);
    }else{
      this.route.navigateByUrl("/ranking");
    }
  }

  onClic(){
    alert("Download not available");
  }
}
