import React from 'react';

const ResponseDisplay = ({ response, filters }) => {
  const filterResponse = (data) => {
    let filteredData = data;

    if (filters.includes('Alphabets')) {
      filteredData = filteredData.filter(char => /^[a-zA-Z]$/.test(char));
    }
    if (filters.includes('Numbers')) {
      filteredData = filteredData.filter(char => /^[0-9]$/.test(char));
    }
    if (filters.includes('Highest Lowercase Alphabet')) {
      const lowercaseLetters = filteredData.filter(char => /^[a-z]$/.test(char));
      if (lowercaseLetters.length > 0) {
        filteredData = [String.fromCharCode(Math.max(...lowercaseLetters.map(char => char.charCodeAt(0))))];
      }
    }
    
    return filteredData;
  };

  return (
    <div>
      <h3>Response:</h3>
      <pre>{JSON.stringify(filterResponse(response), null, 2)}</pre>
    </div>
  );
};

export default ResponseDisplay;
