//FollowSetDisplay.tsx
import { FollowSet } from "../types/Grammar.type";

interface FollowSetDisplayProps {
    followSet: FollowSet;
}
const FirstSetDisplay: React.FC<FollowSetDisplayProps> = ({ followSet }) => {
    return (
        <div className="card">
            <h2>SIGUIENTES</h2>
            <ul>
                {Object.entries(followSet).map(([nonTerminal, symbols]) => (
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
