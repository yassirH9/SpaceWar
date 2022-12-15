import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ILogin } from 'src/app/models/ILogin';
import { ILoginResponse } from 'src/app/models/ILoginResponse';
import { EndpointServiceService } from 'src/app/service/endpoint-service.service';

//matdialog
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from 'src/app/components/user-edit-dialog/user-edit-dialog.component';
import { Router } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RankingModel } from 'src/app/models/RankingModel';
//test reload
import { RoleserviceService } from 'src/app/service/RolService/roleservice.service';
import { StorageserviceService } from 'src/app/service/TokenService/storageservice.service';
import { RankingComponent } from '../ranking/ranking.component';
import { RankingEditDialogComponent } from 'src/app/components/ranking-edit-dialog/ranking-edit-dialog.component';
import { RankingNewDialogComponent } from 'src/app/components/ranking-new-dialog/ranking-new-dialog.component';
import { MasterAchivement } from 'src/app/models/MasterAchivement';
import { MasterAchEditDialogComponent } from 'src/app/components/master-ach-edit-dialog/master-ach-edit-dialog.component';
import { MasterAchNewDialogComponent } from 'src/app/components/master-ach-new-dialog/master-ach-new-dialog.component';
import { Achivement } from 'src/app/models/Achivement';
import { AchivementEditDialogComponent } from 'src/app/components/achivement-edit-dialog/achivement-edit-dialog.component';
import { AchivementNewDialogComponent } from 'src/app/components/achivement-new-dialog/achivement-new-dialog.component';
@Component({
  selector: 'app-adminzone',
  templateUrl: './adminzone.component.html',
  styleUrls: ['./adminzone.component.scss']
})
export class AdminzoneComponent implements OnInit {
  //vectores de tabla de datos GETALL
  users: Array<ILoginResponse> = [];
  ranking: Array<RankingModel> = [];
  masterAchivement: Array<MasterAchivement> = [];
  achivement: Array<Achivement> = [];

  constructor(
    private endpoint: EndpointServiceService,
    private mDialog: MatDialog,
    private route: Router,

    //rol
    private role: RoleserviceService,
    private storage: StorageserviceService,
  ) { }

  ngOnInit(): void {
    //loguea tras recargar los datos cambiados
    if (window.localStorage.getItem("ROLE") != null) {
      this.role.login(window.localStorage.getItem("ROLE")!);
    } else {
      this.route.navigateByUrl("/ranking");
    }
    //llamadas de datos para las tablas
    //getAll para usuario
    this.endpoint.getAllUser().subscribe((data) => {
      this.users = data;
    });
    //getAll para ranking
    this.endpoint.getAllRanking().subscribe((data) => {
      this.ranking = data;
    });
    //getAll para master achivement
    this.endpoint.getAllMasterAchivement().subscribe((data)=>{
      this.masterAchivement = data;
    });
    // getALL para achivement
    this.endpoint.getAllAchivement().subscribe((data)=>{
      this.achivement = data;
    });
    
  }
  //---------------------------------------------------------
  //users actions
  delUser(plid: any) {
    this.endpoint.delUser(plid).subscribe((data) => {

    });
    this.route.navigateByUrl("/adminzone");
  }
  putUser(plid: any, mail: any, nickname: any, pswd: any) {
    console.log("Updated user by id: " + plid);
    this.mDialog.open(UserEditDialogComponent, {
      data: {
        id: plid,
        mail: mail,
        nickname: nickname,
        pswd: pswd,
      },
      width: '500px',
      height: '400px',
    }).beforeClosed().subscribe(data => {
      window.location.reload();
    });
  }
  //---------------------------------------------------------
  //ranking actions
  resetRanking(id: number, user_plid: number) {
    console.log("Reset ranking by id: " + id);
    const user: ILoginResponse = {
      plid: user_plid,
      nickname: "",
      mail: "",
      accessToken: "",
      rol: "",
      pswd: "",
    }
    const rank: RankingModel = {
      userplid: user,
      points: 0,
      id: id,
    }

    this.endpoint.putRanking(rank, id).subscribe((data) => {

    });
    window.location.reload();
  }
  putRanking(plid: any, nickname: any, points: any, rankid: any) {
    console.log("Updated ranking by id: " + rankid);
    this.mDialog.open(RankingEditDialogComponent, {
      data: {
        fullEditable: false,

        plid: plid,
        nickname: nickname,
        points: points,
        id: rankid,
      },
      width: '500px',
      height: '400px',
    }).beforeClosed().subscribe(data => {
      window.location.reload();
    });
  }
  delRanking(id: number) {
    this.endpoint.delRanking(id).subscribe((data) => {
      console.log("Delete ranking by id: " + id);
    });
    window.location.reload();
  }
  postRanking() {
    console.log("Create new ranking");
    this.mDialog.open(RankingNewDialogComponent, {
      data: {
        fullEditable: true,

        plid: "",
        nickname: "",
        points: "",
        id: ""
      },
      width: '500px',
      height: '400px',
    }).beforeClosed().subscribe(data => {
      window.location.reload();
    });
  }
  //---------------------------------------------------------
  //ranking Master Ach
  putMastAchivement(id:number,name:string,description:string){
    console.log("Updated Master Achivement by id: " + id);
    this.mDialog.open(MasterAchEditDialogComponent, {
      data: {
        fullEditable: false,

        id: id,
        name: name,
        description: description,
      },
      width: '500px',
      height: '400px',
    }).beforeClosed().subscribe(data => {
      window.location.reload();
    });
  }
  delMastAchivement(id:number){
    console.log("Delete Mast. Ach. by id: "+id);
    this.endpoint.delMasterAchivement(id).subscribe((data)=>{

    });
    window.location.reload();
  }
  postMastAchivement(){
    console.log("Create Master Achivement");
    this.mDialog.open(MasterAchNewDialogComponent, {
      data: {
        fullEditable: false,
        id: "",
        name: "",
        description: "",
      },
      width: '500px',
      height: '400px',
    }).beforeClosed().subscribe(data => {
      window.location.reload();
    });
  }
  //---------------------------------------------------------
  //ranking Achivement
  putAchivement(plid:number,id:number,achid:number){
    console.log("Edit achivement by id: "+id);
    this.mDialog.open(AchivementEditDialogComponent, {
      data: {
        fullEditable: false,
        achid:achid,
        plid: plid,
        id: id,
      },
      width: '500px',
      height: '400px',
    }).beforeClosed().subscribe(data => {
      window.location.reload();
    });
  }
  delAchivement(id:number){
    console.log("Deleted achivement by id: "+id);
    this.endpoint.delArchivement(id).subscribe((data)=>{

    });
    window.location.reload();
  }
  postAchivement(){
    console.log("Create achivement");
    this.mDialog.open(AchivementNewDialogComponent, {
      data: {
        fullEditable: false,
      },
      width: '500px',
      height: '400px',
    }).beforeClosed().subscribe(data => {
      window.location.reload();
    });
  }
}
