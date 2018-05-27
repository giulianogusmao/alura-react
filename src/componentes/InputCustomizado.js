import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class InputCustomizado extends Component {

    constructor() {
        super();

        this.state = {
            msgError: ''
        };
    }
    
    componentWillMount() {
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
                <label htmlFor={ this.props.id } className="col-sm-2 col-form-label">{ this.props.label }:</label>
                <div className="col-sm-10">
                    <input type={ this.props.type } className="form-control" aria-describedby={ this.props.id + 'Help' } id={ this.props.id } name={ this.props.id } placeholder={ this.props.placeholder } value={ this.props.value } onChange={ this.props.onChange } />
                    <small id={ this.props.id + 'Help' } className="form-text text-danger">
                        { this.state.msgError }
                    </small>
                </div>
            </div>
        );
    }
}
