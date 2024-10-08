import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3000/api/';

interface ApiResponse<T> {
  postData?: T | null;
  responseData?: T | null;
  error: Error | null;
  loading: boolean;
  response?: Response | null;
}

function useFetch<T>(endpoint: string): ApiResponse<T> & { response: Response | null } {
  const [responseData, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<Response | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(API_BASE_URL + endpoint);
        const responseData = await res.json();
        setData(responseData);
        setResponse(res);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [endpoint]);

  return { responseData, error, loading, response };
}

function usePost<T, V>(endpoint: string): [
  (data: T) => Promise<void>,
  ApiResponse<V> & { response: Response | null }
] {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Response | null>(null);
  const [responseData, setResData] = useState<V | null>(null);

  async function postData(postData: T) {
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

      if (!res.ok) {
        throw new Error('Failed to post data');
      }

      const resData: V = await res.json();
      setResponse(res);
      setResData(resData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return [postData, { error, loading, response, responseData }];
}


export { useFetch, usePost };
