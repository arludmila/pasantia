import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3000/api/';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  response?: Response | null;
}

function useFetch<T>(endpoint: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<Response | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(API_BASE_URL + endpoint);
        setResponse(res);
        if (!res.ok) {
          const errorText = await res.text(); 
          throw new Error(`Error ${res.status}: ${errorText}`);
        }
        const responseData: T = await res.json();
        setData(responseData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [endpoint]);

  return { data, error, loading, response };
}

function usePost<T, V>(endpoint: string): [
  (data: T) => Promise<void>,
  ApiResponse<V>
] {
  const [data, setData] = useState<V | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Response | null>(null);

  const postData = async (postData: T) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_BASE_URL + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      setResponse(res);
      if (!res.ok) {
        const errorText = await res.text(); 
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const responseData: V = await res.json();
      setData(responseData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return [postData, { data, error, loading, response }];
}

export { useFetch, usePost };
