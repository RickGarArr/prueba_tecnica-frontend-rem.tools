import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class PagesGuard implements CanActivate {

  constructor(private dataService: DataService, private router: Router) {

  }

  canActivate({ url: [index] }: ActivatedRouteSnapshot): boolean {    
    let valorAEvaluar = null;
    switch (index.path) {
      case 'camara':
        valorAEvaluar = this.dataService.personalData;
        break;
      case 'firma':
        valorAEvaluar = this.dataService.fileVideo;
        break;
    }
    
    if (!valorAEvaluar) {
      switch (index.path) {
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
