import { useEffect, useState } from 'react';

const Tags = ({ id = 1, divisi }) => {
  const [selectedDiv, setSelectedDiv] = useState({});
  const divisions = [
    { id: 1, divisionName: 'Back-end Developer' },
    { id: 2, divisionName: 'Front-end Developer' },
    { id: 3, divisionName: 'Mobile Developer' },
    { id: 4, divisionName: 'Public Relations' },
    { id: 5, divisionName: 'Project Manager' },
  ];

  useEffect(() => {
    let selected;

    if (divisi) {
      selected = divisi.filter((div) => div.id === id)[0];
    } else {
      selected = divisions.filter((div) => div.id === id)[0];
    }
    setSelectedDiv(() => selected);
  }, [id, divisi]);

  let style = [
    'bg-divisi-be',
    'bg-divisi-fe',
    'bg-divisi-mobile',
    'bg-divisi-pr',
    'bg-divisi-pm',
  ];

  return (
    <div className={`px-2 text-white text-sm rounded ${style[id - 1]}`}>
      {selectedDiv?.divisionName}
    </div>
  );
};

export default Tags;
