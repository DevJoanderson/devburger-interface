import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ });
 
  const putUserData = (userInfo) => {
    setUserInfo(userInfo)

    localStorage.setItem('devburger:userData', JSON.stringify(userInfo));
  }
   useEffect(() => {
    const userData = localStorage.getItem('devburger:userData');

    if (userData) {
      setUserInfo(JSON.parse(userData));
    }
  }, []);

  console.log('UserProvider carregado');

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, putUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

