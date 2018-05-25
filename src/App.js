import React, { Component } from 'react';
import './App.css';

import AutorBox from './componentes/Autor/AutorBox';

class App extends Component {

  render() {
    return (
      <div className="main container">
        <div className="row">

          {/* Menu */}
          <div className="app-menu col-3 px-0 d-none">
            <p className="text-center">Meu menu</p>
          </div>

          {/* body */}
          <section className="app-section col px-0">
            <div className="app-header jumbotron text-center">
              <div className="container">
                <h1>
                  Cadastro de autores
              </h1>
              </div>
            </div>

            <div className="app-body container">
              <AutorBox />
            </div>
            {/* fim .app-body */}
          </section>
        </div>
      </div>
    );
  }
}

export default App;
