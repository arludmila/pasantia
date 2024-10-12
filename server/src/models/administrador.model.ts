export interface Administrador {
    id: number;                      
    rol: Rol;      
    nombre: string;                 
    correo: string;                
    id_institucion?: number;        
    clave: string;                 
    estado?: number;                 
  }
  export enum Rol {
    Admin = 'Admin',
    SuperUser = 'SuperUser',
}

  
  export type AdministradorSinClave = Omit<Administrador, 'clave'> & {
    institucion_nombre: string;
  };
  