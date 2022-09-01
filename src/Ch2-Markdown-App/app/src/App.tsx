import React, { useEffect, useMemo } from 'react';
import logo from './logo.svg';

import '@csstools/normalize.css';
import './App.scss'
import Page from './Pages';
import HtmlHandler from './libray/HtmlHandler';

function App() {
  const markdown = useMemo(() => {
    return new HtmlHandler()
  },[])

  useEffect(() => {
    markdown.HandleTextChange("markdown-write","markdown-view")
  },[])

  return (
    <div className="App">
      <Page />
    </div>
  );
}

export default App;
