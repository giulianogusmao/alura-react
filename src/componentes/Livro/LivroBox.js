import React, { Component } from 'react';

import SectionBody from '../SectionBody';

export default class LivroBox extends Component {
    render() {
        return (
            <div className="app-livro">
                <SectionBody titulo="Tome-le livro" />
            </div>
        );
    }
}