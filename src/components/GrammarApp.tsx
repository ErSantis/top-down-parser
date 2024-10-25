// GrammarApp.tsx
import React, { useState } from "react";
import GrammarInput from "./GrammarInput";
import NonRecursiveGrammarDisplay from "./NonRecursiveGrammarDisplay";
import { removeLeftRecursion } from "../utils/leftRecursion";
import { leftFactor } from "../utils/leftFactoring";
import { Grammar } from "../types/Grammar.type";


const GrammarApp: React.FC = () => {
    const [nonRecursiveGrammar, setNonRecursiveGrammar] = useState<Grammar | null>(null);

    const handleGrammarSubmit = (inputGrammar: Grammar) => {
        // Primero, eliminar recursividad a la izquierda
        const grammarWithoutRecursion = removeLeftRecursion(inputGrammar);

        // Luego, factorizar a la izquierda si es necesario
        const factoredGrammar = leftFactor(grammarWithoutRecursion);

        // Establecer la gramática final sin recursividad y con factor común
        setNonRecursiveGrammar(factoredGrammar);
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
