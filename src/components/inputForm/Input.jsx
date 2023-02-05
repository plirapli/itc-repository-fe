import React from 'react';

const Input = ({
  label,
  onChange,
  inputType = 'text',
  value,
  styleType = 'primary',
  ...props
}) => {
  const textStyle = styleType === 'primary' && 'text-primary';
  const style = styleType === 'primary' ? 'input-primary' : 'input-secondary';

  return (
    <div>
      <label className={`block text-sm font-medium ${textStyle}`}>
        {label}
      </label>
      <input
        onChange={onChange}
        type={inputType}
        value={value}
        className={`mt-1 block w-full rounded-md shadow-sm focus-primary sm:text-sm ${style}`}
        placeholder={props.placeholder}
        required
      />
    </div>
  );
};

export default Input;
