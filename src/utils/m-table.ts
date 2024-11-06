import { FirstSet, FollowSet, Grammar } from "../types/Grammar.type";

type ParsingTable = { [nonTerminal: string]: { [terminal: string]: string } };

export function constructParsingTable(
    grammar: Grammar,
    firstSets: FirstSet,
    followSets: FollowSet
): ParsingTable {
    const table: ParsingTable = {};

    // Inicializar la tabla con errores
    for (const nonTerminal in grammar) {
        table[nonTerminal] = {};
        const terminals = new Set<string>();

        // Obtener todos los terminales posibles de PRIMERO y SIGUIENTE
        for (const production of grammar[nonTerminal]) {
            const symbols = production.match(/[A-Z]'*|./g) || [];
            symbols.forEach((symbol) => {
                if (!grammar[symbol]) terminals.add(symbol);
            });
        }

        // Añadir terminales de SIGUIENTE(nonTerminal) y PRIMERO(producciones) a la tabla
        followSets[nonTerminal].forEach((symbol) => terminals.add(symbol));
        firstSets[nonTerminal].forEach((symbol) => terminals.add(symbol));

        // Inicializa cada terminal en la fila con un mensaje de error
        terminals.forEach((terminal) => {
            table[nonTerminal][terminal] = "";
        });
    }

    // Llenar la tabla M usando el método descrito
    for (const [nonTerminal, productions] of Object.entries(grammar)) {
        for (const production of productions) {
            const firstOfProduction = calculateFirstOfString(production, firstSets);

            // Paso 2: Para cada terminal `a` en `PRIMERO(α)`, añade A -> α a `M[A, a]`
            for (const terminal of firstOfProduction) {
                if (terminal !== "&") {
                    table[nonTerminal][terminal] = `${nonTerminal} -> ${production}`;
                }
            }

            // Paso 3: Si `ε` está en `PRIMERO(α)`, añade A -> α a `M[A, b]` para cada `b` en `SIGUIENTE(A)`
            if (firstOfProduction.has("&")) {
                for (const followTerminal of followSets[nonTerminal]) {
                    table[nonTerminal][followTerminal] = `${nonTerminal} -> ${production}`;
                }
            }
        }
    }

    return table;
}

// Función auxiliar para calcular PRIMERO de una cadena de símbolos (α en las reglas)
function calculateFirstOfString(production: string, firstSets: FirstSet): Set<string> {
    const result = new Set<string>();
    const symbols = production.match(/[A-Z]'*|./g) || [];

    for (const symbol of symbols) {
        const firstOfSymbol = firstSets[symbol] || new Set([symbol]);

        firstOfSymbol.forEach((item) => {
            result.add(item);
        });

        // Si `PRIMERO(symbol)` no contiene `ε`, deja de agregar más
        if (!firstOfSymbol.has("&")) break;

        // Si es el último símbolo y contiene `ε`, añade `ε` a `PRIMERO(α)`
        if (symbol === symbols[symbols.length - 1]) {
            result.add("&");
        }
    }

    return result;
}
