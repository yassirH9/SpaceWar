import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointServiceService } from 'src/app/service/endpoint-service.service';
import { RoleserviceService } from 'src/app/service/RolService/roleservice.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  //vars
  score:number=0;
  constructor(
    private service:EndpointServiceService,
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
    this.getDataTable();
  }

  getDataTable(){
    let plid = window.sessionStorage.getItem("user-id")!;
    this.service.getRanking(plid).subscribe(data=>{
      this.score = data.points;
    })
  }
}
