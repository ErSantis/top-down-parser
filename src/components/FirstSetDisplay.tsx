// FirstSetDisplay.tsx
import { FirstSet } from "../types/Grammar.type";

interface FirstSetDisplayProps {
    firstSet: FirstSet;
}
const FirstSetDisplay: React.FC<FirstSetDisplayProps> = ({ firstSet }) => {
    return (
        <div className="card">
            <h2>PRIMEROS</h2>
            <ul>
                {Object.entries(firstSet).map(([nonTerminal, symbols]) => (
                    <li key={nonTerminal}>
                        PRIMERO({nonTerminal}) = {"{ "}
                        {Array.from(symbols).join(", ")}
                        {" }"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FirstSetDisplay;
