import React from 'react';

export default function Select({
  options = [
    { id: 1, description: '1' },
    { id: 2, description: '2' },
  ],

  labelDescription = 'Descrição do label',
  selectValue = 1,
  onSelect = null,
}) {
  function handleChange(event) {
    if (onSelect) {
      onSelect(parseInt(event.currentTarget.value, 10));
    }
  }

  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-500">{labelDescription}</label>

      <select
        className="bg-gray-100 p-2"
        value={selectValue}
        onChange={handleChange}
      >
        {options.map(({ id, description }) => {
          return (
            <option key={id} value={id}>
              {description}
            </option>
          );
        })}
      </select>
    </div>
  );
}
