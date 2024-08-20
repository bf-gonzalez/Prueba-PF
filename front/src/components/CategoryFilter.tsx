import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const categoryOptions = [
  { value: 'accion', label: 'Acción' },
  { value: 'romance', label: 'Romance' },
  { value: 'comedia', label: 'Comedia' },
];

const typeComicOptions = [
  { value: 'comic_americano', label: 'Comic Americano' },
  { value: 'manga', label: 'Manga' },
  { value: 'comic_latinoamericano', label: 'Comic Latinoamericano' },
];

const languageOptions = [
  { value: 'espanol', label: 'Español' },
  { value: 'ingles', label: 'Inglés' },
  { value: 'japones', label: 'Japónes' },
  { value: 'frances', label: 'Fránces' },
  { value: 'italiano', label: 'Italiano' },
];

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

interface CategoryFilterProps {
  onCategoryChange: (categories: string[], typeComic: string | null, language: string | null) => void;
  initialCategories: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategoryChange, initialCategories }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  const [selectedTypeComic, setSelectedTypeComic] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleCategoryChange = (selectedOptions) => {
    const categories = selectedOptions.map(option => option.value);
    setSelectedCategories(categories);
    onCategoryChange(categories, selectedTypeComic, selectedLanguage);
  };

  const handleTypeComicChange = (selectedOption) => {
    const typeComic = selectedOption ? selectedOption.value : null;
    setSelectedTypeComic(typeComic);
    onCategoryChange(selectedCategories, typeComic, selectedLanguage);
  };

  const handleLanguageChange = (selectedOption) => {
    const language = selectedOption ? selectedOption.value : null;
    setSelectedLanguage(language);
    onCategoryChange(selectedCategories, selectedTypeComic, language);
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

export default CategoryFilter;