import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/save-data.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  private pasos: HTMLCollection;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.pasos = document.getElementsByClassName('paso');
    this.dataService.getPersonalData().then(() => {
      if (!this.pasos.item(0).classList.contains('success')) this.pasos.item(0).classList.add('success');
    });
  }

}
