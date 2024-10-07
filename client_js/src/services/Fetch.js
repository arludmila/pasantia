import { useEffect } from 'react';
import ApiService from './ApiResponse';

const Fetch = ({ endpoint, onSuccess, onError }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ApiService.get(endpoint);
        onSuccess(result); 
      } catch (err) {
        if (onError) {
          onError(err.message); 
        }
      }
    };

    fetchData();
  }, [endpoint, onSuccess, onError]);

  return null; 
};

export default Fetch;
