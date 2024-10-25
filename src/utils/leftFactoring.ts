import { Grammar } from "../types/Grammar.type";

export function leftFactor(grammar: Grammar): Grammar {
    const newGrammar: Grammar = {};

    for (const nonTerminal in grammar) {
        const productions = grammar[nonTerminal];
        const prefixes: { [prefix: string]: string[] } = {};

        // Agrupar producciones por prefijo
        productions.forEach((production) => {
            for (let i = 1; i <= production.length; i++) {
                const prefix = production.slice(0, i);
                if (!prefixes[prefix]) prefixes[prefix] = [];
                prefixes[prefix].push(production.slice(i));
            }
        });

        // Encontrar el prefijo común más largo
        let commonPrefix = "";
        for (const prefix in prefixes) {
            if (prefixes[prefix].length > 1 && prefix.length > commonPrefix.length) {
                commonPrefix = prefix;
            }
        }

        if (commonPrefix) {
            const newNonTerminal = `${nonTerminal}'`;
            newGrammar[nonTerminal] = [`${commonPrefix}${newNonTerminal}`];

            // Agregar producciones que no comparten el prefijo común
            for (const production of productions) {
                if (!production.startsWith(commonPrefix)) {
                    newGrammar[nonTerminal].push(production);
                }
            }

            // Agregar las producciones restantes al nuevo no terminal
            newGrammar[newNonTerminal] = prefixes[commonPrefix].map((rest) => rest || "ε");
        } else {
            newGrammar[nonTerminal] = productions;
        }
    }

    return newGrammar;
}
