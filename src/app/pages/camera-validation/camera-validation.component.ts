import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import videojs from 'video.js';

@Component({
  selector: 'app-camera-validation',
  templateUrl: './camera-validation.component.html',
  styleUrls: ['./camera-validation.component.css']
})
export class CameraValidationComponent implements OnInit {
  
  public video: Blob = null;

  constructor(private dataService: DataService, private router: Router) {

  }
  
  ngOnInit(): void {
    (document.querySelector('.margin-bottom') as HTMLElement).style.paddingBottom = `${document.getElementById('progress-bar').offsetHeight}px`;
  }

  navegarAFirma() {
    this.router.navigate(['firma']);
  }

  fileSelected(file) {
    this.dataService.saveVideoVerification(file);
    document.getElementsByClassName('paso').item(1).classList.add('success');
    (document.getElementById('btn-next') as HTMLButtonElement).disabled = false;
  }

}
