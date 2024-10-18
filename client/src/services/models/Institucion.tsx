export enum Gestion {
  Publica = 'Publica',
  Privada = 'Privada',
  Mixta = 'Mixta'
}

export interface Institucion {
  id: number;                
  cue: number;               
  cueanexo?: number | null;  
  nombre: string;           
  direccion: string;         
  ubicacion_lat?: number | null;  
  ubicacion_long?: number | null; 
  tel?: string | null;       
  pagina?: string | null;     
  gestion: Gestion; 
  estado: number;           
  logo?: string | null; 
}

export type InstitucionCrear = Omit<Institucion, 'id' | 'estado'>;

export interface InstitucionUpdate {
  cue?: number;               
  cueanexo?: number | null;  
  nombre?: string;           
  direccion?: string;         
  ubicacion_lat?: number | null;  
  ubicacion_long?: number | null; 
  tel?: string | null;       
  pagina?: string | null;     
  gestion?: Gestion; 
  logo?: string | null; 
}