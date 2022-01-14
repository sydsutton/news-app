import './App.css';

import Navbar from "./components/NavbarComponent"
import Home from "./components/HomeComponent"
import TopStories from "./components/TopStoriesComponent"
import MostPopular from "./components/MostPopularComponent"
import LiveNews from "./components/LiveNewsComponent"
import Search from "./components/SearchComponent"

import {Routes, Route} from "react-router-dom"


function App() {
  
  return (
    <div className="app">
      <Navbar />

      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/top-stories" element={<TopStories />} />
          <Route path="/most-popular" element={<MostPopular />} />
          <Route path="/live-news" element={<LiveNews />} />
          <Route path="/search" element={<Search />} />
        </Routes>

    </div>
  );
}

export default App;
