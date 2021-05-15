import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { ServerService } from '../services/server.service';

@Injectable({
  providedIn: 'root'
})
export class PagesGuard implements CanActivate {

  constructor(private dataService: DataService, private router: Router, private serverService: ServerService) {

  }

  canActivate({ url: [index] }: ActivatedRouteSnapshot): boolean {
    let valorAEvaluar = null;
    switch (index.path) {
      case 'formulario':
        valorAEvaluar = this.serverService._uuid;
        break;
      case 'camara':
        valorAEvaluar = this.dataService.personalData;
        break;
      case 'firma':
        valorAEvaluar = this.dataService.fileVideo;
        break;
    }

    if (!valorAEvaluar) {
      switch (index.path) {
        case 'formulario':
          this.router.navigate(['inicio']);
          break;
        case 'camara':
          this.router.navigate(['formulario']);
          break;
        case 'firma':
          this.router.navigate(['camara']);
          break;
      }
      return false;
    }
    return true;
  }

}
