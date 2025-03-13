import axios from 'axios';

export const getTours = async (companyId, token) => {
  try {
    const res = await axios.get(`/api/posts/company/${companyId}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.posts;  // Correctly matches backend response structure
  } catch (error) {
    throw error;
  }
};
