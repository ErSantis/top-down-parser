import React from "react";
import { Grammar } from "../types/Grammar.type";
import "../styles/NonRecursiveGrammarDisplay.css"; // Archivo CSS para estilos

interface NonRecursiveGrammarDisplayProps {
    grammar: Grammar;
}

const NonRecursiveGrammarDisplay: React.FC<NonRecursiveGrammarDisplayProps> = ({ grammar }) => {
    return (
        <div className="grammar-display-container">
            <h3 className="title">Gramática sin recursividad a la izquierda:</h3>
            <pre className="grammar-content">
                {Object.entries(grammar).map(([nonTerminal, productions]) => (
                    <div key={nonTerminal} className="grammar-line">
                        <span className="non-terminal">{nonTerminal}</span>{' -> '}
                        <span className="productions">{productions.join(' | ')}</span>
                    </div>
                ))}
            </pre>
        </div>
    );
};

export default NonRecursiveGrammarDisplay;
