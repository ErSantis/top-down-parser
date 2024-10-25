// GrammarApp.tsx
import React, { useState } from "react";
import GrammarInput from "./GrammarInput";
import NonRecursiveGrammarDisplay from "./NonRecursiveGrammarDisplay";
import { eliminarRecursividadIzquierda, Gramatica } from "../utils/deleteRecursive"

const GrammarApp: React.FC = () => {
    const [grammar, setGrammar] = useState<Gramatica>({});
    const [nonRecursiveGrammar, setNonRecursiveGrammar] = useState<Gramatica | null>(null);

    const handleGrammarSubmit = (inputGrammar: Gramatica) => {
        setGrammar(inputGrammar);
        const result = eliminarRecursividadIzquierda(inputGrammar);
        setNonRecursiveGrammar(result);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Analizador sintáctico descendente </h1>
            <GrammarInput onGrammarSubmit={handleGrammarSubmit} />
            {nonRecursiveGrammar && <NonRecursiveGrammarDisplay grammar={nonRecursiveGrammar} />}
        </div>
    );
};

export default GrammarApp;
