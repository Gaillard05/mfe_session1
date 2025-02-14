import { useState, useEffect } from 'react';

const SEARCH_EVENTS = {
  SEARCH_UPDATED: 'searchbar:search_updated',
};

export const useSearchIntegration = (allContent) => {
  const [searchResults, setSearchResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const handleSearchUpdate = (event) => {
      const { results, searchTerm, category } = event.detail;
      setSearchResults(results);
      setSearchTerm(searchTerm);
      setSelectedCategory(category);
    };

    window.addEventListener(SEARCH_EVENTS.SEARCH_UPDATED, handleSearchUpdate);
    return () => {
      window.removeEventListener(SEARCH_EVENTS.SEARCH_UPDATED, handleSearchUpdate);
    };
  }, []);

  const filterContent = (content) => {
    if (!searchTerm) return content;
    
    if (searchResults) {
      // If we have search results from the search MFE, use those
      const resultIds = searchResults.map(item => item.id);
      return content.filter(item => resultIds.includes(item.id));
    }

    // Fallback local search if needed
    return content.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || 
        (item.genres && item.genres.includes(selectedCategory));
      
      return matchesSearch && matchesCategory;
    });
  };

  return {
    searchTerm,
    searchResults,
    selectedCategory,
    filterContent,
    isSearchActive: !!searchTerm
  };
}; 