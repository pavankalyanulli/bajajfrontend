import React, { useState } from 'react';

const TextInput = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    try {
      JSON.parse(input); // Validate JSON format
      setError('');
      onSubmit(input);
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={handleChange}
        placeholder="Enter JSON here"
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TextInput;
