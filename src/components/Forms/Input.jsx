import React from 'react';

const Input = ({ type = 'primary', inputType, ...props }) => {
  let stylePrimary = 'bg-white placeholder:text-gray-dark';
  let styleSecondary = 'bg-secondary placeholder:text-primary';
  let style = type === 'primary' ? stylePrimary : styleSecondary;

  return (
    <div>
      <label for='' className='font-medium text-black'>
        {props.label || 'Label'}
      </label>
      <input
        type={inputType || 'text'}
        className={`w-full mt-1 py-2 px-4 text-black outline-none rounded-md ${style}`}
        placeholder={props.placeholder || 'Placeholder'}
      />
    </div>
  );
};

export default Input;
