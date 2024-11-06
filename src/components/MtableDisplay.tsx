// ParsingTableDisplay.tsx
import React from "react";

type ParsingTableProps = {
    parsingTable: { [nonTerminal: string]: { [terminal: string]: string } };
    terminals: string[]; // Lista ordenada de terminales
};

const ParsingTableDisplay: React.FC<ParsingTableProps> = ({ parsingTable, terminals }) => {
    const nonTerminals = Object.keys(parsingTable);

    return (
        <div style={{ marginTop: "20px" }}>
            <h2>Tabla M (Tabla de Análisis)</h2>
            <table border={1} cellPadding={5} style={{ borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Non-terminal</th>
                        {terminals.map(terminal => (
                            <th key={terminal}>{terminal}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {nonTerminals.map(nonTerminal => (
                        <tr key={nonTerminal}>
                            <td>{nonTerminal}</td>
                            {terminals.map(terminal => (
                                <td key={terminal}>
                                    {parsingTable[nonTerminal][terminal] || ""}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ParsingTableDisplay;
