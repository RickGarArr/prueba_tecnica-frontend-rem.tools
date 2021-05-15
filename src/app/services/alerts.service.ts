import { Injectable } from '@angular/core';
import Sweet from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AlertsService {
    public showSuccessAlert(message: string, title?: string) {
        return Sweet.fire({
            title,
            text: message,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
    }

    public showDangerService(message: string, callback: Function, title?: string) {
        Sweet.fire({
            title: 'Estás Seguro?' || title,
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                callback(true);
            } else {
                callback(false);
            }
          });
    }

    public showConfirmAlert(message: string, callback: Function, title?: string) {
        Sweet.fire({
            title: 'Estás Seguro?' || title,
            text: message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                callback(true);
            } else {
                callback(false);
            }
          })
    }

    public showMessageAlert(message: string, title?: string) {
        return Sweet.fire({
            title,
            text: message,
            icon: 'success',
            showConfirmButton: true
        });
    }
}