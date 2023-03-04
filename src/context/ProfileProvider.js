import { createContext, useState } from 'react';

const ProfileContext = createContext({});

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({});

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
