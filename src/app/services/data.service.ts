import { Injectable } from '@angular/core';
import { PointGroup } from 'signature_pad';
import { IPersonalData } from '../interfaces/IPersonalData';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private _personalData: IPersonalData = null;
    private _videoFile: Blob = null;
    private _firma: PointGroup[] = [];
    public hayFirma = false;

    constructor() {
        // this.getPersonalData();
    }

    public savePersonalData(personalData: IPersonalData) {
        this._personalData = personalData;
        // return new Promise<void>((resolve, reject) => {
        //     try {
        //         localStorage.setItem('personal-data', JSON.stringify(personalData));
        //         resolve();
        //     } catch (error) {
        //         reject(error);
        //     }
        // });
    }

    // private get personalData() {
    //     try {
    //         this._personalData = JSON.parse(localStorage.getItem('personal-data'));
    //     } catch (error) {
    //         this._personalData = null;
    //         console.log(error);
    //     }
    // }

    public get personalData() {
        return this._personalData;
    }

    public saveVideoVerification(video: Blob) {
        this._videoFile = video;
    }

    public get fileVideo() {
        return this._videoFile;
    }

    public saveFirma(firma: PointGroup[], filename) {
        this._firma = firma;
        this.hayFirma = true;
    }

    public get firma() {
        return this._firma;
    }

    private blobToFile = (theBlob: Blob, fileName:string): File => {
        const b: any = theBlob;
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        b.lastModifiedDate = new Date();
        b.name = fileName;
    
        //Cast to a File() type
        return <File>b;
    }
}