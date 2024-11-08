import React from "react";
import { Grammar } from "../types/Grammar.type";
import "../styles/NonRecursiveGrammarDisplay.css"; // Archivo CSS para estilos

interface NonRecursiveGrammarDisplayProps {
    grammar: Grammar;
}

const NonRecursiveGrammarDisplay: React.FC<NonRecursiveGrammarDisplayProps> = ({ grammar }) => {
    return (
        <div className="grammar-display-container">
            <h3 className="title">Gramática sin recursividad a la izquierda y factorizada</h3>
            <pre className="grammar-content">
                {Object.entries(grammar).map(([nonTerminal, productions]) => (
                    <div key={nonTerminal}>
                        {productions.map((production, index) => (
                            <div key={index}>
                                {nonTerminal}{'->'}{production || "&"}
                            </div>
                        ))}
                    </div>
                ))}
            </pre>
        </div>
    );
};

export default NonRecursiveGrammarDisplay;
