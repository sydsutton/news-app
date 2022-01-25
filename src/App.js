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
import {Routes, Route} from "react-router-dom"

import {Context} from "./Context"

function App() {
  const {errorMessage, modalOpen} = useContext(Context)

  return (
    <div className="app">
      {modalOpen ? 
        <Login />
        :
        null
      }
      <Navbar />
      {errorMessage ? <h3>{errorMessage}</h3> : null}
      <Routes>
          <Route exact path="/" element={<TopStories />} />
          <Route path="/most-popular" element={<MostPopular />} />
          <Route path="/live-news" element={<LiveNews />} />
          <Route path="/search" element={<Search />} />
          <Route path="/saved" element={<SavedArticles />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

    </div>
  );
}

export default App;
