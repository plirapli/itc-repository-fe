import { useEffect, useState } from 'react';

const Tags = ({ divName }) => {
  const divisions = [
    { name: 'Back-end Developer', style: 'bg-divisi-be' },
    { name: 'Front-end Developer', style: 'bg-divisi-fe' },
    { name: 'Mobile Developer', style: 'bg-divisi-mobile' },
    { name: 'Public Relations', style: 'bg-divisi-pr' },
    { name: 'Project Manager', style: 'bg-divisi-pm' },
  ];
  console.log(divName);

  return (
    <div className={`w-fit px-1.5 text-white text-xs rounded`}>{divName}</div>
  );
};

export default Tags;
