import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
const { required, minLength, maxLength, pattern} = Validators;
import * as moment from 'moment';
import { IPersonalData } from 'src/app/interfaces/IPersonalData';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class PersonalDataFormComponent implements OnInit {

  personalDataForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private dataService: DataService) {
    this.personalDataForm = this.fb.group({
      nombre: new FormControl('', [required, minLength(2)]),
      apellidos: new FormControl('', [required, minLength(2)]),
      fecha_nacimiento: new FormControl('', [required]),
      lugar_nacimiento: new FormControl('', [required, minLength(5)]),
      email: new FormControl('', [required, pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
      telefono: new FormControl('', [required, minLength(10)],)
    });
  }

  ngOnInit(): void {
    document.getElementById('fecha-nacimiento').setAttribute("max", `${moment().format('yyyy-MM-DD')}`);
    if (this.dataService.personalData) {
      this.personalDataForm.setValue(this.dataService.personalData);
    }
  }

  registrarDatosPersonales() {
    this.dataService.savePersonalData(this.personalDataForm.value);
    this.router.navigate(['/camara']);
  }

}
