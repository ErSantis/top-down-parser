// FirstSetDisplay.tsx
import React from "react";

type FirstSet = { [symbol: string]: Set<string> };

interface FirstSetDisplayProps {
    firstSet: FirstSet;
}

const FirstSetDisplay: React.FC<FirstSetDisplayProps> = ({ firstSet }) => {
    return (
        <div>
            <h2>Conjuntos PRIMERO de la Gramática</h2>
            <ul>
                {Object.entries(firstSet).map(([nonTerminal, symbols]) => (
                    <li key={nonTerminal}>
                        PRIMERO({nonTerminal}) = {"{ "}
                        {Array.from(symbols).join(", ")}
                        {" }"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FirstSetDisplay;
