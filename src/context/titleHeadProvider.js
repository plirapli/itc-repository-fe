import { useEffect } from 'react';
import { createContext, useState } from 'react';

const TitleHeadContext = createContext('ITC Repository');

export const TitleHeadProvider = ({ children }) => {
  const [titleHead, setTitleHead] = useState('');

  useEffect(() => {
    document.title = titleHead;
  }, [titleHead]);

  return (
    <TitleHeadContext.Provider value={{ titleHead, setTitleHead }}>
      {children}
    </TitleHeadContext.Provider>
  );
};

export default TitleHeadContext;
