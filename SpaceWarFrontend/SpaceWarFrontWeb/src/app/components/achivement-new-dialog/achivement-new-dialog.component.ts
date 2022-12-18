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
  selector: 'app-achivement-new-dialog',
  templateUrl: './achivement-new-dialog.component.html',
  styleUrls: ['./achivement-new-dialog.component.scss']
})
export class AchivementNewDialogComponent {
  //input data
  id: any;
  plid: any;

  fulleditable: boolean;
  //form group
  editForm = new FormGroup({
    id: new FormControl(''),
    plid: new FormControl(''),
  })

  constructor(
    public dialogRef: MatDialogRef<AchivementNewDialogComponent>,
    private endpoint: EndpointServiceService,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    //injet data
    // this.id = data.id;
    // this.plid = data.plid;

    this.fulleditable = data.fullEditable;
  }
  ngOnInit() {
    //añadir valores injectados al formulario de edicion
    // this.editForm.setValue({
    //   id: this.id,
    //   plid: this.plid,
    // });

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

    console.log(this.plid);
    if (this.plid != "" && this.plid != "") {
      document.getElementById("error-sub")!.style.display = "none";

      const user: ILoginResponse = {
        plid: this.plid,
        nickname: "",
        mail: "",
        accessToken: "",
        rol: "",
        pswd: "",
      }
      const masterachivement: MasterAchivement = {
        id: this.id,
        name: "",
        description: "",
      }
      const achivement: Achivement = {
        userm: user,
        masterAchivement: masterachivement,
      }

      this.endpoint.postAchivement(achivement).subscribe((data) => {
        this.dialogRef.close();

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
    }else{
      document.getElementById("error-sub")!.style.display = "block";
    }
  }
}
