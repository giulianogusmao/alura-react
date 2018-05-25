import React, { Component } from 'react';
import $ from 'jquery';

export default class ListaAutores extends Component {

    // código que será executado após o render
    componentDidMount() {
        this.loadAutores();
    }

    loadAutores() {
        $.ajax({
            url: `${this.props.UrlApi}/api/autores`,
            dataType: 'json',
            success: (resposta) => {
                this.props.atualizaLista(resposta);
            },
            error: (err) => {
                console.error(`Não foi possível carregar os autores`);

                this.props.atualizaLista([
                    { nome: 'Não foi possível carregar' }
                ]);
            }
        });
    }


    render() {
        return (
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
                            this.props.lista.map(autor =>
                                <tr key={autor.id}>
                                    <td className="col-nome">{autor.nome}</td>
                                    <td className="col-email">{autor.email}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        );
    }
}
