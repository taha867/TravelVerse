import axios from 'axios';

export const getTours = async (filters) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        params.append(key, value.join(','));
      } else {
        params.append(key, value.toString());
      }
    }
  });

  const response = await axios.get(`/api/tours?${params.toString()}`);
  return response.data;
  
};
