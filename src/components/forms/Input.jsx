import React from 'react';

const Input = ({
  label,
  onChange,
  type = 'text',
  color = 'primary',
  ...props
}) => {
  const textStyle = color === 'primary' && 'text-primary';
  const style = color === 'primary' ? 'input-primary' : 'input-secondary';

  return (
    <>
      {label && (
        <label className={`block text-sm font-medium ${textStyle}`}>
          {label}
        </label>
      )}
      <input
        onChange={onChange}
        type={type}
        className={`${
          label && 'mt-1'
        } block w-full rounded-md shadow-sm focus-primary sm:text-sm ${style}`}
        {...props}
      />
    </>
  );
};

export default Input;
