import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {

  constructor() {
    super();

    this.state = {
      lista: [],
      nome: '',
      email: '',
      senha: ''
    };

    this.UrlApi = "http://cdc-react.herokuapp.com";

    // define que a função sempre utilizará o this como o escopo da classe
    this.atualizaLista = this.atualizaLista.bind(this);
    this.gravaAutor = this.gravaAutor.bind(this);
  }

  // código que será executado após o render
  componentDidMount() {
    this.loadAutores();
  }

  atualizaLista(data) {
    const novaLista = data.reverse().slice(0, 4)
    this.setState({ lista: novaLista });
    return novaLista;
  }

  loadAutores() {
    $.ajax({
      url: `${this.UrlApi}/api/autores`,
      dataType: 'json',
      success: (resposta) => {
        this.atualizaLista(resposta);
      },
      error: (err) => {
        console.error(`Não foi possível carregar os autores`);

        this.setState({
          lista: [
            { nome: 'Não foi possível carregar' }
          ],
        });
      }
    });
  }
  
  gravaAutor(event) {
    event.preventDefault();

    const data = JSON.stringify({ 
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha 
    });

    $.ajax({
      url: `${this.UrlApi}/api/autores`,
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: data,
      success: (resposta) => {
        console.log('atualiza resposta');
        this.atualizaLista(resposta);
      },
      error: (resposta) => {
        console.log("erro");
      }
    });
  }

  setNome(evento){
    this.setState({
      nome: evento.target.value
    });
  }

  setEmail(evento){
    this.setState({
      email: evento.target.value
    });
  }

  setSenha(evento){
    this.setState({
      senha: evento.target.value
    });
  }

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
              {/* FORM cadastra autor */}
              <div className="app-form app-form-autor">
                <form onSubmit={ this.gravaAutor.bind(this) } method="post">

                  {/* input Nome */}
                  <div className="form-group row">
                    <label htmlFor="nome" className="col-sm-2 col-form-label">Nome</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="nome" name="nome" placeholder="Nome" value={ this.state.nome } onChange={ this.setNome.bind(this) } />
                    </div>
                  </div>

                  {/* input Email */}
                  <div className="form-group row">
                    <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                      <input type="email" className="form-control" id="inputEmail" placeholder="Email" value={ this.state.email } onChange={ this.setEmail.bind(this) } />
                    </div>
                  </div>

                  {/* input Senha */}
                  <div className="form-group row">
                    <label htmlFor="inputSenha" className="col-sm-2 col-form-label">Senha</label>
                    <div className="col-sm-10">
                      <input type="password" className="form-control" id="inputSenha" placeholder="Senha" value={ this.state.senha } onChange={ this.setSenha.bind(this) } />
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
                <div className="table-responsive">

                  <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th className="col-nome">Nome</th>
                        <th className="col-email">E-mail</th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        this.state.lista.map(autor =>
                          <tr key={autor.id}>
                            <td className="col-nome">{autor.nome}</td>
                            <td className="col-email">{autor.email}</td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>

                </div>
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
