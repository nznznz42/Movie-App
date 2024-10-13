import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('auth-token') || null);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('current-user') || null);

  const login = (user, token) => {
    setAuthToken(token);
    localStorage.setItem('auth-token', token);
    setCurrentUser(user)
    localStorage.setItem('current-user', user);
    console.log(user)
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
    setCurrentUser(null)
    localStorage.removeItem('current-user')
    console.log(authToken)
  };

  return (
    <AuthContext.Provider value={{ authToken, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
