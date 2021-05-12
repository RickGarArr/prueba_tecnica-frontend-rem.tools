import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera-validation',
  templateUrl: './camera-validation.component.html',
  styleUrls: ['./camera-validation.component.css']
})
export class CameraValidationComponent {

  getFileBlob(file: any) {
    console.log(file);
  }
}
