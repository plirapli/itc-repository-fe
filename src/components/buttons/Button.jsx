import React from 'react';
import { Icon } from '@iconify/react';

const ButtonMedium = ({ text, icon }) => {
  return (
    <button className='flex gap-3 px-3 py-2 sm:px-4 sm:py-2.5 bg-primary text-white rounded shadow-md'>
      <div className='font-medium'>{text || ''}</div>
      <Icon icon={icon || 'uil:icons'} width='20' />
    </button>
  );
};

export default ButtonMedium;
