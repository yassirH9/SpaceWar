import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
//security
import { StorageserviceService } from 'src/app/service/TokenService/storageservice.service';
import { RoleserviceService } from 'src/app/service/RolService/roleservice.service';
import { EndpointServiceService } from 'src/app/service/endpoint-service.service';
//form
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { IUserSimple } from 'src/app/models/IUserSimple';
//Base64 to Image
import { DomSanitizer } from '@angular/platform-browser';
import { ImageserviceService } from 'src/app/service/imageservice.service';
// sweetalert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent {
  editable: boolean = false;
  buttonHide: boolean = true;
  //user Data
  userplid: any;
  username: any;
  usermail: any;
  userpswd: any;
  imageURL: any;
  //form
  userForm = new FormGroup({
    name: new FormControl(''),
    mail: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(
    private storage: StorageserviceService,
    private role: RoleserviceService,
    private route: Router,
    private endpoint: EndpointServiceService,
    private _sanitizer: DomSanitizer,
    private imageService: ImageserviceService,
  ) {

  }

  ngOnInit(): void {
    //loguea tras recargar los datos cambiados
    if (window.localStorage.getItem("ROLE") != null) {
      this.role.login(window.localStorage.getItem("ROLE")!);
    } else {
      this.route.navigateByUrl("/ranking");
    }

    //obtiene el plid del usuario logueado para hacer la peticion de datos
    this.userplid = window.sessionStorage.getItem("user-id")!;
    //trae los nuevos datos
    this.endpoint.getUser(this.userplid).subscribe((data) => {
      // console.log(data);
      this.username = data.nickname;
      this.usermail = data.mail;
      this.userpswd = data.pswd;

      //set data on form
      this.userForm.setValue({
        name: data.nickname,
        mail: data.mail,
        password: data.pswd,
      });
    });
    //toma imagen de usuario
    this.getUserImage();
  }
  toggleEdit() {
    if (this.editable == false) {
      this.editable = true;
      this.buttonHide = false;
    }
    this.userForm.setValue({
      name: this.username,
      mail: this.usermail,
      password: "",
    });
  }
  sendChanges() {
    var mailIsValid: boolean = false;
    var userIsValid: boolean = false;
    var pswdIsValid: boolean = false;

    //Labels de error de usuario
    var mailLabel = document.getElementById("mail-label");
    var nicknameLabel1 = document.getElementById("nickname-label1");
    var nicknameLabel2 = document.getElementById("nickname-label2");
    var pswdLabel1 = document.getElementById("pswd-label1");
    var pswdLabel2 = document.getElementById("pswd-label2");

    const mailRegex = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
    if (mailRegex.test(this.userForm.value.mail!)) {
      // console.log("mail valido");
      mailIsValid = true;
      mailLabel!.style.display = "none";
    } else {
      // console.log("mail no valido");
      mailIsValid = false;
      mailLabel!.style.display = "block";
    }
    //contraseña
    /*
    Contenga entre 8 y 64 caracteres.
    Cada carácter de la contraseña sea uno de los siguientes:
    Cualquier carácter imprimible en ASCII (códigos de carácter de 32 a 126, inclusive).
    */
    const pswdRegex = new RegExp(/^[\x20-\x7E]{8,64}$/);
    if (pswdRegex.test(this.userForm.value.password!)) {
      // console.log("pswd valido");
      pswdIsValid = true;
      pswdLabel1!.style.display = "none";
      pswdLabel2!.style.display = "none";
    } else {
      // console.log("pswd no valido");
      pswdIsValid = false;
      pswdLabel1!.style.display = "block";
      pswdLabel2!.style.display = "block";
    }
    //nickname
    /*
    nickname entre 5 y 15 caracteres numero o letra
    no ser nulo
    */
    if (this.userForm.value.name! != "" && this.userForm.value.name!.length > 5 && this.userForm.value.name!.length < 15) {
      // console.log("nickname valido");
      userIsValid = true;
      nicknameLabel1!.style.display = "none";
      nicknameLabel2!.style.display = "none";
    } else {
      // console.log("nickname no valido");
      userIsValid = false;
      nicknameLabel1!.style.display = "block";
      nicknameLabel2!.style.display = "block";
    }
    if (mailIsValid && pswdIsValid && userIsValid) {
      if (this.editable == true) {
        this.editable = false;
        this.buttonHide = true;
      }
      this.username = this.userForm.get('name')!.value;
      this.usermail = this.userForm.get('mail')!.value;
      this.userpswd = this.userForm.get('password')!.value;
      const user: IUserSimple = {
        NICKNAME: this.username,
        MAIL: this.usermail,
        PSWD: this.userpswd,
      };
      // console.log(user);

      this.endpoint.putUser(this.userplid, user).subscribe((data) => {
        // console.log(data);

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
      //se hace que el usuario inicie sesion de nuevo con las nuevas credenciales
      this.logOut();
    }
  }
  logOut() {
    this.role.logout();
    this.storage.signOut();
    window.sessionStorage.setItem('user-img', '');
    this.route.navigateByUrl("/login");
  }

  //-------------------------------------------------
  //Image crud

  //button selector
  //hace una peticion get si esta devuelve que no hay foto usa un post si hay imagen hace un put
  checkType() {
    //this.ImageBase64 = ""; //setea nulo la imagen por si habia una 
    let check: any = this.getUserImage();
    // console.log(check);

    if (this.ImageBase64 == "" || this.ImageBase64 == "../../../assets/images/icons/user-placeholder.png") {
      console.log("Post Image");
      document.getElementById('postImage')!.click();
    } else {
      console.log("Put Image");
      document.getElementById('putImage')!.click();
    }
  }

  //var contenedora de la imagen en Base64
  ImageBase64: string = "";
  //peticion get al backend
  getUserImage() {
    this.imageService.getImageByUserID(this.userplid).subscribe((data) => {
      this.ImageBase64 = 'data:image/jpg;base64,' + data.image;
      // console.log(this.ImageBase64);
    }, (error_) => {
      if (error_.status == 504) {
        Swal.fire(
          'Please try again later',
          'We are currently experiencing unexpected problems with the server.',
          'warning'
        )
      }
      if (error_.status == 500) {
        console.log("User sin imagen");
        this.ImageBase64 = '../../../assets/images/icons/user-placeholder.png';
      }
      if (error_.status == 401) {
        Swal.fire(
          'Unauthorized',
          'please log in.',
          'warning'
        )
      }
    })
    return this.ImageBase64;
  }
  //peticion put al backend
  putUserImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //console.log(reader.result);
      this.ImageBase64 = reader.result?.toString()!;
      this.imageService.putImageByUserID(file, this.userplid).subscribe((data) => {
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
    };
  }
  postUserImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //console.log(reader.result);
      this.ImageBase64 = reader.result?.toString()!;
      this.imageService.postImageByUserID(file, this.userplid).subscribe((data) => {
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
    };
  }
  deleteUserImage() {
    Swal.fire({
      title: 'Are you sure want to remove your user image?',
      text: 'Once deleted, the image cannot be recovered.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: 'red',
      cancelButtonText: 'No, keep it',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your user image has been successfully deleted.',
          'success',
        ).then((result) => {
          window.location.reload();
        })
        this.imageService.deleteImageByUserID(window.sessionStorage.getItem('user-id')!).subscribe((data) => {

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
        })
      }
    })
  }
}
