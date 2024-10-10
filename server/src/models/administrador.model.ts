export interface Administrador {
    id: number;                      
    rol: 'Admin' | 'SuperUser';      
    nombre: string;                 
    correo: string;                
    id_institucion?: number;        
    clave: string;                 
    estado?: number;                 
  }
  