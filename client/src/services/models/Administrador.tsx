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

export type AdministradorCrear = Omit<Administrador, 'id' | 'estado'>;