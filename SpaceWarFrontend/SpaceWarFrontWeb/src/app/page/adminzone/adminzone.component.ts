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
import Swal from 'sweetalert2';

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
      document.getElementById("error")!.style.display = "none";
    },
      (error_) => {
        if (error_.status == 504) {
          Swal.fire(
            'Please try again later',
            'We are currently experiencing unexpected problems with the server.',
            'warning'
          )
          document.getElementById("error")!.style.display = "block";
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
    //getAll para ranking
    this.endpoint.getAllRanking().subscribe((data) => {
      this.ranking = data;
      document.getElementById("error")!.style.display = "none";
    },
      (error_) => {
        if (error_.status == 504) {
          Swal.fire(
            'Please try again later',
            'We are currently experiencing unexpected problems with the server.',
            'warning'
          )
          document.getElementById("error")!.style.display = "block";
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
    //getAll para master achivement
    this.endpoint.getAllMasterAchivement().subscribe((data) => {
      this.masterAchivement = data;
      document.getElementById("error")!.style.display = "none";
    },
      (error_) => {
        if (error_.status == 504) {
          Swal.fire(
            'Please try again later',
            'We are currently experiencing unexpected problems with the server.',
            'warning'
          )
          document.getElementById("error")!.style.display = "block";
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
    // getALL para achivement
    this.endpoint.getAllAchivement().subscribe((data) => {
      this.achivement = data;
      document.getElementById("error")!.style.display = "none";
    },
      (error_) => {
        if (error_.status == 504) {
          Swal.fire(
            'Please try again later',
            'We are currently experiencing unexpected problems with the server.',
            'warning'
          )
          document.getElementById("error")!.style.display = "block";
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
  //---------------------------------------------------------
  //users actions
  delUser(plid: any) {

    Swal.fire({
      title: 'Are you sure want to remove an user?',
      text: 'Once deleted, the user cannot be recovered.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: 'red',
      cancelButtonText: 'No, keep it',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.endpoint.delUser(plid).subscribe((data) => {

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
              'The user could not be deleted',
              'The server has rejected the action',
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
        Swal.fire(
          'Deleted!',
          'User successfully deleted.',
          'success',
        ).then((result) => {
          window.location.reload();
        })
      }
    })
    //----------------------------
    // this.endpoint.delUser(plid).subscribe((data) => {

    // },(error_) => {
    //   if (error_.status == 504) {
    //     Swal.fire(
    //       'Please try again later',
    //       'We are currently experiencing unexpected problems with the server.',
    //       'warning'
    //     )
    //   }
    //   if (error_.status == 500) {
    //     Swal.fire(
    //       'The user could not be deleted',
    //       'The server has rejected the action',
    //       'warning'
    //     )
    //   }
    //   if (error_.status == 401) {
    //     Swal.fire(
    //       'Unauthorized',
    //       'please log in.',
    //       'warning'
    //     )
    //   }
    // });
    // Swal.fire(
    //   'User successfully deleted',
    //   '',
    //   'success'
    // ).then((x)=>{
    //   window.location.reload();
    // });

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
    Swal.fire({
      title: 'Are you sure want to reset an ranking?',
      text: 'Once reset, the ranking cannot be recovered.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, reset it!',
      confirmButtonColor: 'red',
      cancelButtonText: 'No, keep it',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.endpoint.putRanking(rank, id).subscribe((data) => {

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
              'The ranking could not be reset',
              'The server has rejected the action',
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
        Swal.fire(
          'Ranking reset successfully',
          '',
          'success'
        ).then((x) => {
          window.location.reload();
        })
      }
    })
    //-------------------------------------------------
    // this.endpoint.putRanking(rank, id).subscribe((data) => {

    // }, (error_) => {
    //   if (error_.status == 504) {
    //     Swal.fire(
    //       'Please try again later',
    //       'We are currently experiencing unexpected problems with the server.',
    //       'warning'
    //     )
    //   }
    //   if (error_.status == 500) {
    //     Swal.fire(
    //       'The ranking could not be reset',
    //       'The server has rejected the action',
    //       'warning'
    //     )
    //   }
    //   if (error_.status == 401) {
    //     Swal.fire(
    //       'Unauthorized',
    //       'please log in.',
    //       'warning'
    //     )
    //   }
    // });
    // Swal.fire(
    //   'Ranking reset successfully',
    //   '',
    //   'success'
    // ).then((x) => {
    //   window.location.reload();
    // })
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

    Swal.fire({
      title: 'Are you sure want to remove an ranking?',
      text: 'Once deleted, the ranking cannot be recovered.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: 'red',
      cancelButtonText: 'No, keep it',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.endpoint.delRanking(id).subscribe((data) => {
          console.log("Delete ranking by id: " + id);
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
              'It has not been possible to remove the ranking',
              'The server has rejected the action',
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
        Swal.fire(
          'Deleted!',
          'Ranking successfully deleted.',
          'success',
        ).then((result) => {
          window.location.reload();
        })
      }
    })
    //----------------------------------------------------
    // this.endpoint.delRanking(id).subscribe((data) => {
    //   console.log("Delete ranking by id: " + id);
    // },(error_) => {
    //   if (error_.status == 504) {
    //     Swal.fire(
    //       'Please try again later',
    //       'We are currently experiencing unexpected problems with the server.',
    //       'warning'
    //     )
    //   }
    //   if (error_.status == 500) {
    //     Swal.fire(
    //       'It has not been possible to remove the ranking',
    //       'The server has rejected the action',
    //       'warning'
    //     )
    //   }
    //   if (error_.status == 401) {
    //     Swal.fire(
    //       'Unauthorized',
    //       'please log in.',
    //       'warning'
    //     )
    //   }
    // });
    // Swal.fire(
    //   'Ranking correctly eliminated',
    //   '',
    //   'warning'
    // ).then((x)=>{
    //   window.location.reload();
    // })
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
  putMastAchivement(id: number, name: string, description: string) {
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
  delMastAchivement(id: number) {

    Swal.fire({
      title: 'Are you sure want to remove an master achivement?',
      text: 'Once deleted, the master ach. cannot be recovered.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: 'red',
      cancelButtonText: 'No, keep it',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.endpoint.delMasterAchivement(id).subscribe((data) => {

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
              'It has not been possible to remove the master achivement',
              'The server has rejected the action',
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
        Swal.fire(
          'Deleted!',
          'Master ach. successfully deleted.',
          'success',
        ).then((result) => {
          window.location.reload();
        })
      }
    })

    //---------------------------------------------
    // console.log("Delete Mast. Ach. by id: " + id);
    // this.endpoint.delMasterAchivement(id).subscribe((data) => {

    // }, (error_) => {
    //   if (error_.status == 504) {
    //     Swal.fire(
    //       'Please try again later',
    //       'We are currently experiencing unexpected problems with the server.',
    //       'warning'
    //     )
    //   }
    //   if (error_.status == 500) {
    //     Swal.fire(
    //       'It has not been possible to remove the master achivement',
    //       'The server has rejected the action',
    //       'warning'
    //     )
    //   }
    //   if (error_.status == 401) {
    //     Swal.fire(
    //       'Unauthorized',
    //       'please log in.',
    //       'warning'
    //     )
    //   }
    // });
    // Swal.fire(
    //   'Master achivement correctly eliminated',
    //   '',
    //   'warning'
    // ).then((x) => {
    //   window.location.reload();
    // })
  }
  postMastAchivement() {
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
  putAchivement(plid: number, id: number, achid: number) {
    console.log("Edit achivement by id: " + id);
    this.mDialog.open(AchivementEditDialogComponent, {
      data: {
        fullEditable: false,
        achid: achid,
        plid: plid,
        id: id,
      },
      width: '500px',
      height: '400px',
    }).beforeClosed().subscribe(data => {
      window.location.reload();
    });
  }
  delAchivement(id: number) {
    Swal.fire({
      title: 'Are you sure want to remove an achivement?',
      text: 'Once deleted, the achivement cannot be recovered.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: 'red',
      cancelButtonText: 'No, keep it',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.endpoint.delArchivement(id).subscribe((data) => {

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
              'It has not been possible to remove the achivement',
              'The server has rejected the action',
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
        Swal.fire(
          'Achivement successfully deleted.',
          '',
          'success'
        ).then((x) => {
          window.location.reload();
        })
      }
    })



    //---------------------------------------------
    // console.log("Deleted achivement by id: " + id);
    // this.endpoint.delArchivement(id).subscribe((data) => {

    // }, (error_) => {
    //   if (error_.status == 504) {
    //     Swal.fire(
    //       'Please try again later',
    //       'We are currently experiencing unexpected problems with the server.',
    //       'warning'
    //     )
    //   }
    //   if (error_.status == 500) {
    //     Swal.fire(
    //       'It has not been possible to remove the achivement',
    //       'The server has rejected the action',
    //       'warning'
    //     )
    //   }
    //   if (error_.status == 401) {
    //     Swal.fire(
    //       'Unauthorized',
    //       'please log in.',
    //       'warning'
    //     )
    //   }
    // });
    // Swal.fire(
    //   'Achivement correctly eliminated',
    //   '',
    //   'warning'
    // ).then((x) => {
    //   window.location.reload();
    // })
  }
  postAchivement() {
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
