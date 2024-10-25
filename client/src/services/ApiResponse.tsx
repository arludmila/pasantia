const API_BASE_URL = 'http://localhost:3000/api/';
class ApiResponse<T> {
  data: T | null = null;
  error: string | null = null;
  loading: boolean = true;

  async useFetch(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
    body: any = null,
    headers: HeadersInit = { 'Content-Type': 'application/json' }
  ): Promise<void> {
    this.loading = true;
    try {

      const token = localStorage.getItem('token');

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
        const errorData = await response.json();
        console.log('errorData', errorData)
        this.setError(errorData);
        return ;
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

  setError(error: any) {
    this.error = error;
    this.loading = false;
  }

  
}

export default ApiResponse;
