import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointServiceService } from 'src/app/service/endpoint-service.service';
import { RoleserviceService } from 'src/app/service/RolService/roleservice.service';
import Swal from 'sweetalert2';
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
      document.getElementById("error")!.style.display = "none";
    },(error_) => {
      if (error_.status == 504) {
        Swal.fire(
          'Please try again later',
          'We are currently experiencing unexpected problems with the server.',
          'warning'
        )
      }
      if (error_.status == 500) {
        // Swal.fire(
        //   'Please try again later',
        //   'Server validation error',
        //   'warning'
        // )
        this.score = 0;
        console.log("este usuario no tiene score almacenado");
      }
      if (error_.status == 401) {
        Swal.fire(
          'Unauthorized',
          'please log in.',
          'warning'
        )
      }
    })
  }
}
