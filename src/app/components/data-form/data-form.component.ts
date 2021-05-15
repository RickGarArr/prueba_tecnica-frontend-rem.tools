import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { DataService } from 'src/app/services/data.service';
import { ServerService } from 'src/app/services/server.service';
import * as moment from 'moment';
import { IPersonalData } from 'src/app/interfaces/IPersonalData';

const { required, minLength, maxLength, pattern } = Validators;

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  @Output() onFormComplete: EventEmitter<IPersonalData> = new EventEmitter();
  personalDataForm: FormGroup;
  public hayData: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dataService: DataService,
    private alertService: AlertsService) {
    this.personalDataForm = this.fb.group({
      nombre: new FormControl('', [required, minLength(2)]),
      apellidos: new FormControl('', [required, minLength(2)]),
      fecha_nacimiento: new FormControl('', [required]),
      lugar_nacimiento: new FormControl('', [required, minLength(5)]),
      email: new FormControl('', [required, pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
      telefono: new FormControl('', [required, minLength(10), maxLength(14), pattern("^[0-9]*$")])
    });
  }

  ngOnInit(): void {
    document.getElementById('fecha-nacimiento').setAttribute("max", `${moment().format('yyyy-MM-DD')}`);
    if (this.dataService.personalData) {
      this.personalDataForm.setValue(this.dataService.personalData);
    }
  }

  async registrarDatosPersonales() {
    this.dataService.savePersonalData(this.personalDataForm.value);
    await this.alertService.showSuccessAlert('Datos Guardados Correctamente');
  }

  async eliminarDatosPersonales() {
    this.alertService.showDangerService('Eliminar datos?', (result) => {
      if (result) {
        this.personalDataForm.setValue({
          nombre: '',
          apellidos: '',
          fecha_nacimiento: '',
          lugar_nacimiento: '',
          email: '',
          telefono: '',
        });
        Object.entries(this.personalDataForm.controls).forEach( ([valor, control]) => {
          control.markAsUntouched();
          control.markAsPristine();
        });
        this.dataService.savePersonalData(null);
      }
    });
  }

}
