export const validateGrammar = (content: string): boolean => {
    const lines = content.split("\n");
    const productionRegex = /^[A-Z]'*->(?!.*->).+$/;

    for (const line of lines) {
        if (!line.trim()) continue;
        if (!productionRegex.test(line.trim())) {
            return false;
        }
        const [left, right] = line.split("->");
        if (!left || !right) {
            return false;
        }
        const leftRegex = /^[A-Z]'*$/;
        if (!leftRegex.test(left.trim())) {
            return false;
        }
        const rightRegex = /^(?!.*->).+$/;
        if (!rightRegex.test(right.trim())) {
            return false;
        }
        if (right.includes("&") && right.trim() !== "&") {
            return false;
        }
    }

    return true;
};
