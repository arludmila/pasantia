export interface Administrador {
  id: number;                      
  rol: Roles;      
  nombre: string;                 
  correo: string;                
  id_institucion?: number;        
  clave: string;                 
  estado: number; 
}

export enum Roles {
  Admin = 'Admin',
  SuperUser = 'SuperUser',
}

export type AdministradorSinClave = Omit<Administrador, 'clave'> & {
  institucion_nombre: string;
};

export type AdministradorCreate = Omit<Administrador, 'id' | 'estado'>;

export interface AdministradorUpdate {
  rol?: Roles;                
  nombre?: string;        
  correo?: string;          
  clave?: string;          
  id_institucion?: number;  
}