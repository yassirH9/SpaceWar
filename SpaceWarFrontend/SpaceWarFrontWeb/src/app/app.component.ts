import { Component } from '@angular/core';
import { StorageserviceService } from './service/TokenService/storageservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SpaceWarFrontWeb';
  constructor(
    private storage:StorageserviceService,
    ){}
  //al iniciar la app web comprueba que no haya ningun usuario en el sesion storage o el local storage de residuo
  ngOnInit(): void {
    //comentado para test de endpoint
    //this.storage.signOut();
  }
}
