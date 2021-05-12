import { Component, OnDestroy, OnInit, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

import videojs, { VideoJsPlayer } from 'video.js';
import * as adapter from 'webrtc-adapter/out/adapter_no_global.js';
import * as RecordRTC from 'recordrtc';
import * as Record from 'videojs-record/dist/videojs.record.js';
import TsEBMLEngine from 'videojs-record/dist/plugins/videojs.record.ts-ebml.js';

@Component({
  selector: 'app-web-cam-div',
  templateUrl: './web-cam-div.component.html',
  styleUrls: ['./web-cam-div.component.css']
})
export class WebCamDivComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() idVideo: string;
  @Input() fileName: string;

  @Output() onRecordFinish: EventEmitter<any> = new EventEmitter();

  private videoElement: HTMLMediaElement;

  private config: any;
  private player: any;
  private plugin: any;

  constructor() {

    this.player = false;
    // save reference to plugin (so it initializes)
    this.plugin = Record;
    // video.js configuration
    this.config = {
      responsive: true,
      controls: true,
      autoplay: false,
      fluid: false,
      loop: false,
      // width: 320,
      // height: 240,
      bigPlayButton: false,
      controlBar: {
        volumePanel: false
      },
      plugins: {
        // configure videojs-record plugin
        record: {
          audio: true,
          video: true,
          debug: true
        }
      }
    }
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.videoElement = document.getElementById(this.idVideo) as HTMLMediaElement;
    this.player = videojs(this.idVideo, this.config, () => {
      var msg = 'Using video.js ' + videojs.VERSION +
        ' with videojs-record ' + videojs.getPluginVersion('record') +
        ' and recordrtc ' + RecordRTC.version;
      videojs.log(msg);
    });
    // device is ready
    this.player.on('deviceReady', () => {
      console.log('device is ready!');
    });

    // user clicked the record button and started recording
    this.player.on('startRecord', () => {
      console.log('started recording!');
    });

    // user completed recording and stream is available
    this.player.on('finishRecord', () => {
      // recordedData is a blob object containing the recorded data that
      // can be downloaded by the user, stored on server etc.
      this.onRecordFinish.emit(this.blobToFile(this.player.recordedData, this.fileName));
      // this.player.record().saveAs({'video': 'my-video-file-name.mp4'});
      console.log('finished recording: ', this.player.recordedData);
    });

    // error handling
    this.player.on('error', (element, error) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });
  }


  blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName + '.mp4';
    console.log(theBlob);
    return theBlob;
  }

  // use ngOnDestroy to detach event handlers and remove the player
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
      this.player = false;
    }
  }
}
