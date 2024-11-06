// NonRecursiveGrammarDisplay.tsx
import React from "react";
import { Grammar } from "../types/Grammar.type";

interface NonRecursiveGrammarDisplayProps {
    grammar: Grammar;
}

const NonRecursiveGrammarDisplay: React.FC<NonRecursiveGrammarDisplayProps> = ({ grammar }) => {
    return (
        <div>
            <h3>Gramática sin recursividad a la izquierda:</h3>
            <pre>
                {Object.entries(grammar).map(([nonTerminal, productions]) => (
                    <div key={nonTerminal}>
                        {nonTerminal}{' -> '}{productions.join(' | ')}
                    </div>
                ))}
            </pre>
        </div>
    );
};

export default NonRecursiveGrammarDisplay;