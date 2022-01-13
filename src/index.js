import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Home from "./components/HomeComponent"
import TopStories from "./components/TopStoriesComponent"
import MostPopular from "./components/MostPopularComponent"
import LiveNews from "./components/LiveNewsComponent"
import Search from "./components/SearchComponent"

import { ContextProvider} from './Context';

import {BrowserRouter, Routes, Route} from "react-router-dom"

ReactDOM.render(
  <ContextProvider>
      <BrowserRouter>
        <App />
        
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/top-stories" element={<TopStories />} />
          <Route path="/most-popular" element={<MostPopular />} />
          <Route path="/live-news" element={<LiveNews />} />
          <Route path="/search" element={<Search />} />
        </Routes>

      </BrowserRouter>
    </ContextProvider>,
  document.getElementById('root')
);

