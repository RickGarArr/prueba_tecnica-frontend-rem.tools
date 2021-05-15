import { Injectable } from '@angular/core';
import Sweet from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AlertsService {
    public async showSuccessAlert(message: string, title?: string) {
        return await Sweet.fire({
            title,
            text: message,
            icon: 'success',
            showConfirmButton: false,
            allowOutsideClick: false,
            backdrop: false,
            timer: 850
        });
    }

    public async showDangerAlert(message: string, title?: string) {
        return await Sweet.fire({
            title: 'Estás Seguro?' || title,
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        });
    }

    public async showConfirmAlert(message: string, title?: string) {
        return await Sweet.fire({
            title: 'Estás Seguro?' || title,
            text: message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        });
    }

    public async showMessageAlert(message: string, title?: string) {
        return await Sweet.fire({
            title,
            text: message,
            icon: 'success',
            showConfirmButton: true
        });
    }

    public async showLoadingAlert(message: string, title?: string) {
        return await Sweet.fire({
            title: 'Cargando' || title,
            // allowEnterKey: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            text: message,
            timerProgressBar: true,
            showConfirmButton: true,
            didOpen: () => Sweet.showLoading()
        });
    }

    public async showErrorAlert(message: string, title?: string) {
        return Sweet.fire({
            icon: 'error',
            title: title || 'Error',
            text: message,
            showConfirmButton: true
        });
    }

    public closeAlert() {
        if (Sweet.isVisible()) Sweet.close();
    }
}