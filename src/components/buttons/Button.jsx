import React from 'react';
import { Icon } from '@iconify/react';

const ButtonIconRight = ({ type = 'primary', text, icon, ...props }) => {
  const buttonType = [
    { type: 'primary', style: 'bg-primary text-white' },
    { type: 'secondary', style: 'bg-secondary text-primary' },
    { type: 'primary', style: 'bg-primary text-white' },
    { type: 'primary', style: 'bg-primary text-white' },
  ];

  type = buttonType.filter((btn) => btn.type === type)[0];

  return (
    <button
      className={`
        flex gap-3 p-2.5 sm:px-4 sm:py-2.5 
        rounded shadow-md transition-all hover:bg-opacity-80 ${type.style}`}
    >
      <div className={`font-medium ${props.textClassName}`}>{text || ''}</div>
      <div className='w-5'>
        <Icon icon={icon || 'uil:icons'} width='100%' />
      </div>
    </button>
  );
};

const ButtonIconLeft = ({ text, icon }) => {
  return (
    <button
      className='
              flex gap-3 px-3 py-2 sm:px-4 sm:py-2.5 
              bg-primary text-white rounded shadow-md
              transition-all hover:bg-opacity-80'
    >
      <Icon icon={icon || 'uil:icons'} width='20' />
      <div className='font-medium text-sm sm:text-base'>{text || ''}</div>
    </button>
  );
};

const ButtonIconNone = ({ text }) => {
  return (
    <button
      className='
              flex gap-3 px-3 py-2 sm:px-4 sm:py-2.5 
              bg-primary text-white rounded shadow-md
              transition-all hover:bg-opacity-80'
    >
      <div className='font-medium text-sm sm:text-base'>{text || ''}</div>
    </button>
  );
};

const ButtonIconOnly = ({ icon }) => {
  return (
    <button
      className='
              flex gap-3 p-2.5 sm:p-3 
              bg-primary text-white rounded shadow-md
              transition-all hover:bg-opacity-80'
    >
      <Icon icon={icon || 'uil:icons'} width='20' />
    </button>
  );
};

export { ButtonIconRight, ButtonIconLeft, ButtonIconNone, ButtonIconOnly };
