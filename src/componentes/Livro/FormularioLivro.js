import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';

import TrataErros from '../TrataErros/TrataErros';

import InputCustomizado from '../InputCustomizado';
import SelectCustomizado from '../SelectCustomizado';
import BtnSubmitCustomizado from '../BtnSubmitCustomizado';


export default class FormularioLivro extends Component {

    constructor() {
        super();

        this.state = {
            titulo: '',
            preco: '',
            autorId: '',
        };

        // define que a função sempre utilizará o this como o escopo da classe
        this.gravaLivro = this.gravaLivro.bind(this);
    }

    componentDidMount() {
        this.loadAutores();
    }

    loadAutores() {
        $.ajax({
            url: `${this.props.UrlApi}/api/autores`,
            dataType: 'json',
            success: (lista) => {
                this.atualizaAtores(lista);
            },
            error: (err) => {
                console.error(`Não foi possível carregar os autores`);

                this.atualizaAtores([
                    { id: "", nome: 'Erro ao carregar autores' }
                ]);
            }
        });
    }

    atualizaAtores(novaLista) {
        const listaFiltrada = novaLista.reverse().slice(0, 4);
        PubSub.publish('atualiza-options-autores', listaFiltrada);
    }

    gravaLivro(event) {
        event.preventDefault();

        const data = JSON.stringify({
            titulo: this.state.titulo,
            preco: this.state.preco,
            autorId: this.state.autorId
        });

        $.ajax({
            url: `${this.props.UrlApi}/api/livros`,
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: data,
            success: (novaLista) => {
                // limpa formulario
                this.limpaFormulario();

                // dispara evento com lista atualizada
                PubSub.publish('atualiza-lista-livros', novaLista);
            },
            error: (resposta) => {
                console.log(`Erro ao cadastrar livro -> ${resposta.responseJSON.message}`);

                if (resposta.status === 400) {
                    new TrataErros().publicaErros(resposta.responseJSON);
                }
            },
            beforeSend: () => {
                PubSub.publish('limpa-erros-validacao');
            }
        });
    }

    limpaFormulario() {
        this.setState({
            titulo: '',
            preco: '',
            autorId: ''
        });
    }

    setAlteracao(campo, evento) {
        this.setState({
            [campo]: evento.target.value
        });
    }


    render() {
        return (
            <form onSubmit={this.gravaLivro} method="post">
                {/* input Titulo */}
                <InputCustomizado type="text" id="titulo" label="Tìtulo" placeholder="Título do Livro" value={this.state.titulo} onChange={this.setAlteracao.bind(this, 'titulo')} />

                {/* input Preco */}
                <InputCustomizado type="text" id="preco" label="Preço" placeholder="R$ 0,00" value={this.state.preco} onChange={this.setAlteracao.bind(this, 'preco')} />

                {/* Select AutorID */}
                <SelectCustomizado id="autorId" label="Autor" value={this.state.autorId} onChange={this.setAlteracao.bind(this, 'autorId')} observableoptions="atualiza-options-autores" />

                <div className="form-group">
                    <div className="text-right">
                        <BtnSubmitCustomizado value="Salvar" />
                    </div>
                </div>
            </form>
        );
    }
}
