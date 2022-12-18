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
  selector: 'app-ranking-edit-dialog',
  templateUrl: './ranking-edit-dialog.component.html',
  styleUrls: ['./ranking-edit-dialog.component.scss']
})
export class RankingEditDialogComponent {
  //input data
  rankID: any;
  plid: any;
  nickname: any;
  points: any;

  fulleditable: boolean;
  //form group
  editForm = new FormGroup({
    plid: new FormControl(''),
    nickname: new FormControl(''),
    points: new FormControl(''),
  })

  constructor(
    public dialogRef: MatDialogRef<RankingEditDialogComponent>,
    private endpoint: EndpointServiceService,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    //injet data
    this.plid = data.plid;
    this.nickname = data.nickname;
    this.points = data.points;
    //para el id del ranking
    this.rankID = data.id;
    this.fulleditable = data.fullEditable;
  }
  ngOnInit() {
    //añadir valores injectados al formulario de edicion
    this.editForm.setValue({
      plid: this.plid,
      nickname: this.nickname,
      points: this.points,
    });

    console.log(this.fulleditable);
    if (this.fulleditable === true) {
      document.getElementById('id')!.removeAttribute("readonly");
      document.getElementById('nickname')!.removeAttribute("readonly");
    }
  }
  onNoClick() {
    //cerrar formulario en caso de pulsar cancelar
    this.dialogRef.close();
  }
  send() {
    this.plid = this.editForm.get("plid")!.value;
    this.nickname = this.editForm.get("nickname")!.value;
    this.points = this.editForm.get("points")!.value;
    if (this.points != null) {
      
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
        id: this.rankID,
      }

      document.getElementById("error-sub")!.style.display = "none";

      Swal.fire({
        title: 'Are you sure want to edit this ranking',
        text: '',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, save it!',
        confirmButtonColor: 'red',
        cancelButtonText: 'No, keep it',
        cancelButtonColor: 'black',
      }).then((result) => {
        if (result.value) {
          this.endpoint.putRanking(rank, this.rankID).subscribe((data) => {
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
        }
      })
    } else {
      document.getElementById("error-sub")!.style.display = "block";
    }
    // this.endpoint.putRanking(rank,this.rankID).subscribe((data)=>{

    // },(error)=>{
    //   Swal.fire(
    //     'Unexpected error',
    //     'It is due to some problem with the server, please try again later.',
    //     'warning'
    //   )
    // });
    // this.dialogRef.close();
  }
}
