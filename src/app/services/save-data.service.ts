import { Injectable } from '@angular/core';
import { IPersonalData } from '../interfaces/IPersonalData';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private personalData: IPersonalData;

    public savePersonalData(personalData: IPersonalData): Promise<void> {
        return new Promise<void>(resolve => {
            localStorage.setItem('personal-data', JSON.stringify(personalData));
            this.personalData = personalData;
            resolve();
        });
    }

    public getPersonalData(): Promise<IPersonalData> {
        return new Promise((resolve, reject) => {
            if(localStorage.getItem('personal-data')) {
                resolve(JSON.parse(localStorage.getItem('personal-data')) as IPersonalData);
            } else {
                reject();
            }
        });
    }
}