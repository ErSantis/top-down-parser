// GrammarApp.tsx
import React, { useState } from "react";
import GrammarInput from "./GrammarInput";
import NonRecursiveGrammarDisplay from "./NonRecursiveGrammarDisplay";
import FirstSetDisplay from "./FirstSetDisplay";
import { removeLeftRecursion } from "../utils/leftRecursion";
import { leftFactor } from "../utils/leftFactoring";
import { calculateFirstSets } from "../utils/firstSet";
import { Grammar } from "../types/Grammar.type";
import { calculateFollowSets } from "../utils/followsSet";
import FollowSetDisplay from "./FollowSetDisplay";
import { constructParsingTable } from "../utils/m-table";
import ParsingTableDisplay from "./MtableDisplay";
import { extractTerminalsInOrder } from "../utils/extraxtTerminalsInOrder";

const GrammarApp: React.FC = () => {
    const [processedGrammar, setProcessedGrammar] = useState<Grammar | null>(null);
    const [firstSet, setFirstSet] = useState<{ [symbol: string]: Set<string> } | null>(null);
    const [followSet, setFollowSet] = useState<{ [symbol: string]: Set<string> } | null>(null);
    const [parsingTable, setParsingTable] = useState<{ [symbol: string]: { [symbol: string]: string } } | null>(null);
    const [terminals, setTerminals] = useState<string[]>([]);

    
    
    
    const handleGrammarSubmit = (inputGrammar: Grammar) => {
        // Eliminar recursividad y factorizar la gramática
        console.log(inputGrammar);
        const grammarWithoutRecursion = removeLeftRecursion(inputGrammar);
        const factoredGrammar = leftFactor(grammarWithoutRecursion);

        // Actualizar los estados para mostrar los resultados
        setProcessedGrammar(factoredGrammar);

        // Calcular conjunto PRIMERO de cada no terminal
        const firstSets = calculateFirstSets(factoredGrammar);

        setFirstSet(firstSets);

        // Calcular conjunto SIGUIENTE de cada no terminal
        const followSets = calculateFollowSets(factoredGrammar, firstSets, Object.keys(factoredGrammar)[0]);
        setFollowSet(followSets);

        const Mtable = constructParsingTable(factoredGrammar, firstSets, followSets);
        setParsingTable(Mtable);

        const terminalsInOrder = extractTerminalsInOrder(factoredGrammar);
        setTerminals(terminalsInOrder)
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Procesador de Gramática: Recursividad y PRIMERO</h1>
            <GrammarInput onGrammarSubmit={handleGrammarSubmit} />
            {processedGrammar && <NonRecursiveGrammarDisplay grammar={processedGrammar} />}
            {firstSet && <FirstSetDisplay firstSet={firstSet} />}
            {followSet && <FollowSetDisplay folloset={followSet} />}
            {parsingTable && <ParsingTableDisplay parsingTable={parsingTable}  terminals={terminals}/>}
        </div>
    );
};

export default GrammarApp;
