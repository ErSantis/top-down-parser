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
import '../styles/App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <>
            <div>
                {/* Formulario de entrada de gramática */}
                <GrammarInput onGrammarSubmit={handleGrammarSubmit} />

                {/* Muestra la gramática procesada */}
                {processedGrammar && <NonRecursiveGrammarDisplay grammar={processedGrammar} />}

                {/* Muestra el conjunto de primeros y el conjunto de siguientes */}
                {processedGrammar &&
                    <div className="container">
                        {firstSet && <FirstSetDisplay firstSet={firstSet} />}
                        {followSet && <FollowSetDisplay followSet={followSet} />}
                    </div>
                }

                {/* Muestra la tabla de análisis sintáctico */
                }
                {parsingTable &&
                    <div className='container'>
                        <ParsingTableDisplay parsingTable={parsingTable} terminals={terminals} />
                    </div>
                }


                {/* Simulador de análisis descendente */}
                {parsingTable &&
                    <div className='container'>
                        <ParserSimulator parsingTable={parsingTable} startSymbol={startSymbol} />
                    </div>
                }
            </div>
            <ToastContainer />
        </>
    );
};

export default GrammarApp;
