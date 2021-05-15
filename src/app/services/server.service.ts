import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseIniciarFlujo, IResponseObtenerFlujo } from '../interfaces/IResponse';
import { tap } from 'rxjs/operators';
import signaturePad from 'signature_pad';
import { DataService } from './data.service';
import { IPersonalData } from '../interfaces/IPersonalData';

@Injectable({
    providedIn: 'root'
})
export class ServerService {
    private base_url = 'http://localhost:5000';
    public _token: string;
    public _uuid: string;
    public isUpdate = false;
    constructor(private http: HttpClient, private dataService: DataService) {
    }

    public iniciarFlujo() {
        return this.http.get(`${this.base_url}/flujos/crear`).pipe(
            tap(({ token, uuid }: IResponseIniciarFlujo) => {
                this._token = token;
                this._uuid = uuid;
            }, ({ error }: HttpErrorResponse) => {
                console.log(error);
            })
        );
    }

    public obtenerFlujo(uuid: string) {
        return this.http.get(`${this.base_url}/flujos/${uuid}`).pipe(
            tap(({ token, flujo }: IResponseObtenerFlujo) => {
                const { firma, video, uuid, ...personalData } = flujo;
                this._token = token;
                this._uuid = uuid;
                this.getVideoFile(video);
                this.getFirmaFile(firma);
                this.dataService.savePersonalData(personalData);
                this.isUpdate = true;
            }, ({ error }: HttpErrorResponse) => {
                console.log(error);
            })
        );
    }

    public finalizarFlujo() {
        const formData = new FormData();
        for (let key in this.dataService.personalData) {
            formData.append(key, this.dataService.personalData[key]);
        }
        
        formData.append('firma', this.dataService.firmaBlob, 'firma.png');
        formData.append('video', this.dataService.fileVideo, (this.dataService.fileVideo as File).name);
        if (!this.isUpdate) {
            return this.http.post(`${this.base_url}/flujos/finalizar/${this._uuid}`, formData, {
                headers: {
                    'x-token': this._token
                }
            });
        } else {
            return this.http.put(`${this.base_url}/flujos/editar/${this._uuid}`, formData, {
                headers: {
                    'x-token': this._token
                }
            });
        }
    }

    public getVideoFile(filename: string) {
        this.http.get(`${this.base_url}/flujos/${this._uuid}/${filename}`, {
            responseType: 'blob',
            headers: {
                'x-token': this._token
            }
        }).subscribe((response: Blob) => {
            this.dataService.saveVideoVerification(this.dataService.blobToFile(response, 'video.mkv'));
        }, error => {
            console.log(error);
        });
    }

    public getFirmaFile(filename: string) {
        this.http.get(`${this.base_url}/flujos/${this._uuid}/${filename}`, {
            responseType: 'blob',
            headers: {
                'x-token': this._token
            }
        }).subscribe((response: Blob) => {
            this.dataService.isFirmaPNG = true;
            this.dataService.hayFirma = true;
            this.dataService.firmaBlob = this.dataService.blobToFile(response, 'firma.png');
        }, error => {
            console.log(error);
        });
    }

    public restoreService() {
        this.isUpdate = false;
    }
}