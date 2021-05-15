import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public uuid: string;

  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
  }

  editarFlujo() {
    this.serverService.obtenerFlujo(this.uuid).subscribe(() => {
      this.router.navigate(['formulario']);
    });
  }
  
  iniciarFlujo() {
    this.serverService.iniciarFlujo().subscribe(() => {
      this.router.navigate(['formulario']);
    });
  }

}
