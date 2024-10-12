const API_BASE_URL = 'http://localhost:3000/api/';
class ApiResponse<T> {
  data: T | null = null;
  error: string | null = null;
  loading: boolean = true;

  async fetchData(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body: any = null,
    headers: HeadersInit = { 'Content-Type': 'application/json' }
  ): Promise<void> {
    this.loading = true;
    try {

      const token = localStorage.getItem('token');
      console.log("Token auth, existe?:"+token);

      if (token) {
        headers = {
          ...headers, 
          Authorization: `Bearer ${token}`,
        };
      }
  
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data: T = await response.json();
      this.setData(data);
    } catch (error: any) {
      this.setError(error.message);
    }
  }
  

  setData(data: T) {
    this.data = data;
    this.loading = false;
  }

  setError(error: string) {
    this.error = error;
    this.loading = false;
  }

  
}

export default ApiResponse;
