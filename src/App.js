import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main">
        <div className="row">

          {/* Menu */}
          <div className="app-menu col-sm-4 px-0">

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
              {/* FORM cadastra autor */}
              <div className="app-form app-form-autor">
                <form>

                  {/* input Nome */}
                  <div className="form-group row">
                    <label htmlFor="inputNome" className="col-sm-2 col-form-label">Nome</label>
                    <div className="col-sm-10">
                      <input type="email" className="form-control" id="inputNome" placeholder="Nome" />
                    </div>
                  </div>

                  {/* input Email */}
                  <div className="form-group row">
                    <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                      <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                    </div>
                  </div>

                  {/* input Senha */}
                  <div className="form-group row">
                    <label htmlFor="inputSenha" className="col-sm-2 col-form-label">Senha</label>
                    <div className="col-sm-10">
                      <input type="password" className="form-control" id="inputSenha" placeholder="Senha" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="text-right">
                      <button type="submit" className="btn btn-primary">Salvar</button>
                    </div>
                  </div>
                </form>
              </div> 
              {/* fim .app-form */}

              {/* tabela lista autores */}
              <div className="app-table app-table-autores">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="col-nome">Nome</th>
                      <th className="col-email">E-mail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="col-nome">Alberto</td>
                      <td className="col-email">alberto.souza@caelum.com.br</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* fim .app-table */}

            </div>
            {/* fim .app-body */}
          </section>
        </div>
      </div>
    );
  }
}

export default App;
