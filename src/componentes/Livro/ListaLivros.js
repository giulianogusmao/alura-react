import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';

export default class ListaLivros extends Component {

    // código que será executado após o render
    componentDidMount() {
        this.loadLivros();
    }

    loadLivros() {
        $.ajax({
            url: `${this.props.UrlApi}/api/livros`,
            dataType: 'json',
            success: (lista) => {
                PubSub.publish('atualiza-lista-livros', lista);
            },
            error: (err) => {
                console.error(`Não foi possível carregar os livros`);

                PubSub.publish('atualiza-lista-livros', [{ id: -1, titulo: 'Não foi possível carregar', autor: { nome: '-'}, preco: '-' }]);
            }
        });
    }


    _printTable(lista) {
        try {
            if (lista.length) {
                return lista.map(livro =>
                    <tr key={livro.id}>
                        <td className="col-titulo">{livro.titulo}</td>
                        <td className="col-autor">{livro.autor.nome}</td>
                        <td className="col-preco">{livro.preco}</td>
                    </tr>
                );
            }
        } catch (e) {

        }
    }

    render() {
        return (
            <div className="table-responsive">

                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th className="col-titulo">Nome</th>
                            <th className="col-autor">Autor</th>
                            <th className="col-preco">Preço</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this._printTable(this.props.lista)
                        }
                    </tbody>
                </table>

            </div>
        );
    }
}
