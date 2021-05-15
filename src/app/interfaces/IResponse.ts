export interface IResponseIniciarFlujo {
    token: string;
    uuid: string;
}

export interface IResponseObtenerFlujo {
    flujo: IFlujo;
    token: string;
}

export interface IFlujo {
    apellidos: string;
    email: string;
    fecha_nacimiento: string;
    firma: string;
    lugar_nacimiento: string;
    nombre: string;
    telefono: string;
    uuid: string;
    video: string;
}