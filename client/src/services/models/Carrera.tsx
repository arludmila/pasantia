export enum Modalidad {
  Presencial = 'Presencial',
  Virtual = 'Virtual',
  Semipresencial = 'Semipresencial',
}

export enum Prioridad {
  Alta = 1,
  Media = 2,
  Baja = 3,
}


export interface Carrera {
  id: number;                       
  nombre: string;                  
  tipo: string;                
  descripcion?: string;           
  plan_de_estudio?: string;      
  modalidad: Modalidad; 
  cupo?: number;                  
  duracion_anios: number;          
  duracion_meses: number;          
  fecha_inscripcion: string;        
  observacion?: string;           
  institucion_id: number;        
  estado: number;                  
  prioridad: Prioridad;              
  institucion_nombre?: string;    
  institucion_direccion?: string; 
  institucion_tel?: string;      
  institucion_pagina?: string;   
  institucion_logo?: string;
}

export type CarreraCreate = Omit<Carrera, 'id' | 'estado'>;

export interface CarreraUpdate {
  nombre?: string;                  
  tipo?: string;                
  descripcion?: string;           
  plan_de_estudio?: string;      
  modalidad?: Modalidad; 
  cupo?: number;                  
  duracion_anios?: number;          
  duracion_meses?: number;          
  fecha_inscripcion?: Date;        
  observacion?: string;           
  prioridad?: Prioridad;              
}