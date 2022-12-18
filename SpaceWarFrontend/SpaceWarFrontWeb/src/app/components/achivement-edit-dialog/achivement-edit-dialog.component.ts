import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { EndpointServiceService } from 'src/app/service/endpoint-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { RankingModel } from 'src/app/models/RankingModel';
import { ILogin } from 'src/app/models/ILogin';
import { ILoginResponse } from 'src/app/models/ILoginResponse';
import { MasterAchivement } from 'src/app/models/MasterAchivement';
import { Achivement } from 'src/app/models/Achivement';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-achivement-edit-dialog',
  templateUrl: './achivement-edit-dialog.component.html',
  styleUrls: ['./achivement-edit-dialog.component.scss']
})
export class AchivementEditDialogComponent {
//input data
id: any;
plid: any;
achid:any;

fulleditable: boolean;
//form group
editForm = new FormGroup({
  id: new FormControl(''),
  plid: new FormControl(''),
  achid: new FormControl(''),
})

constructor(
  public dialogRef: MatDialogRef<AchivementEditDialogComponent>,
  private endpoint: EndpointServiceService,
  @Inject(MAT_DIALOG_DATA) data: any,
) {
  //injet data
  this.achid = data.achid;

  this.id = data.id;
  this.plid = data.plid;

  this.fulleditable = data.fullEditable;
}
ngOnInit() {
  //añadir valores injectados al formulario de edicion
  this.editForm.setValue({
    id: this.id,
    plid: this.plid,
    achid: this.achid,
  });

  console.log(this.fulleditable);
  if (this.fulleditable === true) {
    document.getElementById('id')!.removeAttribute("readonly");
    //document.getElementById('name')!.removeAttribute("readonly");
  }
}
onNoClick() {
  //cerrar formulario en caso de pulsar cancelar
  this.dialogRef.close();
}
send() {
  this.id = this.editForm.get("id")!.value;
  this.plid = this.editForm.get("plid")!.value;
  this.achid = this.editForm.get("achid")!.value;

  const user: ILoginResponse = {
    plid: this.plid,
    nickname: "",
    mail:"",
    accessToken:"",
    rol:"",
    pswd:"",      
  }
  const masterachivement: MasterAchivement ={
    id:this.id,
    name:"",
    description:"",
  }
  const achivement: Achivement = {
   userm:user,
   masterAchivement: masterachivement,
   id:this.achid,
  }

  this.endpoint.putAchivement(achivement,this.achid).subscribe((data) => {

  },(error)=>{
    Swal.fire(
      'Unexpected error',
      'It is due to some problem with the server, please try again later.',
      'warning'
    )
  });
  this.dialogRef.close();
}
}
