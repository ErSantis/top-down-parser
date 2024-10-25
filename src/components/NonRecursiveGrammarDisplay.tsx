// NonRecursiveGrammarDisplay.tsx
import React from "react";
import { Gramatica } from "../utils/deleteRecursive";

interface NonRecursiveGrammarDisplayProps {
    grammar: Gramatica;
}

const NonRecursiveGrammarDisplay: React.FC<NonRecursiveGrammarDisplayProps> = ({ grammar }) => {
    return (
        <div>
            <h3>Gramática sin recursividad a la izquierda:</h3>
            <pre>
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
