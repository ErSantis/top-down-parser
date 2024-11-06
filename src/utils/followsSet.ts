import { FirstSet, FollowSet, Grammar } from "../types/Grammar.type";

export function calculateFollowSets(
    grammar: Grammar,
    firstSets: FirstSet,
    startSymbol: string
): FollowSet {
    const followSets: FollowSet = {};

    // Inicializa el conjunto SIGUIENTE de cada no terminal vacío
    for (const nonTerminal in grammar) {
        followSets[nonTerminal] = new Set();
    }

    // Añadir '$' al conjunto SIGUIENTE del símbolo inicial
    followSets[startSymbol].add('$');

    // Función recursiva para calcular SIGUIENTE de un no terminal
    function _follow(nonTerminal: string, visited: Set<string> = new Set()): Set<string> {
        // Evita llamadas recursivas infinitas usando el conjunto 'visited'
        visited.add(nonTerminal);

        const follow = followSets[nonTerminal];

        for (const [header, productions] of Object.entries(grammar)) {
            for (const production of productions) {
                const symbols = production.match(/[A-Z]'*|./g) || []; // Obtener símbolos completos en la producción

                for (let i = 0; i < symbols.length; i++) {
                    if (symbols[i] === nonTerminal) {
                        const beta = symbols.slice(i + 1); // β después de B en A -> αBβ

                        if (beta.length === 0) {
                            // Regla: A -> αB (B está al final de la producción)
                            if (header !== nonTerminal && !visited.has(header)) {
                                const headerFollow = _follow(header, visited);
                                headerFollow.forEach((item) => follow.add(item));
                            }
                        } else {
                            // Regla: A -> αBβ (hay símbolos después de B)
                            const firstOfBeta = calculateFirstOfString(beta, firstSets);

                            // Añadir PRIMERO(β) - {ε} a SIGUIENTE(B)
                            firstOfBeta.forEach((item) => {
                                if (item !== "&") {
                                    follow.add(item);
                                }
                            });

                            // Si PRIMERO(β) contiene ε, añade SIGUIENTE(A) a SIGUIENTE(B)
                            if (firstOfBeta.has("&") && header !== nonTerminal && !visited.has(header)) {
                                const headerFollow = _follow(header, visited);
                                headerFollow.forEach((item) => follow.add(item));
                            }
                        }
                    }
                }
            }
        }

        return follow;
    }

    // Calcular SIGUIENTE para cada no terminal
    for (const nonTerminal in grammar) {
        _follow(nonTerminal);
    }

    return followSets;
}

// Función auxiliar para calcular PRIMERO de una cadena de símbolos (β en las reglas)
function calculateFirstOfString(symbols: string[], firstSets: FirstSet): Set<string> {
    const result = new Set<string>();

    for (const symbol of symbols) {
        const firstOfSymbol = firstSets[symbol] || new Set([symbol]); // PRIMERO del símbolo o el mismo si es terminal
        firstOfSymbol.forEach((item) => result.add(item));

        // Si PRIMERO(symbol) no contiene ε, detiene la búsqueda
        if (!firstOfSymbol.has("&")) break;

        // Si es el último símbolo y contiene ε, añadir ε a PRIMERO(β)
        if (symbol === symbols[symbols.length - 1]) {
            result.add("&");
        }
    }

    return result;
}
