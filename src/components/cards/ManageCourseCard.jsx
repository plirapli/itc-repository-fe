import React from 'react';
import Button from '../buttons/Button';

const ManageCourseCard = ({ type, children, ...props }) => {
  return (
    <div className='w-full p-3 bg-white flex flex-col sm:flex-row sm:items-center gap-3 rounded-md shadow-sm'>
      <div className='w-full sm:text-sm text-left'>{children}</div>

      {/* Action Button */}
      <div className='grid grid-flow-col sm:flex gap-1'>
        <Button
          onClick={props.onClickEdit}
          variant='icon-only'
          color='secondary'
          icon='bxs:pencil'
        />
        {type === 'materi' && (
          <Button
            onClick={props.onClickDetail}
            variant='icon-only'
            color='secondary'
            icon='bxs:detail'
          />
        )}
        <Button
          onClick={props.onClickDelete}
          variant='icon-only'
          color='danger'
          icon='bxs:trash'
        />
      </div>
    </div>
  );
};

export default ManageCourseCard;
