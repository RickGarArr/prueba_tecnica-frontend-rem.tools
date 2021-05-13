import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  private pasos: HTMLCollection;
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    // this.pasos = document.getElementsByClassName('paso');
    // if (this.dataService.personalData) {
    //   if (!this.pasos.item(0).classList.contains('success')) this.pasos.item(0).classList.add('success');
    // } else {
    //   if (this.pasos.item(0).classList.contains('success')) this.pasos.item(0).classList.remove('success');
    // }

    // if (this.dataService.fileVideo) {
    //   if (!this.pasos.item(1).classList.contains('success')) this.pasos.item(0).classList.add('success');
    // } else {
    //   if (this.pasos.item(1).classList.contains('success')) this.pasos.item(0).classList.remove('success');
    // }
    // // this.dataService.getPersonalData().then(data => console.log(data));
    // // this.pasos = document.getElementsByClassName('paso');
    // // try {
    // //   await this.dataService.getPersonalData();
    // //   if (!this.pasos.item(0).classList.contains('success')) this.pasos.item(0).classList.add('success');
    // } catch (e) {}
  }

}
