import React, { Component } from 'react';

export default class InputCustomizado extends Component {
    render() {
        return (
            <div className="form-group row">
                <label htmlFor={ this.props.id } className="col-sm-2 col-form-label">{ this.props.label }:</label>
                <div className="col-sm-10">
                    <input type={ this.props.type } className="form-control" id={ this.props.id } name={ this.props.id } placeholder={ this.props.placeholder } value={ this.props.value } onChange={ this.props.onChange } />
                </div>
            </div>
        );
    }
}
