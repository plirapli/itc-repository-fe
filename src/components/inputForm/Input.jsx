import React from 'react';

const Input = ({
  label,
  handler,
  inputType,
  name,
  value,
  styleType = 'primary',
  ...props
}) => {
  const textLabel = styleType === 'primary' && 'text-primary';
  const input = styleType === 'primary' ? 'input-primary' : 'input-secondary';

  return (
    <div>
      <label htmlFor='' className={`block text-sm font-medium ${textLabel}`}>
        {label || 'Label'}
      </label>
      <input
        onChange={(e) => handler(e, name)}
        type={inputType || 'text'}
        name={name}
        value={value}
        className={`mt-1 block w-full rounded-md shadow-sm focus-primary sm:text-sm ${input}`}
        placeholder={props.placeholder || 'Placeholder'}
      />
    </div>
  );
};

export default Input;
