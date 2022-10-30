import React from 'react';

const Input = ({
  handler,
  inputType,
  name,
  value,
  styleType = 'primary',
  ...props
}) => {
  let stylePrimary = 'bg-white placeholder:text-gray-dark';
  let styleSecondary = 'bg-secondary placeholder:text-primary';
  let style = styleType === 'primary' ? stylePrimary : styleSecondary;

  return (
    <div>
      <label htmlFor='' className='font-medium text-black'>
        {props.label || 'Label'}
      </label>
      <input
        onChange={(e) => handler(e, name)}
        type={inputType || 'text'}
        value={value}
        className={`w-full py-2 px-4 text-black outline-none rounded-md ${style}`}
        placeholder={props.placeholder || 'Placeholder'}
      />
    </div>
  );
};

export default Input;
