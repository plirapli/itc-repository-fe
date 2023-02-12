import { useEffect, useState } from 'react';

const Tags = ({ id = 1 }) => {
  const divisions = [
    { name: 'Back-end Developer', style: 'bg-divisi-be' },
    { name: 'Front-end Developer', style: 'bg-divisi-fe' },
    { name: 'Mobile Developer', style: 'bg-divisi-mobile' },
    { name: 'Public Relations', style: 'bg-divisi-pr' },
    { name: 'Project Manager', style: 'bg-divisi-pm' },
  ];
  const [div, setDiv] = useState(divisions[id - 1]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setDiv(divisions[id - 1]), [id]);

  return (
    <div className={`px-1.5 text-white text-xs rounded ${div?.style}`}>
      {div?.name}
    </div>
  );
};

export default Tags;
