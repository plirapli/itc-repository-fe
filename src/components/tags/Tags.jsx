import React, { useEffect, useState } from 'react';
import { getDivisi } from '../../Utils/getData';

const Tags = ({ id = 1, divisi }) => {
  const [selectedDiv, setSelectedDiv] = useState({});

  useEffect(() => {
    setSelectedDiv(divisi.filter((div) => div.id === id)[0]);
  }, [id]);

  let divisions = [
    { id: 1, color: 'bg-divisi-be' },
    { id: 2, color: 'bg-divisi-fe' },
    { id: 3, color: 'bg-divisi-mobile' },
    { id: 4, color: 'bg-divisi-pr' },
    { id: 5, color: 'bg-divisi-pm' },
  ];

  return (
    <div
      className={`px-2 text-white text-sm rounded ${divisions[id - 1].color}`}
    >
      {selectedDiv?.divisionName}
    </div>
  );
};

export default Tags;
