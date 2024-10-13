interface Carrera {
  id: number;                       
  nombre: string;                  
  tipo: string;                
  descripcion?: string;           
  plan_de_estudio?: string;      
  modalidad: 'Presencial' | 'Virtual' | 'Semipresencial'; 
  cupo?: string;                  
  duracion_anios: number;          
  duracion_meses: number;          
  fecha_inscripcion: string;        
  observacion?: string;           
  institucion_id: number;        
  estado: number;                  
  prioridad?: number;              
  institucion_nombre?: string;    
  institucion_direccion?: string; 
  institucion_tel?: string;      
  institucion_pagina?: string;   
}


  export default Carrera;
  