import React, { useState } from 'react';

const MultiSelectDropdown = ({ onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
    onChange(value);
  };

  return (
    <select multiple onChange={handleChange}>
      <option value="Alphabets">Alphabets</option>
      <option value="Numbers">Numbers</option>
      <option value="Highest Lowercase Alphabet">Highest lowercase alphabet</option>
    </select>
  );
};

export default MultiSelectDropdown;
