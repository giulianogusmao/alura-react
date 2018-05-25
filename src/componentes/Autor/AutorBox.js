import React, { Component } from 'react';

import FormularioAutor from './FormularioAutor';
import ListaAutores from './ListaAutores';

export default class AutorBox extends Component {

    constructor() {
        super();

        this.state = {
            lista: [],
        };

        this.UrlApi = "http://cdc-react.herokuapp.com";

        // define que a função sempre utilizará o this como o escopo da classe
        this.atualizaLista = this.atualizaLista.bind(this);
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
                    <FormularioAutor UrlApi={this.UrlApi} atualizaLista={this.atualizaLista} />
                </div>
                {/* fim .app-form */}

                {/* tabela lista autores */}
                <div className="app-table app-table-autores">
                    <ListaAutores UrlApi={this.UrlApi} atualizaLista={this.atualizaLista} lista={this.getLista()} />
                </div>
                {/* fim .app-table */}
            </div>
        );
    }
}
