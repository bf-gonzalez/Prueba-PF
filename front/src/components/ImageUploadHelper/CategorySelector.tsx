import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export interface CategoryOption {
  readonly value: string;
  readonly label: string;
}

export const categoryOptions: readonly CategoryOption[] = [
  { value: 'accion', label: 'Acción' },
  { value: 'romance', label: 'Romance' },
  { value: 'comedia', label: 'Comedia' },
];

const typeComicOptions: readonly CategoryOption[] = [
  { value: 'comic_americano', label: 'Comic Americano' },
  { value: 'manga', label: 'Manga' },
  { value: 'comic_latinoamericano', label: 'Comic Latinoamericano' },
];

const languageOptions: readonly CategoryOption[] = [
  { value: 'espanol', label: 'Español' },
  { value: 'ingles', label: 'Inglés' },
  { value: 'japones', label: 'Japónes' },
  { value: 'frances', label: 'Fránces' },
  { value: 'italiano', label: 'Italiano' },
];

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

const CategorySelector = ({ onChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypeComic, setSelectedTypeComic] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
    onChange({
      categories: selectedOptions,
      typeComic: selectedTypeComic,
      language: selectedLanguage,
    });
  };

  const handleTypeComicChange = (selectedOption) => {
    setSelectedTypeComic(selectedOption);
    onChange({
      categories: selectedCategories,
      typeComic: selectedOption,
      language: selectedLanguage,
    });
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    onChange({
      categories: selectedCategories,
      typeComic: selectedTypeComic,
      language: selectedOption,
    });
  };

  return (
    <div>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={categoryOptions}
        styles={customStyles}
        placeholder="Selecciona categorías"
        onChange={handleCategoryChange}
      />
      <Select
        options={typeComicOptions}
        styles={customStyles}
        placeholder="Selecciona tipo de comic"
        onChange={handleTypeComicChange}
        isClearable
      />
      <Select
        options={languageOptions}
        styles={customStyles}
        placeholder="Selecciona lenguaje"
        onChange={handleLanguageChange}
        isClearable
      />
    </div>
  );
};

export default CategorySelector;