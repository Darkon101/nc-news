import { createContext, useContext, useState } from "react";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [isUserSet, setIsUserSet] = useState(false)

  const setUserContext = (newUser) => {
    setUser(newUser)
    setIsUserSet(true) 
  }

  const clearUserContext = () => {
    setUser('')
    setIsUserSet(false)
  }

  return (
    <UsersContext.Provider value={{ user, isUserSet, clearUserContext, setUserContext }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUser = () => {
    return useContext(UsersContext) 
}