import React, { Component } from 'react';

export default class BtnSubmitCustomizado extends Component {
    render() {
        return (
            <button type="submit" className="btn btn-primary">{ this.props.value }</button>
        );
    }
}
