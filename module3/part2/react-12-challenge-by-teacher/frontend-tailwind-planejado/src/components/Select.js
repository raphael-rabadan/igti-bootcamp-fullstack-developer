import React from 'react';
import { getNewId } from '../services/idService';

export default function Select({
  options,
  labelDescription = 'Descrição do label',
  selectValue,
  onSelect = null,
}) {
  function handleSelectChange({ currentTarget }) {
    const newValue = parseInt(currentTarget.value, 10);

    if (onSelect) {
      onSelect(newValue);
    }
  }

  const id = getNewId();

  return (
    <div className="flex flex-col items-start space-y-1">
      <label htmlFor={id}>{labelDescription}</label>
      <select
        id={id}
        className="border w-full"
        value={selectValue}
        onChange={handleSelectChange}
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
