import React, { useState } from "react";
import { Grammar } from "../types/Grammar.type";
import "../styles/GrammarInput.css" // Importa el archivo CSS para los estilos
import { validateGrammar } from "../utils/validateGrammar";

interface GrammarInputProps {
    onGrammarSubmit: (grammar: Grammar) => void;
}

const GrammarInput: React.FC<GrammarInputProps> = ({ onGrammarSubmit }) => {
    const [input, setInput] = useState("");

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setInput(content);
            if (!validateGrammar(content)) {
                alert("Gramática inválida: verifica que cumpla con las reglas establecidas.");
            }
        };
        reader.readAsText(file);
    };

   
    const parseGrammar = (content: string) => {
        const grammar: Grammar = {};
        const lines = content.split("\n");

        lines.forEach(line => {
            const [left, right] = line.split("->");
            if (left && right) {
                const nonTerminal = left.trim();
                const production = right.trim();

                if (grammar[nonTerminal]) {
                    grammar[nonTerminal].push(production);
                } else {
                    grammar[nonTerminal] = [production];
                }
            }
        });

        onGrammarSubmit(grammar);
    };

    const handleSubmit = () => {
        if (validateGrammar(input)) {
            parseGrammar(input);
        } else {
            alert("Gramática inválida: verifica que cumpla con las reglas establecidas.");
        }
    };

    return (
        <div className="grammar-container">
            <div className="dropzone">
                <label htmlFor="dropzone-file" className="dropzone-label">
                    <div className="dropzone-content">
                        <svg className="dropzone-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="dropzone-text"><span className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
                        <p className="dropzone-subtext">Solo archivos .txt</p>
                    </div>
                    <input id="dropzone-file" type="file" accept=".txt" onChange={handleFileUpload} className="dropzone-input" />
                </label>
            </div>
            <div className="preview-container">
                <h4>Vista previa de la gramática:</h4>
                <div className="preview-box">{input || "El contenido del archivo se mostrará aquí..."}</div>
            </div>
            <button onClick={handleSubmit} className="submit-button">Analizar</button>
        </div>
    );
};

export default GrammarInput;
