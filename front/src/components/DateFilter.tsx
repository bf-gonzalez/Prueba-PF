import React, { useState } from 'react';

interface DateFilterProps {
  onFilterChange: (order: 'newest' | 'oldest') => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilterChange }) => {
  const [order, setOrder] = useState<'newest' | 'oldest'>('newest');

  const handleToggle = () => {
    const newOrder = order === 'newest' ? 'oldest' : 'newest';
    setOrder(newOrder);
    onFilterChange(newOrder);
  };

  return (
    <button onClick={handleToggle} className="w-48 py-2 px-4 bg-blue-800 text-white rounded border-2 border-gray-400">
      {order === 'newest' ? 'Mostrar más viejos' : 'Mostrar más nuevos'}
    </button>
  );
};

export default DateFilter;