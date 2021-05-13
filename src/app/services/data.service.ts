import { Injectable } from '@angular/core';
import { IPersonalData } from '../interfaces/IPersonalData';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private _personalData: IPersonalData = null;
    private _videoFile: Blob = null;

    constructor() {
        this.getPersonalData();
    }

    public savePersonalData(personalData: IPersonalData): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                localStorage.setItem('personal-data', JSON.stringify(personalData));
                this._personalData = personalData;
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    private getPersonalData() {
        try {
            this._personalData = JSON.parse(localStorage.getItem('personal-data'));
        } catch (error) {
            this._personalData = null;
            console.log(error);
        }
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
}