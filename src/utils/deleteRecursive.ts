// eliminarRecursividadIzquierda.ts
export type Produccion = string[];
export type Gramatica = { [noTerminal: string]: Produccion };

export function eliminarRecursividadIzquierda(gramatica: Gramatica): Gramatica {
    const nuevaGramatica: Gramatica = {};

    for (const noTerminal in gramatica) {
        const producciones = gramatica[noTerminal];
        const recursivas: Produccion = [];
        const noRecursivas: Produccion = [];

        for (const produccion of producciones) {
            if (produccion.startsWith(noTerminal)) {
                recursivas.push(produccion.slice(noTerminal.length));
            } else {
                noRecursivas.push(produccion);
            }
        }

        if (recursivas.length > 0) {
            const nuevoNoTerminal = `${noTerminal}'`;
            nuevaGramatica[noTerminal] = noRecursivas.map(prod => prod + nuevoNoTerminal);
            nuevaGramatica[nuevoNoTerminal] = recursivas.map(prod => prod + nuevoNoTerminal);
            nuevaGramatica[nuevoNoTerminal].push("&"); // Agregamos la producción ε
        } else {
            nuevaGramatica[noTerminal] = producciones;
        }
    }

    return nuevaGramatica;
}
