import React, { Component } from 'react';

import TituloPrincipal from './TituloPrincipal';

export default class SectionBody extends Component {
    render() {
        return (
            <section className="app-section-body">
                <TituloPrincipal titulo={this.props.titulo} />

                <div className="app-body container py-2">
                    {this.props.component}
                </div>
                {/* fim .app-body */}
            </section>
        );
    }
}
