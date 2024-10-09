import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import { AuthProvider } from './Components/AuthContext';
import HomePage from './Pages/HomePage';
import MoviePage from './Pages/MoviePage';
import ListPage from './Pages/ListPage';


function App() {
    const [loginStatus, setLogin] = useState(false)

    const toggleLogin = (val) => {
        setLogin(val)
    };

    return (
        <div className="App">
            <AuthProvider>
                <Router>
                    <Header loginStatus={loginStatus} loginToggle={toggleLogin}/>
                    <Routes>
                        <Route path="/" element={<HomePage loginStatus={loginStatus}/>} />
                        <Route path="/movie/:id" element={<MoviePage />} />
                        <Route path="/top-rated" element={<ListPage pagetype="TopRated"/>} />
                        <Route path="/upcoming" element={<ListPage pagetype="Upcoming" />} />
                        <Route path="/popular" element={<ListPage pagetype="Popular" />} />
                        <Route path="/now-playing" element={<ListPage pagetype="NowPlaying" />} /> 
                    </Routes>
                </Router>
            </AuthProvider>
      </div>
  );
}

export default App;
