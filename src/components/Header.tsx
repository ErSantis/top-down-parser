import React from 'react';
import '../styles/Header.css'; // Asegúrate de crear este archivo CSS

const Header: React.FC = () => {
    return (
        <header className="header">
            <a href="https://github.com/tu-usuario" className="github-link" target="_blank" rel="noopener noreferrer">
                GitHub
            </a>
            <h1 className="app-title">Top-down Parser</h1>
        </header>
    );
};

export default Header;