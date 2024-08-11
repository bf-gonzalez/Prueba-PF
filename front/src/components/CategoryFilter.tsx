import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { categoryOptions, typeComicOptions, languageOptions } from './ImageUploadHelper/CategorySelector';

const animatedComponents = makeAnimated();

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#01061A',
    color: 'white',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#01061A',
    color: 'white',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#01061A',
    color: 'white',
    border: '1px solid white',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'white',
  }),
  input: (provided) => ({
    ...provided,
    color: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'white' : '#01061A',
    color: state.isFocused ? 'black' : 'white',
  }),
};

const CategoryFilter = ({ onCategoryChange, initialCategories, onTypeComicChange, initialTypeComic, onLanguageChange, initialLanguage }) => {
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);
  const [selectedTypeComic, setSelectedTypeComic] = useState(initialTypeComic);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem('selectedCategories'));
    const savedTypeComic = JSON.parse(localStorage.getItem('selectedTypeComic'));
    const savedLanguage = JSON.parse(localStorage.getItem('selectedLanguage'));

    if (savedCategories) {
      setSelectedCategories(savedCategories);
      onCategoryChange(savedCategories.map(option => option.value));
    }
    if (savedTypeComic) {
      setSelectedTypeComic(savedTypeComic);
      onTypeComicChange(savedTypeComic.value);
    }
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      onLanguageChange(savedLanguage.value);
    }
  }, []);

  const handleCategoryChange = (selectedOptions) => {
    const categories = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedCategories(selectedOptions);
    onCategoryChange(categories);
    localStorage.setItem('selectedCategories', JSON.stringify(selectedOptions));
  };

  const handleTypeComicChange = (selectedOption) => {
    setSelectedTypeComic(selectedOption);
    onTypeComicChange(selectedOption ? selectedOption.value : null);
    localStorage.setItem('selectedTypeComic', JSON.stringify(selectedOption));
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    onLanguageChange(selectedOption ? selectedOption.value : null);
    localStorage.setItem('selectedLanguage', JSON.stringify(selectedOption));
  };

  return (
    <div>
      <Select
        isMulti
        value={selectedCategories}
        onChange={handleCategoryChange}
        options={categoryOptions}
        styles={customStyles}
        components={animatedComponents}
        placeholder="Selecciona categorías"
      />
      <Select
        value={selectedTypeComic}
        onChange={handleTypeComicChange}
        options={typeComicOptions}
        styles={customStyles}
        components={animatedComponents}
        placeholder="Selecciona tipo de comic"
        isClearable
      />
      <Select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        options={languageOptions}
        styles={customStyles}
        components={animatedComponents}
        placeholder="Selecciona lenguaje"
        isClearable
      />
    </div>
  );
};

export default CategoryFilter;