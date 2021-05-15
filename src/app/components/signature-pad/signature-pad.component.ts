import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import SignaturePad from 'signature_pad';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.css']
})
export class SignaturePadComponent implements OnInit {

  private signaturePad: SignaturePad;
  private imageContainer: HTMLImageElement;
  public image: any;

  // private wrapper;
  private canvas: HTMLCanvasElement;

  constructor(public dataService: DataService, private sanitizer: DomSanitizer) {
    window.onresize = this.resizeCanvas;
  }

  ngOnInit(): void {
    // this.wrapper = document.getElementById("signature-pad");
    this.canvas = document.getElementById('signature-pad-canvas') as HTMLCanvasElement;
    this.imageContainer = document.getElementById('firma-image') as HTMLImageElement;
    this.canvas.width = 640;
    this.canvas.height = 360;
    this.signaturePad = new SignaturePad(this.canvas, {
      // It's Necessary to use an opaque color when saving image as JPEG;
      // this option can be omitted if only saving as PNG or SVG
      backgroundColor: 'rgb(255, 255, 255)',
    });
    if (this.dataService.firma && !this.dataService.isFirmaPNG) {
      this.signaturePad.fromData(this.dataService.firma);
    } else if (this.dataService.firma && this.dataService.isFirmaPNG) {
      this.canvas.style.display = 'none';
      this.imageContainer.style.display = 'block';
      let objectURL = URL.createObjectURL(this.dataService.firmaBlob);       
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
  }

  resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    this.canvas.width = this.canvas.offsetWidth * ratio;
    this.canvas.height = this.canvas.offsetHeight * ratio;
    this.canvas.getContext("2d").scale(ratio, ratio);

    // This library does not listen for canvas changes, so after the canvas is automatically
    // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
    // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
    // that the state of this library is consistent with visual state of the canvas, you
    // have to clear it manually.
    this.signaturePad.clear();
  }

  // On mobile devices it might make more sense to listen to orientation change,
  // rather than window resize events.


  download(dataURL, filename) {
    var blob = this.dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;

    document.getElementById('signature-pad').appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  saveData(filename) {
    this.dataService.saveFirma(this.signaturePad.toData(), filename);
    this.dataService.firmaBlob = this.dataURLToBlob(this.signaturePad.toDataURL());
    alert('Firma Actualizada');
  }

  // One could simply use Canvas#toBlob method instead, but it's just to show
  // that it can be done using result of SignaturePad#toDataURL.
  dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    var parts = dataURL.split(';base64,');
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  clearDataFuncion() {
    this.signaturePad.clear();
  }

  undoDataFunction() {
    var data = this.signaturePad.toData();

    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }

  eliminarFirma() {
    this.dataService.firmaBlob = null;
    this.dataService.hayFirma = false;
    this.dataService.isFirmaPNG = false;
    this.canvas.style.display = 'block';
    this.imageContainer.style.display = 'none';
  }

  changeColorFunction() {
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    var color = "rgb(" + r + "," + g + "," + b + ")";
    this.signaturePad.penColor = color;
  }

  savePNGFunction() {
    if (this.signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      var dataURL = this.signaturePad.toDataURL();
      this.saveData('firma.png');
      // this.download(dataURL, "signature.png");
    }
  }

  saveJPGFunction() {
    if (this.signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      var dataURL = this.signaturePad.toDataURL("image/jpeg");
      this.download(dataURL, "signature.jpg");
    }
  }

  saveSVGFunction() {
    if (this.signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      var dataURL = this.signaturePad.toDataURL('image/svg+xml');
      this.download(dataURL, "signature.svg");
    }
  }


}
