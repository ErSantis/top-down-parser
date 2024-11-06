import { Grammar, Production } from "../types/Grammar.type";

export function removeLeftRecursion(grammar: Grammar): Grammar {
    const newGrammar: Grammar = {};

    for (const nonTerminal in grammar) {
        const productions = grammar[nonTerminal];
        const recursiveProds: Production[] = [];
        const nonRecursiveProds: Production[] = [];

        // Separar producciones recursivas y no recursivas
        productions.forEach((production) => {
            if (production.startsWith(nonTerminal)) {
                recursiveProds.push(production.slice(nonTerminal.length));
            } else {
                nonRecursiveProds.push(production);
            }
        });

        // Si no se encuentra recursividad, mantener las producciones tal cual
        if (recursiveProds.length === 0) {
            newGrammar[nonTerminal] = productions;
            continue;
        }

        // Crear nuevo no terminal y actualizar producciones
        const newNonTerminal = `${nonTerminal}'`;
        newGrammar[nonTerminal] = nonRecursiveProds.map((prod) => {
            if (prod === '&') {
                return `${newNonTerminal}`;
            }
            return `${prod}${newNonTerminal}`;
        });
        newGrammar[newNonTerminal] = recursiveProds.map((prod) => `${prod}${newNonTerminal}`);
        newGrammar[newNonTerminal].push("&"); // Agregar ε para permitir producción vacía
    }

    return newGrammar;
}
