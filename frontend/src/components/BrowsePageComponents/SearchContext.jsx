import { createContext, useContext, useState } from 'react';

const initialFilters = {
  location: '',
  dateRange: { start: null, end: null },
  participants: 1,
  priceRange: [0, 10000],
  duration: [1, 30],
  categories: [],
  rating: 0,
  type: []
};

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilters = (updates) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <SearchContext.Provider value={{ filters, updateFilters, resetFilters }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}