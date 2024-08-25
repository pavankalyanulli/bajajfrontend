import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const API_URL = 'https://bajaj-1-rqe6.onrender.com/bfhl';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post(API_URL, parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid input or server error');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return selectedOptions.map(option => (
      <div key={option.value} className="mt-4 p-4 border rounded-lg bg-gray-100">
        <h3 className="text-xl font-semibold text-gray-700">{option.label}</h3>
        <p className="mt-2 text-gray-600">{JSON.stringify(response[option.value])}</p>
      </div>
    ));
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: state.isFocused ? 'rgb(59 130 246)' : 'rgb(209 213 219)', 
      boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : null,
      '&:hover': {
        borderColor: state.isFocused ? 'rgb(59 130 246)' : 'rgb(156 163 175)', 
      },
      padding: '0.5rem', 
      borderRadius: '0.375rem', 
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', 
      borderRadius: '0.375rem', 
      marginTop: '0.25rem', 
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'rgba(59, 130, 246, 0.1)' : 'white', 
      color: 'black',
      padding: '0.5rem', 
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Bajaj Finserv Health Challenge</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON data, e.g., {"data": ["A","1","B","2"]}'
          rows={6}
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Submit
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {response && (
        <div className="w-full max-w-lg mt-6">
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
            placeholder="Select fields to display"
            styles={customStyles}
            classNamePrefix="react-select"
          />
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
