import React from 'react';
import Button from '../buttons/Button';
import Tags from '../tags/Tags';

const ListMateriCard = () => {
  return (
    <button className='bg-white px-3 py-3 flex flex-col sm:flex-row sm:items-center gap-3 rounded-md shadow-sm'>
      <div className='w-full sm:text-sm text-left'>
        <p>Lorem ipsum dolor sit amet</p>
        <p className='text-sm text-gray-dark'>4 Bab | 34 Artikel</p>
        <div className='w-max mt-1.5'>
          <Tags id={1} />
        </div>
      </div>

      {/* Action Button */}
      <div className='grid grid-cols-3 sm:flex gap-1'>
        <Button type='iconOnly' styleType='secondary' icon='bxs:pencil' />
        <Button type='iconOnly' styleType='secondary' icon='bxs:wrench' />
        <Button type='iconOnly' styleType='danger' icon='bxs:trash' />
      </div>
    </button>
  );
};

export default ListMateriCard;
