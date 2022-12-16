import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Achivement } from 'src/app/models/Achivement';
import { MasterAchivement } from 'src/app/models/MasterAchivement';
import { EndpointServiceService } from 'src/app/service/endpoint-service.service';
import { RoleserviceService } from 'src/app/service/RolService/roleservice.service';

@Component({
  selector: 'app-achivement',
  templateUrl: './achivement.component.html',
  styleUrls: ['./achivement.component.scss']
})
export class AchivementComponent {
  //datos de comparacion
  masterAch: Array<MasterAchivement> = [];
  AllAchivement: Array<Achivement> = [];

  //datos a mostrar
  UserAch: Array<Achivement> = [];

  constructor(
    private role: RoleserviceService,
    private route: Router,
    private endpoint: EndpointServiceService,
  ) {

  }
  ngOnInit(): void {
    //loguea tras recargar los datos cambiados
    if (window.localStorage.getItem("ROLE") != null) {
      this.role.login(window.localStorage.getItem("ROLE")!);
    } else {
      this.route.navigateByUrl("/ranking");
    }

    //obtencion de todos los logros maestros para la comparacion
    this.endpoint.getAllMasterAchivement().subscribe((data) => {
      this.masterAch = data;
    });
    this.endpoint.getAllAchivement().subscribe((data) => {
      this.AllAchivement = data;
    });

    //el back da los achivement del usuario concreto
    this.endpoint.getAllAchivementByUser(window.sessionStorage.getItem("user-id")!).subscribe(data => {
      // console.log(data);
      this.UserAch = data;
    })
  }

  AchivementExist(MastAchID: string) {
    let result:boolean;

    this.UserAch.forEach((data) => {
      if (data.masterAchivement.id === MastAchID) {
        result = true;
      }
    })
    // console.log(result!);
    return result!;
  }
}
