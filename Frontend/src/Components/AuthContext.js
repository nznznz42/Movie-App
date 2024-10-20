import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('auth-token') || null);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('current-user') || null);
  const [profileImageUrl, setProfileImageUrl] = useState(localStorage.getItem('pfp-url') || null);

  const login = (user, token, url) => {
    setAuthToken(token);
    localStorage.setItem('auth-token', token);
    setCurrentUser(user)
    localStorage.setItem('current-user', user);
    localStorage.setItem('pfp-url', url);
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

    localStorage.removeItem('auth-token');
    setAuthToken(null);
    localStorage.removeItem('current-user')
    setCurrentUser(null)
    localStorage.removeItem('pfp-url')
    setProfileImageUrl(null)
    };

  return (
    <AuthContext.Provider value={{ authToken, currentUser, profileImageUrl, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
