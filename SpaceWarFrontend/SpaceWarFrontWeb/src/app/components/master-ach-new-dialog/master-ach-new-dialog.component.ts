import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { EndpointServiceService } from 'src/app/service/endpoint-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { RankingModel } from 'src/app/models/RankingModel';
import { ILogin } from 'src/app/models/ILogin';
import { ILoginResponse } from 'src/app/models/ILoginResponse';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-master-ach-new-dialog',
  templateUrl: './master-ach-new-dialog.component.html',
  styleUrls: ['./master-ach-new-dialog.component.scss']
})
export class MasterAchNewDialogComponent {
  //input data
  id: any;
  name: any;
  description: any;

  fulleditable: boolean;
  //form group
  editForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
  })

  constructor(
    public dialogRef: MatDialogRef<MasterAchNewDialogComponent>,
    private endpoint: EndpointServiceService,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    //injet data
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;

    this.fulleditable = data.fullEditable;
  }
  ngOnInit() {
    //añadir valores injectados al formulario de edicion
    this.editForm.setValue({
      id: this.id,
      name: this.name,
      description: this.description,
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
    this.name = this.editForm.get("name")!.value;
    this.description = this.editForm.get("description")!.value;

    const MastAchivement = {
      id: this.id,
      name: this.name,
      description: this.description,
    }

    this.endpoint.postMasterAchivement(MastAchivement).subscribe((data) => {

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
