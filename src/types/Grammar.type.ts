export type Production = string;
export type Grammar = { [nonTerminal: string]: Production[] };


export type FirstSet = { [symbol: string]: Set<string> };

export type FollowSet = { [symbol: string]: Set<string> };


