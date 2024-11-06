// firstSet.ts
type Production = string;
type Grammar = { [nonTerminal: string]: Production[] };
type FirstSet = { [symbol: string]: Set<string> };

export function calculateFirstSets(grammar: Grammar): FirstSet {
    const firstSets: FirstSet = {};

    // Inicializar conjuntos PRIMERO vacíos para cada símbolo no terminal
    for (const nonTerminal in grammar) {
        firstSets[nonTerminal] = new Set();
    }

    // Función para dividir la producción en símbolos completos (usando una expresión regular)
    const splitProduction = (production: string): string[] => {
        return production.match(/[A-Z]'*|./g) || [];
    };

    // Función para calcular PRIMERO de un símbolo
    const getFirst = (symbol: string): Set<string> => {
        // Regla 1: Si el símbolo es terminal, PRIMERO(X) es {X}
        if (!grammar[symbol]) {
            return new Set([symbol]);
        }

        // Regla 2 y 3: Si el símbolo es no terminal
        const first = firstSets[symbol];
        for (const production of grammar[symbol]) {
            let containsEpsilon = true;
            const symbols = splitProduction(production); // Obtener símbolos completos en la producción
            for (const prodSymbol of symbols) {
                console.log(prodSymbol);
                const firstOfProdSymbol = getFirst(prodSymbol);

                // Agregar todos los elementos de PRIMERO(Y_i) a PRIMERO(X), excepto &
                firstOfProdSymbol.forEach((element) => {
                    if (element !== "&") {
                        first.add(element);
                    }
                });

                // Si no hay épsilon en PRIMERO(Y_i), dejar de buscar en esta producción
                if (!firstOfProdSymbol.has("&")) {
                    containsEpsilon = false;
                    break;
                }
            }

            // Si todos los Y_i en la producción contienen épsilon, añadir épsilon a PRIMERO(X)
            if (containsEpsilon) {
                first.add("&");
            }
        }

        return first;
    };

    // Calcular PRIMERO para cada símbolo no terminal
    for (const nonTerminal in grammar) {
        getFirst(nonTerminal);
    }

    return firstSets;
}
