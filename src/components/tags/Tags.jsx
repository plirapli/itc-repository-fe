import React from 'react';

const Tags = ({ id = 1 }) => {
  let divisions = [
    { id: 1, name: 'Mobile Developer', color: 'bg-divisi-mobile' },
    { id: 2, name: 'Public Relations', color: 'bg-divisi-pr' },
    { id: 3, name: 'Project Manager', color: 'bg-divisi-pm' },
    { id: 4, name: 'Front-end Developer', color: 'bg-divisi-fe' },
    { id: 5, name: 'Back-end Developer', color: 'bg-divisi-be' },
  ];

  let selectedDiv = divisions.filter((div) => div.id === id)[0];

  return (
    <div className={`px-2 text-white text-sm rounded ${selectedDiv.color}`}>
      {selectedDiv.name}
    </div>
  );
};

export default Tags;
