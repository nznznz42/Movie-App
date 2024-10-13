import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom';
import Header from './Components/Header';
import { AuthProvider } from './Components/AuthContext';
import HomePage from './Pages/HomePage';
import MoviePage from './Pages/MoviePage';
import ListPage from './Pages/ListPage';
import Footer from './Components/Footer';
import SearchPage from './Pages/SearchPage';
import Search from './Components/Search';
import Profile from './Components/Profile';
import Subscribe from './Components/Subscribe';
import axios from 'axios';

function App() {
    const [loginStatus, setLogin] = useState(false)
    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]);

    const toggleLogin = (val) => {
        setLogin(val)
    };

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await axios.get('http://localhost:8081/config');
                const { genres, languages } = response.data;
                console.log(genres)
                setGenres(genres);
                setLanguages(languages);
            } catch (error) {
                console.error('Error fetching config:', error);
            }
        };

        fetchConfig();
    }, []);

    return (
        <div className="App">
            <AuthProvider>
                <Router>
                    <Header loginStatus={loginStatus} loginToggle={toggleLogin} genres={genres}/>
                    <Routes>
                        <Route path="/" element={<HomePage loginStatus={loginStatus}/>} />
                        <Route path="/search" element={<Search genres={genres} languages={languages}/>} />
                        <Route path="/movie/:id" element={<MoviePage />} />
                        <Route path="/top-rated" element={<ListPage pagetype="TopRated"/>} />
                        <Route path="/upcoming" element={<ListPage pagetype="Upcoming" />} />
                        <Route path="/popular" element={<ListPage pagetype="Popular" />} />
                        <Route path="/now-playing" element={<ListPage pagetype="NowPlaying" />} />
                        <Route path='/search/:movieName' element = { <SearchPage /> } /> 
                        <Route path='/search/genre/:name/:id' element ={<ListPageWrapper />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/subscribe' element={<Subscribe />} />
                    </Routes>
                    <Footer/>
                </Router>
            </AuthProvider>
      </div>
  );
}

const ListPageWrapper = () => {
    const { name ,id } = useParams();
    return <ListPage genre={id} pagetype={undefined} genreName={name}/>; 
};

  
export default App;
