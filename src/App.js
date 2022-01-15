import './App.css';
import {useContext} from "react"
import Navbar from "./components/NavbarComponent"
import TopStories from "./components/TopStoriesComponent"
import MostPopular from "./components/MostPopularComponent"
import LiveNews from "./components/LiveNewsComponent"
import Search from "./components/SearchComponent"

import {Routes, Route} from "react-router-dom"

import {Context} from "./Context"

function App() {
  
  const {errorMessage} = useContext(Context)

  return (
    <div className="app">
      <Navbar />
      {errorMessage ? <h1>{errorMessage}</h1> : null}
      <Routes>
          <Route exact path="/" element={<TopStories />} />
          <Route path="/most-popular" element={<MostPopular />} />
          <Route path="/live-news" element={<LiveNews />} />
          <Route path="/search" element={<Search />} />
        </Routes>

    </div>
  );
}

export default App;
