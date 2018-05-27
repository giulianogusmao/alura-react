import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import FormularioAutor from './FormularioAutor';
import ListaAutores from './ListaAutores';

export default class AutorBox extends Component {

    constructor() {
        super();

        this.state = {
            lista: [],
        };

        this.UrlApi = "http://cdc-react.herokuapp.com";
    }

    componentDidMount() {
        PubSub.subscribe('atualiza-lista-autores', (topico, lista) => {
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
            <div className="app-autor">
                {/* FORM cadastra autor */}
                <div className="app-form app-form-autor">
                    <FormularioAutor UrlApi={this.UrlApi} />
                </div>
                {/* fim .app-form */}

                {/* tabela lista autores */}
                <div className="app-table app-table-autores">
                    <ListaAutores UrlApi={this.UrlApi} lista={this.getLista()} />
                </div>
                {/* fim .app-table */}
            </div>
        );
    }
}
