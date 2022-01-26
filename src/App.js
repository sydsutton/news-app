import './App.css';
import {useContext} from "react"
import Navbar from "./components/NavbarComponent"
import TopStories from "./components/TopStoriesComponent"
import MostPopular from "./components/MostPopularComponent"
import LiveNews from "./components/LiveNewsComponent"
import Search from "./components/SearchComponent"
import SavedArticles from './components/SavedArticlesComponent';
import Signup from "./components/SignupComponent"
import Login from "./components/LoginComponent"
import ForgotPassword from "./components/ForgotPasswordComponent"
import {Routes, Route} from "react-router-dom"

import {Context} from "./Context"

function App() {
  const {modalOpen} = useContext(Context)

  return (
    <div className="app">
      {modalOpen ? 
        <Login />
        :
        null
      }
      <Navbar />
      <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00cba9" fill-opacity="1" d="M0,128L60,154.7C120,181,240,235,360,224C480,213,600,139,720,117.3C840,96,960,128,1080,138.7C1200,149,1320,139,1380,133.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>      
       <Routes>
          <Route exact path="/" element={<TopStories />} />
          <Route path="/most-popular" element={<MostPopular />} />
          <Route path="/live-news" element={<LiveNews />} />
          <Route path="/search" element={<Search />} />
          <Route path="/saved" element={<SavedArticles />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    </div>
  );
}

export default App;
