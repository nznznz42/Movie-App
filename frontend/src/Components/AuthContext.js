import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('auth-token') || null);

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('auth-token', token);
    console.log(token)
  };

  const logout = async () => {
    const data = authToken;
    try {
      await axios.post("http://localhost:8080/auth/logout", data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
    }

    setAuthToken(null);
    localStorage.removeItem('auth-token');
    console.log(authToken)
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
