import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class selectCustomizado extends Component {

    constructor() {
        super();

        this.state = {
            options: [
                {
                    id: '',
                    nome: 'Selecione'
                }
            ],
            msgError: ''
        };
    }

    componentWillMount() {
        PubSub.subscribe(this.props.observableoptions, (topico, lista) => {
            this.setState({
                options: lista
            });
        });

        PubSub.subscribe('erro-validacao', (topico, erro) => {
            if (this._isSameID(erro.field)) {
                this._setMsgError(erro.defaultMessage);
            }
        });

        PubSub.subscribe('limpa-erros-validacao', (topico) => {
            this._setMsgError('');
        });
    }

    // verifica se o erro pertence ao input em questão
    _isSameID(str) {
        return this.props.id.toLowerCase() === str.toLowerCase();
    }

    _setMsgError(msg) {
        this.setState({
            msgError: msg
        });
    }

    render() {
        return (
            <div className="form-group row">
                <label htmlFor={this.props.id} className="col-sm-2 col-form-label">{this.props.label}:</label>
                <div className="col-sm-10">
                    <select className="form-control" aria-describedby={this.props.id + 'Help'} name={this.props.id} {...this.props}>
                        {
                            this.state.options.map(option => {
                                return option ? <option key={option.id} value={option.id}>{option.nome}</option> : <option value="">Nenhum valor disponível</option>
                            })
                        }
                    </select>
                    <small id={this.props.id + 'Help'} className="form-text text-danger">
                        {this.state.msgError}
                    </small>
                </div>
            </div>
        );
    }
}
