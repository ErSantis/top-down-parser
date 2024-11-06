import { Grammar } from "../types/Grammar.type";

    // Función para obtener los terminales en el orden en que aparecen en la gramática
    export const extractTerminalsInOrder = (grammar: Grammar): string[] => {
        const terminalSet = new Set<string>();

        for (const productions of Object.values(grammar)) {
            for (const production of productions) {
                // Dividir la producción en símbolos
                const symbols = production.match(/[A-Z]'*|./g) || [];
                symbols.forEach(symbol => {
                    if (!grammar[symbol] && symbol !== "&") {
                        // Si el símbolo no es un no terminal y no es épsilon, se considera un terminal
                        terminalSet.add(symbol);
                    }
                });
            }
        }

        // Convertir el conjunto a un array para mantener el orden de aparición
        terminalSet.add("$");
        return Array.from(terminalSet);
    };