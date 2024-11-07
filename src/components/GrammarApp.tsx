// GrammarApp.tsx
import React, { useState } from "react";
import GrammarInput from "./GrammarInput";
import NonRecursiveGrammarDisplay from "./NonRecursiveGrammarDisplay";
import FirstSetDisplay from "./FirstSetDisplay";
import FollowSetDisplay from "./FollowSetDisplay";
import ParsingTableDisplay from "./MtableDisplay";
import ParserSimulator from "./ParserSimulator"; // Importa el simulador de análisis
import { removeLeftRecursion } from "../utils/leftRecursion";
import { leftFactor } from "../utils/leftFactoring";
import { calculateFirstSets } from "../utils/firstSet";
import { calculateFollowSets } from "../utils/followsSet";
import { constructParsingTable } from "../utils/m-table";
import { extractTerminalsInOrder } from "../utils/extraxtTerminalsInOrder";
import { Grammar } from "../types/Grammar.type";

const GrammarApp: React.FC = () => {
    const [processedGrammar, setProcessedGrammar] = useState<Grammar | null>(null);
    const [firstSet, setFirstSet] = useState<{ [symbol: string]: Set<string> } | null>(null);
    const [followSet, setFollowSet] = useState<{ [symbol: string]: Set<string> } | null>(null);
    const [parsingTable, setParsingTable] = useState<{ [symbol: string]: { [symbol: string]: string } } | null>(null);
    const [terminals, setTerminals] = useState<string[]>([]);
    const [startSymbol, setStartSymbol] = useState<string>(""); // Almacena el símbolo inicial

    const handleGrammarSubmit = (inputGrammar: Grammar) => {
        const grammarWithoutRecursion = removeLeftRecursion(inputGrammar);
        const factoredGrammar = leftFactor(grammarWithoutRecursion);

        setProcessedGrammar(factoredGrammar);

        const initialSymbol = Object.keys(factoredGrammar)[0];
        setStartSymbol(initialSymbol);

        const firstSets = calculateFirstSets(factoredGrammar);
        setFirstSet(firstSets);

        const followSets = calculateFollowSets(factoredGrammar, firstSets, initialSymbol);
        setFollowSet(followSets);

        const Mtable = constructParsingTable(factoredGrammar, firstSets, followSets);
        setParsingTable(Mtable);

        const terminalsInOrder = extractTerminalsInOrder(factoredGrammar);
        setTerminals(terminalsInOrder);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Procesador de Gramática: Recursividad y PRIMERO</h1>
            <GrammarInput onGrammarSubmit={handleGrammarSubmit} />
            {processedGrammar && <NonRecursiveGrammarDisplay grammar={processedGrammar} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {firstSet && <FirstSetDisplay firstSet={firstSet} />}
                {followSet && <FollowSetDisplay folloset={followSet} />}
            </div>

            {parsingTable && <ParsingTableDisplay parsingTable={parsingTable} terminals={terminals} />}

            
            {/* Simulador de análisis descendente */}
            {parsingTable && (
                <ParserSimulator parsingTable={parsingTable} startSymbol={startSymbol} />
            )}
        </div>
    );
};

export default GrammarApp;
