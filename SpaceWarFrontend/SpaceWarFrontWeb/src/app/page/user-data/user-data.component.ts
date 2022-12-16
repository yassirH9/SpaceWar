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
      console.log(data);
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
    if (this.userForm.get('password')!.value === "") {
      alert("Introduzca una contraseña valida");
    } else {
      if (this.editable == true) {
        this.editable = false;
        this.buttonHide = true;
      }
      const user: IUserSimple = {
        NICKNAME: this.username,
        MAIL: this.usermail,
        PSWD: this.userpswd,
      };
      this.endpoint.putUser(this.userplid, user).subscribe((data) => {
        console.log(data);

      })
    }
  }
  logOut() {
    this.role.logout();
    this.storage.signOut();
    window.sessionStorage.setItem('user-img','');
    this.route.navigateByUrl("/login");
  }

  //-------------------------------------------------
  //Image crud

  //button selector
  //hace una peticion get si esta devuelve que no hay foto usa un post si hay imagen hace un put
  checkType() {
    //this.ImageBase64 = ""; //setea nulo la imagen por si habia una 
    let check:any = this.getUserImage();
    console.log(check);
    
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
    }, (error) => {
      console.log("User sin imagen");
      this.ImageBase64 = '../../../assets/images/icons/user-placeholder.png';
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
      this.imageService.putImageByUserID(file,this.userplid).subscribe((data)=>{
      },(error)=>{
       console.log(error);
      });
    };
  }
  postUserImage(event:any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //console.log(reader.result);
      this.ImageBase64 = reader.result?.toString()!;
      this.imageService.postImageByUserID(file,this.userplid).subscribe((data)=>{
      },(error)=>{
       console.log(error);
      });
    };
  }
  deleteUserImage(){
    
  }
}
