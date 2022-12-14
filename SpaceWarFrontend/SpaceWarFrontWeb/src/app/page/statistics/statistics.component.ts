import { Component, OnInit } from '@angular/core';
import { EndpointServiceService } from 'src/app/service/endpoint-service.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  //vars
  score:number=0;
  constructor(private service:EndpointServiceService) { }

  ngOnInit(): void {
    this.getDataTable();
  }

  getDataTable(){
    let plid = window.sessionStorage.getItem("user-id")!;
    this.service.getRanking(plid).subscribe(data=>{
      this.score = data.points;
    })
  }
}
