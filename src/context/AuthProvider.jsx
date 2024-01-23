import React, { createContext, useContext, useEffect, useReducer } from 'react';
import useAuth from '../useAuth';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Thực hiện logic xác thực ở đây
  const auth = useAuth(); 
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuthContext };
