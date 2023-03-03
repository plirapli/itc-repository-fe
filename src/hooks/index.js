import { useEffect, useContext } from 'react';
import ProfileContext from '../context/UserDataProvider';

const useTitle = (title, dependency) => {
  const deps = [dependency] || [];

  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    return () => {
      document.title = prevTitle;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

const useProfile = () => useContext(ProfileContext);

export { useTitle, useProfile };
