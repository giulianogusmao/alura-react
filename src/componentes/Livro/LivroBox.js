import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import SectionBody from '../SectionBody';
import FormularioLivro from './FormularioLivro';
import ListaLivros from './ListaLivros';

export default class LivroBox extends Component {

    constructor() {
        super();

        this.state = {
            lista: [],
        };

        this.UrlApi = "http://cdc-react.herokuapp.com";
    }

    componentDidMount() {
        PubSub.subscribe('atualiza-lista-livros', (topico, lista) => {
            this.atualizaLista(lista);
        });
    }

    atualizaLista(novaLista) {
        const listaFiltrada = novaLista.reverse().slice(0, 4)
        this.setState({ lista: listaFiltrada });
        return listaFiltrada;
    }

    getLista() {
        return [].concat(this.state.lista);
    }

    render() {
        return (
            <div className="app-livro">
                <SectionBody titulo="Cadastro de Livro" component={
                    <div className="row justify-content-center">
                        <div className="col col-sm-10 col-md-7 col-lg-5">
                            {/* FORM cadastra livro */}
                            <div className="app-form app-form-livro ">
                                <FormularioLivro UrlApi={this.UrlApi} />
                            </div>
                            {/* fim .app-form */}

                            {/* tabela lista livros */}
                            <div className="app-table app-table-livros">
                                <ListaLivros UrlApi={this.UrlApi} lista={this.getLista()} />
                            </div>
                            {/* fim .app-table */}
                        </div>
                    </div>
                } />
            </div>
        );
    }
}