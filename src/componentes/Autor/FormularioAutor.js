import React, { Component } from 'react';
import $ from 'jquery';

import InputCustomizado from '../InputCustomizado';
import BtnSubmitCustomizado from '../BtnSubmitCustomizado';

export default class FormularioAutor extends Component {

    constructor() {
        super();

        this.state = {
            nome: '',
            email: '',
            senha: ''
        };

        // define que a função sempre utilizará o this como o escopo da classe
        this.gravaAutor = this.gravaAutor.bind(this);
    }

    gravaAutor(event) {
        event.preventDefault();

        const data = JSON.stringify({
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        });

        $.ajax({
            url: `${this.props.UrlApi}/api/autores`,
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: data,
            success: (resposta) => {
                // atualiza lista
                this.props.atualizaLista(resposta);

                // limpa formulario
                this.limpaFormulario();
            },
            error: (resposta) => {
                console.log("erro");
            }
        });
    }

    limpaFormulario() {
        this.setState({
            nome: '',
            email: '',
            senha: ''
        });
    }

    setNome(evento) {
        this.setState({
            nome: evento.target.value
        });
    }

    setEmail(evento) {
        this.setState({
            email: evento.target.value
        });
    }

    setSenha(evento) {
        this.setState({
            senha: evento.target.value
        });
    }
    

    render() {
        return (
            <form onSubmit={this.gravaAutor.bind(this)} method="post">
                {/* input Nome */}
                <InputCustomizado type="text" id="nome" label="Nome" placeholder="Nome" value={this.state.nome} onChange={this.setNome.bind(this)} />

                {/* input Email */}
                <InputCustomizado type="email" id="inputEmail" label="Email" placeholder="Email" value={this.state.email} onChange={this.setEmail.bind(this)} />

                {/* input Senha */}
                <InputCustomizado  type="password" id="inputSenha" label="Senha" placeholder="Senha" value={this.state.senha} onChange={this.setSenha.bind(this)} />

                <div className="form-group">
                    <div className="text-right">
                        <BtnSubmitCustomizado value="Salvar" />
                    </div>
                </div>
            </form>
        );
    }
}
