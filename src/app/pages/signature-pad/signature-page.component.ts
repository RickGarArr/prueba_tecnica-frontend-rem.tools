import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-signature-page',
  templateUrl: './signature-page.component.html',
  styleUrls: ['./signature-page.component.css']
})
export class SignaturePageComponent implements OnInit {

  constructor( public dataService: DataService) { }

  ngOnInit(): void {
  }

}
