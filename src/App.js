import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';

import AutorBox from './componentes/Autor/AutorBox';
import HomeBox from './componentes/Home/HomeBox';
import LivroBox from './componentes/Livro/LivroBox';


class App extends Component {

  render() {
    return (
      <div className="main container-fluid">
        <Router>
          <div className="row">

            {/* Menu */}
            <div className="app-menu col-12 col-sm-3 col-md-2 px-0 bg-dark">
              <nav className="p-2">
                <div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                  <Link className="nav-link text-white" to="/">Home</Link>
                  <Link className="nav-link text-white" to="/autor">Autor</Link>
                  <Link className="nav-link text-white" to="/livro">Livro</Link>
                </div>
              </nav>
            </div>

            {/* body */}
            <section className="app-section col px-0">
              <Route exact path="/" component={HomeBox} />
              <Route path="/autor" component={AutorBox} />
              <Route path="/livro" component={LivroBox} />
            </section>
          </div>

        </Router>
      </div>
    );
  }
}

export default App;
