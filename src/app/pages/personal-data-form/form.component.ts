import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
const { required, minLength, maxLength, pattern } = Validators;
import * as moment from 'moment';
import { IPersonalData } from 'src/app/interfaces/IPersonalData';
import { AlertsService } from 'src/app/services/alerts.service';
import { DataService } from 'src/app/services/data.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class PersonalDataFormComponent {

  constructor (public dataService: DataService, public serverService: ServerService) {

  }

  registrarDatosPersonales() {
    
  }

  cancelar() {
    this.dataService.restoreService();
    this.serverService.restoreService();
  }

}
