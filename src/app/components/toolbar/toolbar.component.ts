import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { DataService } from 'src/app/services/data.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public serverSerice: ServerService, private dataService: DataService, private alertService: AlertsService, private router: Router) { }

  ngOnInit(): void {
  }

  eliminarFlujo() {
    this.alertService.showDangerAlert('Está Seguro?').then(result => {
      if (result.isConfirmed) {
        this.serverSerice.deleteFlujo().subscribe(({ msg }: { msg: string }) => {
          this.alertService.showMessageAlert(msg);
          this.router.navigate(['/inicio']);
        });
      }
    });
  }

}
