const API_BASE_URL = 'http://localhost:3050/api/';

export default class ApiService {
    static async get(endpoint) {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);        
        if (!response.ok) {
          throw new Error('Error en la petición');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error:', error);
        throw error; 
      }
    }
  
    static async post(url, body) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        if (!response.ok) {
          throw new Error('Error en la petición');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }
    
  }
  