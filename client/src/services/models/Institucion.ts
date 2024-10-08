interface Institucion {
    id: number;
    cue: number;
    cueanexo?: number;
    nombre: string;
    direccion: string;
    ubicacion_lat?: number;
    ubicacion_long?: number;
    tel?: string;
    pagina?: string;
    gestion: 'Publica' | 'Privada';
    estado: number;
}

export default Institucion;
