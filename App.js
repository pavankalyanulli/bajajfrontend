import React, { useState } from 'react';
import TextInput from './components/TextInput';
import MultiSelectDropdown from './components/MultiSelectDropdown';
import ResponseDisplay from './components/ResponseDisplay';

const App = () => {
  const [response, setResponse] = useState([]);
  const [filters, setFilters] = useState([]);

  const handleSubmit = async (input) => {
    const jsonData = JSON.parse(input);
    
    try {
      const res = await fetch('https://bajaj-1-rqe6.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Roll Number: [21BCE9090]</h1>
      <TextInput onSubmit={handleSubmit} />
      <MultiSelectDropdown onChange={setFilters} />
      <ResponseDisplay response={response} filters={filters} />
    </div>
  );
};

export default App;
