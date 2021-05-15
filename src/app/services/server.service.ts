import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseIniciarFlujo, IResponseObtenerFlujo } from '../interfaces/IResponse';
import { tap } from 'rxjs/operators';
import signaturePad from 'signature_pad';
import { DataService } from './data.service';
import { IPersonalData } from '../interfaces/IPersonalData';
import { environment } from 'src/environments/environment';
import { AlertsService } from './alerts.service';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class ServerService {
    public _token: string;
    public _uuid: string;
    public isUpdate = false;
    constructor(private http: HttpClient, private dataService: DataService, private alertService: AlertsService) {
    }

    public iniciarFlujo() {
        return this.http.get(`${base_url}/flujos/crear`).pipe(
            tap(({ token, uuid }: IResponseIniciarFlujo) => {
                this._token = token;
                this._uuid = uuid;
            }, ({ error }: HttpErrorResponse) => {
                this.alertService.showErrorAlert('Ha ocurrido un error al iniciar flujo');
            })
        );
    }

    public obtenerFlujo(uuid: string) {
        this.alertService.showLoadingAlert('Cargando informacion del flujo');
        return this.http.get(`${base_url}/flujos/${uuid}`).pipe(
            tap(({ token, flujo }: IResponseObtenerFlujo) => {
                const { firma, video, uuid, ...personalData } = flujo;
                this._token = token;
                this._uuid = uuid;
                this.dataService.savePersonalData(personalData);
                const asyncFunction = async () => {
                    await this.getVideoFile(video);
                    await this.getFirmaFile(firma);
                    this.alertService.closeAlert();
                }
                asyncFunction();
                this.isUpdate = true;
            }, ({ error }: HttpErrorResponse) => {
                this.alertService.closeAlert();
                this.alertService.showErrorAlert(error.errores[0]);
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
        if (this.isUpdate) {
            console.log('update');
            return this.http.put(`${base_url}/flujos/editar/${this._uuid}`, formData, {
                headers: {
                    'x-token': this._token
                }
            });
        } else {
            console.log('finalizar');
            return this.http.post(`${base_url}/flujos/finalizar/${this._uuid}`, formData, {
                headers: {
                    'x-token': this._token
                }
            });
        }
    }

    public getVideoFile(filename: string) {
        return new Promise<void>((resolve) => {
            this.http.get(`${base_url}/flujos/${this._uuid}/${filename}`, {
                responseType: 'blob',
                headers: {
                    'x-token': this._token
                }
            }).subscribe((response: Blob) => {
                this.dataService.saveVideoVerification(this.dataService.blobToFile(response, 'video.mkv'));
                resolve();
            }, error => {
                resolve();
            });
        });
    }

    public getFirmaFile(filename: string) {
        return new Promise<void>((resolve) => {
            this.http.get(`${base_url}/flujos/${this._uuid}/${filename}`, {
                responseType: 'blob',
                headers: {
                    'x-token': this._token
                }
            }).subscribe((response: Blob) => {
                this.dataService.isFirmaPNG = true;
                this.dataService.hayFirma = true;
                this.dataService.firmaBlob = this.dataService.blobToFile(response, 'firma.png');
                resolve();
            }, error => {
                resolve();
            });
        });
    }

    public deleteFlujo() {
        return this.http.delete(`${base_url}/flujos/eliminar/${this._uuid}`, {
            headers: {
                'x-token': this._token
            }
        });
    }

    public restoreService() {
        this.isUpdate = false;
    }
}