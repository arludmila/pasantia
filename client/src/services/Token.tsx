import { jwtDecode, JwtPayload } from 'jwt-decode';

export interface TokenPayload{
    administrador_id: string;
    rol: 'Admin' | 'SuperUser'; 
    iss?: string;
    sub?: string;
    aud?: string[] | string;
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
}

export const getDecodedToken = (): TokenPayload | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const decoded = jwtDecode<JwtPayload>(token) as TokenPayload;
    
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return null;
    }

    
    if (!decoded.rol) {
      console.error('No hay un rol definido en el token');
      return null;
    }
    
    return decoded;
    
  } catch (error) {
    console.error('Token invalido:', error);
    return null;
  }
};
