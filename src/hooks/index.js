import { useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';

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

const useAuth = () => useContext(AuthContext);

export { useTitle, useAuth };
