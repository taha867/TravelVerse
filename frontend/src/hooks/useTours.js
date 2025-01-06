import { useState, useEffect } from 'react';
import { getTours } from './tours';

export function useTours(filters) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getTours({
          search: filters.location,
          minPrice: filters.priceRange[0],
          maxPrice: filters.priceRange[1],
          minDuration: filters.duration[0],
          maxDuration: filters.duration[1],
          categories: filters.categories,
          rating: filters.rating,
          type: filters.type,
          page: 1,
          limit: 9,
        });
        setTours(response.tours);
        setTotalPages(response.pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tours');
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [filters]);

  return { tours, loading, error, totalPages };
}
