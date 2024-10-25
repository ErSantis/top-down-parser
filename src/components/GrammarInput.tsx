// GrammarInput.tsx
import React, { useState } from "react";
import { Grammar } from "../types/Grammar.type";

interface GrammarInputProps {
    onGrammarSubmit: (grammar: Grammar) => void;
}

const GrammarInput: React.FC<GrammarInputProps> = ({ onGrammarSubmit }) => {
    const [input, setInput] = useState("");

    const handleSubmit = () => {
        const grammar: Grammar = {};
        const lines = input.split("\n");

        lines.forEach(line => {
            const [left, right] = line.split("->");
            if (left && right) {
                const nonTerminal = left.trim();
                const production = right.trim();

                // Si el no terminal ya existe, agregamos la nueva producción a su lista
                if (grammar[nonTerminal]) {
                    grammar[nonTerminal].push(production);
                } else {
                    grammar[nonTerminal] = [production];
                }
            }
        });

        onGrammarSubmit(grammar);
    };

    return (
        <div>
            <h3>Ingresa la gramática:</h3>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={6}
                cols={40}
                placeholder={"Ejemplo: E->E+T\nE->T\nT->T*F\nT->F\nF->i\nF->(E)"}
            />
            <br />
            <button onClick={handleSubmit}>Eliminar Recursividad</button>
        </div>
    );
};

export default GrammarInput;
