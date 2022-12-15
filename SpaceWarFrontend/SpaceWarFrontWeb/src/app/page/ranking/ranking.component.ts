import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RankingModel } from 'src/app/models/RankingModel';
import { EndpointServiceService } from 'src/app/service/endpoint-service.service';
import { RoleserviceService } from 'src/app/service/RolService/roleservice.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  //array para almacenar el ranking
  rankingData: Array<RankingModel>=[]
  constructor(
    private service:EndpointServiceService, 
    private roleservice: RoleserviceService,
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
    //console.log();
    //console.log(this.roleservice.isLoggedIn(),this.roleservice.getRole());
  }

  getDataTable(){
    this.service.getAllRanking().subscribe((data)=>{
      //console.log(data);
      this.rankingData = data;
      
      //ordena el vector de mayor a menor puesto en base a sus puntos
      this.rankingData.sort((a,b)=>
        a.points > b.points ? -1:
        0
      );
      document.getElementById("error")!.style.display = "none";
    },
    (error_)=>{
      document.getElementById("error")!.style.display = "block";
    });
  }
}
