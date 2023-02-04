import React from 'react';
import Button from '../buttons/Button';
import Tags from '../tags/Tags';

const ListMateriCard = ({ text, subtext, type, ...props }) => {
  return (
    <div className='w-full p-3 bg-white flex flex-col sm:flex-row sm:items-center gap-3 rounded-md shadow-sm'>
      <div className='w-full sm:text-sm text-left'>
        <p>{text || 'Lorem ipsum dolor sit amet'}</p>
        {type !== 'artikel' && (
          <p className='text-sm text-gray-dark'>
            {subtext || '4 Bab | 34 Artikel'}
          </p>
        )}
        {type === 'materi' && (
          <div className='w-max mt-1.5'>
            <Tags id={1} />
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className='grid grid-flow-col sm:flex gap-1'>
        <Button
          onClick={props.onClickEdit}
          type='iconOnly'
          styleType='secondary'
          icon='bxs:pencil'
        />
        {type === 'materi' && (
          <Button
            onClick={props.onClickDetail}
            type='iconOnly'
            styleType='secondary'
            icon='bxs:detail'
          />
        )}
        <Button
          onClick={props.onClickDelete}
          type='iconOnly'
          styleType='danger'
          icon='bxs:trash'
        />
      </div>
    </div>
  );
};

export default ListMateriCard;
