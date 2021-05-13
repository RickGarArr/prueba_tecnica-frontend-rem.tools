import { Component, OnInit, OnDestroy, ElementRef, EventEmitter, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import videojs from 'video.js';
// import * as RecordRTC from 'recordrtc';
import * as Record from 'videojs-record/dist/videojs.record.js';

@Component({
  selector: 'app-videojs-record',
  templateUrl: './videojs-record.component.html',
  styleUrls: ['./videojs-record.component.css']
})
export class VideojsRecordComponent implements OnInit, OnDestroy {

  @Output() onFileSelected: EventEmitter<any> = new EventEmitter();
  public file: any = null;
  public videoElement: HTMLVideoElement;

  private config = {
    controls: true,
    autoplay: false,
    fluid: false,
    loop: false,
    width: 640,
    height: 360,
    bigPlayButton: false,
    controlBar: {
      volumePanel: false
    },
    plugins: {
      // configure videojs-record plugin
      record: {
        audio: false,
        video: true,
        debug: false
      }
    }
  };

  private player: any;
  private plugin: any;

  constructor(public dataService: DataService) {
    this.plugin = Record;
  }

  ngOnInit() {
    this.videoElement = document.getElementById('saved-video') as HTMLVideoElement;

    if (this.dataService.fileVideo) {
      this.playVideo();
    } else {
      this.videoElement.style.display = 'none';
      this.recordVideo();
    }
  }

  playVideo(video?) {
    this.videoElement.style.display = 'block';
    const vsrc = window.URL.createObjectURL(video || this.dataService.fileVideo);
    this.videoElement.src = vsrc;
    this.videoElement.autoplay = false;
    this.videoElement.controls = true;
  }

  recordVideo() {
    const videoRecord = document.createElement('video');
    videoRecord.classList.add('video-js', 'vjs-default-skin');
    document.getElementById('contenedor-video').appendChild(videoRecord);
    this.player = videojs(videoRecord, this.config);
    this.player.on('startRecord', () => {
      // console.log('started recording!');
    });
    this.player.on('finishRecord', () => {
      this.file = this.player.recordedData;
      // console.log('finished recording: ', this.file);
    });

    // error handling
    this.player.on('error', (element, error) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });
  }

  seleccionrVideo() {
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
    this.playVideo(this.file);
    this.dataService.saveVideoVerification(this.file);
    alert('video actualizado');
  }

  grabarDeNuevo() {
    this.videoElement.style.display = 'none';
    this.recordVideo();
    this.file = null;
    this.dataService.saveVideoVerification(this.file);
  }

  // use ngOnDestroy to detach event handlers and remove the player
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
  }


}