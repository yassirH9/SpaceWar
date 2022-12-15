import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { EndpointServiceService } from 'src/app/service/endpoint-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { RankingModel } from 'src/app/models/RankingModel';
import { ILogin } from 'src/app/models/ILogin';
import { ILoginResponse } from 'src/app/models/ILoginResponse';

@Component({
  selector: 'app-ranking-new-dialog',
  templateUrl: './ranking-new-dialog.component.html',
  styleUrls: ['./ranking-new-dialog.component.scss']
})
export class RankingNewDialogComponent {
 //input data
 rankID:any;
 plid: any;
 nickname:any;
 points:any;

 fulleditable:boolean;
 //form group
 editForm = new FormGroup({
   plid: new FormControl(''),
   nickname: new FormControl(''),
   points: new FormControl(''),
 })

 constructor(
   public dialogRef: MatDialogRef<RankingNewDialogComponent>,
   private endpoint: EndpointServiceService,
   @Inject(MAT_DIALOG_DATA) data: any,
 ){
   //injet data
   this.plid = data.plid;
   this.nickname = data.nickname;
   this.points = data.points;
   //para el id del ranking
   this.rankID = data.id;
   this.fulleditable = data.fullEditable;
 }
 ngOnInit(){
   //añadir valores injectados al formulario de edicion
   this.editForm.setValue({
     plid: this.plid,
     nickname: this.nickname,
     points: this.points,
   });

   console.log(this.fulleditable);
   if(this.fulleditable === true){
     document.getElementById('id')!.removeAttribute("readonly");
     document.getElementById('nickname')!.removeAttribute("readonly");
   }
 }
 onNoClick(){
   //cerrar formulario en caso de pulsar cancelar
   this.dialogRef.close();
 }
 send(){
   this.plid = this.editForm.get("plid")!.value;
   this.nickname = this.editForm.get("nickname")!.value;
   this.points = this.editForm.get("points")!.value;

   const user: ILoginResponse = {
     plid: this.plid,
     nickname: "",
     mail: "",
     accessToken: "",
     rol: "",
     pswd: "", 
    }
   const rank: RankingModel = {
     userplid: user,
     points: this.points,
   }

   this.endpoint.postRanking(rank).subscribe((data)=>{

   });
   this.dialogRef.close();
 }
}
