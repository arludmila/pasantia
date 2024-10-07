import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3000/api/';

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

function useFetch<T>(endpoint: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_BASE_URL + endpoint);
        const responseData = await response.json();
        setData(responseData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, [endpoint]);
  
  

  return { data, error, loading };
}

export default useFetch;
