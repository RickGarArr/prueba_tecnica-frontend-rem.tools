import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { DataService } from 'src/app/services/data.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-signature-page',
  templateUrl: './signature-page.component.html',
  styleUrls: ['./signature-page.component.css']
})
export class SignaturePageComponent implements OnInit {

  constructor( public dataService: DataService, private serverService: ServerService, private router: Router, private alertService: AlertsService) { }

  ngOnInit(): void {
  }

  enviarData() {
    this.alertService.showConfirmAlert('está seguro de finalizar el flujo?', (result) => {
      if(result) {
        this.serverService.finalizarFlujo().subscribe(({msg, uuid}: {msg: string, uuid: string}) => {
          this.alertService.showMessageAlert(`UUID: ${uuid}`, msg);
          this.router.navigate(['/inicio']);
          this.dataService.restoreService();
          this.serverService.restoreService();
        }, ({error}: HttpErrorResponse) => {
          console.log(error);
        });
      }
    })
  }

}
