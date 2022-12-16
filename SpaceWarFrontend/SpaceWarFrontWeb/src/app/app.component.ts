import { Component } from '@angular/core';
import { RoleserviceService } from './service/RolService/roleservice.service';
import { StorageserviceService } from './service/TokenService/storageservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SpaceWarFrontWeb';
  constructor(
    private storage: StorageserviceService,
    private role: RoleserviceService,
  ) { }
  ngOnInit(): void {
  }
  //al cerrar la web se elimina todos los datos de sesion del usuario
  ngOnDestroy(): void {
    this.storage.signOut();
    this.role.logout();
  }
}
