import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Main from "./components/MainComponent"
import TopStories from "./components/TopStoriesComponent"
import MostPopular from "./components/MostPopularComponent"
import LiveNews from "./components/LiveNewsComponent"

import { ContextProvider} from './Context';

import {BrowserRouter, Routes, Route} from "react-router-dom"

ReactDOM.render(
  <ContextProvider>
      <BrowserRouter>
        <App />
        
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/top-stories" element={<TopStories />} />
          <Route path="/most-popular" element={<MostPopular />} />
          <Route path="/live-news" element={<LiveNews />} />
        </Routes>

      </BrowserRouter>
    </ContextProvider>,
  document.getElementById('root')
);

