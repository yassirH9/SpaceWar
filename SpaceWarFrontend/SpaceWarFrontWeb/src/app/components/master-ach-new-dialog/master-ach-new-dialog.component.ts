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
      id: "",
      name: "",
      description: "",
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
    if (this.name != "" && this.description != "") {
      document.getElementById("error-sub")!.style.display = "none";
      const MastAchivement = {
        id: this.id,
        name: this.name,
        description: this.description,
      }

      this.endpoint.postMasterAchivement(MastAchivement).subscribe((data) => {

      }, (error_) => {
        if (error_.status == 504) {
          Swal.fire(
            'Please try again later',
            'We are currently experiencing unexpected problems with the server.',
            'warning'
          )
        }
        if (error_.status == 500) {
          Swal.fire(
            'Please try again later',
            'Server validation error',
            'warning'
          )
        }
        if (error_.status == 401) {
          Swal.fire(
            'Unauthorized',
            'please log in.',
            'warning'
          )
        }
      });
      this.dialogRef.close();

    }else{
      document.getElementById("error-sub")!.style.display = "block";
    }
  }
}
