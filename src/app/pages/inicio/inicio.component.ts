import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { DataService } from 'src/app/services/data.service';
import { ServerService } from 'src/app/services/server.service';
import Sweet from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public uuid: string;

  constructor(private serverService: ServerService, private router: Router, private dataService: DataService, private alertSrevice: AlertsService) { }

  ngOnInit(): void {
    this.serverService.restoreService();
    this.dataService.restoreService();
  }

  editarFlujo() {
    if (this.uuid && this.uuid.trim() !== '') {
      this.serverService.obtenerFlujo(this.uuid).subscribe(() => {
        this.router.navigate(['formulario']);
      });
    }
  }

  iniciarFlujo() {
    this.serverService.iniciarFlujo().subscribe(() => {
      this.router.navigate(['formulario']);
    });
  }

}
