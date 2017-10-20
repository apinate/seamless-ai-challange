import React from 'react';

import { DomainsFinder } from './pages';
import logo from './logo.png';

const App = () => (
  <div className="App" >
    <header className="app-header navbar navbar-light text-white">
      <div className="container">
        <a href="http://seamless.ai">
          <img src={logo} alt="Seamless.AI" />
        </a>
      </div>
    </header>
    <DomainsFinder />
  </div >
);

export default App;
