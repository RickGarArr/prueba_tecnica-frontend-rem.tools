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
    private _firmaBlob: Blob = null;
    public hayFirma = false;
    public isFirmaPNG = false;

    constructor() {

    }

    public savePersonalData(personalData: IPersonalData) {
        this._personalData = personalData;
    }

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

    public set firmaBlob(firma: Blob) {
        this._firmaBlob = firma;
    }

    public get firmaBlob(): Blob {
        return this._firmaBlob;
    }

    public blobToFile = (theBlob: Blob, fileName: string): File => {
        const b: any = theBlob;
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        b.lastModifiedDate = new Date();
        b.name = fileName;

        //Cast to a File() type
        return <File>theBlob;
    }

    public restoreService() {
        this._personalData = null;
        this._videoFile = null;
        this._firma = [];
        this._firmaBlob = null;
        this.hayFirma = false;
        this.isFirmaPNG = false;
    }
}