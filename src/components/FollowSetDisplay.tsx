type FollowSet = { [symbol: string]: Set<string> };

interface FollowSetDisplayProps {
    folloset: FollowSet;
}

const FirstSetDisplay: React.FC<FollowSetDisplayProps> = ({ folloset }) => {
    return (
        <div>
            <h2>Conjuntos SIGUIENTES de la Gramática</h2>
            <ul>
                {Object.entries(folloset).map(([nonTerminal, symbols]) => (
                    <li key={nonTerminal}>
                        SIGUIENTE({nonTerminal}) = {"{ "}
                        {Array.from(symbols).join(", ")}
                        {" }"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FirstSetDisplay;
