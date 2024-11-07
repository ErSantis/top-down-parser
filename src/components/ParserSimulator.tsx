import React, { useState } from "react";

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
            // Aceptación
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
            // Coincidencia (match) del símbolo de entrada y el tope de la pila
            outputMessage = `Match ${nextInput}`;
            currentStack.pop();  // Eliminar el tope de la pila
            setStack(currentStack);
            setInput(currentInput.slice(1));  // Avanzar en la entrada
        } else if (parsingTable[topStack] && parsingTable[topStack][nextInput]) {
            // Si hay una regla en la tabla de análisis para el símbolo en el tope de la pila y el símbolo de entrada
            const production = parsingTable[topStack][nextInput].split('->')[1].trim();
            outputMessage = `${topStack} -> ${production}`;
            currentStack.pop();  // Eliminar el no terminal de la pila

            // Insertar los símbolos de la producción en orden inverso
            const productionSymbols = production === "&"
                ? []  // Si es producción vacía (ε), no agregar nada
                : production.match(/[A-Z]'*|./g) || [];
            setStack([...currentStack, ...productionSymbols.reverse()]);
        } else {
            outputMessage = `Error: no rule for ${topStack} with ${nextInput}`;
            setError(true);
        }

        // Agregar el paso actual a la lista de pasos
        setSteps((prevSteps) => [
            ...prevSteps,
            {
                stack: stack,
                input: input,
                output: outputMessage,
            },
        ]);
    };

    const tableHeaderStyle = { backgroundColor: "#eee", padding: "10px", fontWeight: "bold" };
    const tableCellStyle: React.CSSProperties = { padding: "10px", textAlign: "center", border: "1px solid #ddd" };
    const enabledButtonStyle: React.CSSProperties = {
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        cursor: "pointer"
    };
    const disabledButtonStyle: React.CSSProperties = {
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#cccccc",
        color: "#666666",
        border: "none",
        cursor: "not-allowed"
    };

    return (
        <div>
            <h3>Simulación de Análisis</h3>
            <input
                type="text"
                value={inputString}
                onChange={(e) => setInputString(e.target.value)}
                placeholder="Ingresa la cadena a testear"
                style={{ marginBottom: "10px", padding: "10px", fontSize: "16px" }}
            />
            <button
                onClick={handleStart}
                style={{ marginBottom: "20px", padding: "10px 20px", fontSize: "16px" }}
            >
                Enviar Cadena
            </button>
            {started && (
                <>
                    <button
                        onClick={handleNextStep}
                        style={(accepted || error) ? disabledButtonStyle : enabledButtonStyle}

                    >
                        Siguiente Paso
                    </button>
                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                        <thead>
                            <tr>
                                <th style={tableHeaderStyle}>Paso</th>
                                <th style={tableHeaderStyle}>Pila</th>
                                <th style={tableHeaderStyle}>Entrada</th>
                                <th style={tableHeaderStyle}>Salida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {steps.map((step, index) => (
                                <tr key={index}>
                                    <td style={tableCellStyle}>{index + 1}</td>
                                    <td style={tableCellStyle}>
                                        {step.stack.slice(0, step.stack.length - 1)}
                                        <span style={{ color: 'blue', fontWeight: 'bold' }}>{step.stack.slice(-1)}</span>
                                    </td>
                                    <td style={tableCellStyle}>
                                        <span style={{ color: "blue", fontWeight: 'bold' }}>{step.input[0]}</span>
                                        {step.input.slice(1)}
                                    </td>
                                    <td style={{ ...tableCellStyle, color: step.output.includes("Error") ? "red" : step.output.includes("aceptada") ? "green" : "black" }}>
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
