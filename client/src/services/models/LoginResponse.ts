interface AdminData {
    id: number;
    rol: 'Admin' | 'SuperUser'; 
    nombre: string;
    correo: string;
    id_institucion: number | null; 
}

interface LoginResponse {
    administrador: AdminData; 
    token: string; 
}

export default LoginResponse;