interface Carrera {
    id: number;
    nombre: string;
    tipo: string;
    descripcion: string;
    plan_de_estudio: string;
    modalidad: string;
    cupo: string;
    duracion_anios: number;
    duracion_meses: number;
    fecha_inscripcion: string;  
    observacion: string;
    institucion_id: number;
    estado: number;
    prioridad: number;
  }

  export default Carrera;
  