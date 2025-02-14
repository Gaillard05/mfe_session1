import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { config } from './config';

const SearchContext = createContext();

// Custom event names for MFE communication
const SEARCH_EVENTS = {
  SEARCH_UPDATED: 'searchbar:search_updated',
  CATEGORY_SELECTED: 'category:category_selected'
};

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Listen for category selection events from category MFE
  useEffect(() => {
    const handleCategorySelect = (event) => {
      const { category } = event.detail;
      setSelectedCategory(category);
      // If there's an active search, refresh results with new category
      if (searchTerm) {
        handleSearch(searchTerm, category);
      }
    };

    window.addEventListener(SEARCH_EVENTS.CATEGORY_SELECTED, handleCategorySelect);
    return () => {
      window.removeEventListener(SEARCH_EVENTS.CATEGORY_SELECTED, handleCategorySelect);
    };
  }, [searchTerm]);

  // Emit search results to other MFEs
  const emitSearchResults = useCallback((results, term, category) => {
    const searchEvent = new CustomEvent(SEARCH_EVENTS.SEARCH_UPDATED, {
      detail: {
        results,
        searchTerm: term,
        category,
      },
    });
    window.dispatchEvent(searchEvent);
  }, []);

  const handleSearch = useCallback(async (term, category = selectedCategory) => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        q: term,
        ...(category && { category }),
      });

      const response = await fetch(`${config.apiUrl}${config.searchEndpoint}?${queryParams}`);
      const data = await response.json();
      setSearchResults(data);
      emitSearchResults(data, term, category);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      emitSearchResults([], term, category);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, emitSearchResults]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setSearchResults([]);
    emitSearchResults([], '', selectedCategory);
  }, [selectedCategory, emitSearchResults]);

  return (
    <SearchContext.Provider 
      value={{ 
        searchTerm, 
        setSearchTerm, 
        searchResults, 
        isLoading, 
        handleSearch, 
        clearSearch,
        selectedCategory 
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}; 