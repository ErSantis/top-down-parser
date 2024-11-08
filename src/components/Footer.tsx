import React from 'react';
import '../styles/Footer.css'; // Asegúrate de importar el archivo CSS

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p>
                Made by:{' '}
                <a
                    href="https://github.com/Ersantis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                >
                    Ersantis
                </a>
            </p>
        </footer>
    );
};

export default Footer;
