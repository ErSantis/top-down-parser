import React, { useEffect, useState } from "react";
import "../styles/ParserSimulator.css";

interface ParserSimulatorProps {
    parsingTable: { [nonTerminal: string]: { [terminal: string]: string } };
    startSymbol: string;
}

interface Step {
    stack: string[];
    input: string;
    output: string;
}

const ParserSimulator: React.FC<ParserSimulatorProps> = ({ parsingTable, startSymbol }) => {
    const [stack, setStack] = useState<string[]>([]);
    const [input, setInput] = useState<string>("");
    const [steps, setSteps] = useState<Step[]>([]);
    const [inputString, setInputString] = useState<string>("");
    const [started, setStarted] = useState<boolean>(false);
    const [accepted, setAccepted] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    //const [shouldScroll, setShouldScroll] = useState<boolean>(false);

    useEffect(() => {
        if (started) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }
    }, [steps]); // Se ejecuta cada vez que `steps` se actualiza

    const handleStart = () => {
        const initialStack = ["$", startSymbol];
        const initialInput = inputString + "$";
        setStack(initialStack);
        setInput(initialInput);
        setSteps([{
            stack: initialStack,
            input: initialInput,
            output: "Inicio",
        }]);
        setStarted(true);
        setAccepted(false);
        setError(false);
    };

    const handleNextStep = () => {
        if (accepted || error) return;


        const currentStack = [...stack];
        const currentInput = input;
        const topStack = currentStack[currentStack.length - 1];
        const nextInput = currentInput[0];

        let outputMessage = "";

        if (topStack === "$" && nextInput === "$") {
            outputMessage = "Cadena aceptada";
            setAccepted(true);
            setSteps((prevSteps) => [
                ...prevSteps,
                {
                    stack: currentStack,
                    input: currentInput,
                    output: outputMessage,
                },
            ]);
            return;
        }

        if (topStack === nextInput) {
            outputMessage = `Match ${nextInput}`;
            currentStack.pop();
            setStack(currentStack);
            setInput(currentInput.slice(1));
        } else if (parsingTable[topStack] && parsingTable[topStack][nextInput]) {
            const production = parsingTable[topStack][nextInput].split('->')[1].trim();
            outputMessage = `${topStack} -> ${production}`;
            currentStack.pop();

            const productionSymbols = production === "&" ? [] : production.match(/[A-Z]'*|./g) || [];
            setStack([...currentStack, ...productionSymbols.reverse()]);
        } else {
            outputMessage = `Error: no rule for ${topStack} with ${nextInput}`;
            setError(true);
        }

        setSteps((prevSteps) => [
            ...prevSteps,
            {
                stack: stack,
                input: input,
                output: outputMessage,
            },
        ]);
    };

    return (
        <div className="parser-simulator">
            <h3>Simulación de Análisis</h3>
            <input
                type="text"
                value={inputString}
                onChange={(e) => setInputString(e.target.value)}
                placeholder="Ingresa la cadena a testear"
                className="parser-simulator-input"
            />
            <button
                onClick={handleStart}
                className="start-button"
            >
                Enviar Cadena
            </button>
            {started && (
                <>
                    <button
                        onClick={handleNextStep}
                        className={accepted || error ? "disabled-button" : "next-step-button"}
                    >
                        Siguiente Paso
                    </button>
                    <table>
                        <thead>
                            <tr>
                                <th>Paso</th>
                                <th>Pila</th>
                                <th>Entrada</th>
                                <th>Salida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {steps.map((step, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {step.stack.slice(0, step.stack.length - 1)}
                                        <span className="highlight">{step.stack.slice(-1)}</span>
                                    </td>
                                    <td>
                                        <span className="highlight">{step.input[0]}</span>
                                        {step.input.slice(1)}
                                    </td>
                                    <td className={step.output.includes("Error") ? "output-error" : step.output.includes("aceptada") ? "output-accepted" : ""}>
                                        {step.output}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default ParserSimulator;
