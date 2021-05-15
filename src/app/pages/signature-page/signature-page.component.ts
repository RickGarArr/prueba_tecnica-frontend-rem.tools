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

  constructor(public dataService: DataService, private serverService: ServerService, private router: Router, private alertService: AlertsService) { }

  ngOnInit(): void {
  }

  async enviarData() {
    const result = await this.alertService.showConfirmAlert('está seguro de finalizar el flujo?');
    if (result.isConfirmed) {
      this.alertService.showLoadingAlert('guardando informacion en el servidor');
      this.serverService.finalizarFlujo().subscribe(({ msg, uuid }: { msg: string, uuid: string }) => {
        this.alertService.closeAlert();
        setTimeout(()=> {
          this.alertService.showMessageAlert(`UUID: ${uuid}`, msg).then(() => {
            this.router.navigate(['/inicio']);
          });
        }, 150);
      }, ({error}: HttpErrorResponse) => {
        this.alertService.closeAlert();
        this.alertService.showErrorAlert(error.errores[0]);
      });
    }

  }

}
