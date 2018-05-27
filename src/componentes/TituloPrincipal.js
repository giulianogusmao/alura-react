import React, { Component } from 'react';

export default class TituloPrincipal extends Component {
    render() {
        return (
            <div className="app-header text-center pt-5">
                <div className="container">
                    <h1>{this.props.titulo}</h1>
                </div>

                <hr className="my-4" />
            </div>
        );
    }
}
