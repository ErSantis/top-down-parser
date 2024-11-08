// ParsingTableDisplay.tsx
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from "@mui/material";

type ParsingTableProps = {
    parsingTable: { [nonTerminal: string]: { [terminal: string]: string } };
    terminals: string[]; // Lista ordenada de terminales
};

const ParsingTableDisplay: React.FC<ParsingTableProps> = ({ parsingTable, terminals }) => {
    const nonTerminals = Object.keys(parsingTable);

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                Tabla M
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: 800, overflowX: 'auto' }}>
                <Table sx={{ tableLayout: 'auto', width: '800px' }} aria-label="tabla de análisis">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontFamily: 'Courier New', fontSize: '20px' }}>
                                Non-terminal
                            </TableCell>
                            {terminals.map((terminal) => (
                                <TableCell
                                    key={terminal}
                                    align="center"
                                    sx={{ fontFamily: 'Courier New', fontSize: '20px' }}
                                >
                                    {terminal}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {nonTerminals.map((nonTerminal) => (
                            <TableRow key={nonTerminal}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{ fontFamily: 'Courier New', fontSize: '20px', whiteSpace: 'nowrap', }}
                                >
                                    {nonTerminal}
                                </TableCell>
                                {terminals.map((terminal) => (
                                    <TableCell
                                        key={terminal}
                                        align="center"
                                        sx={{ fontFamily: 'Courier New', fontSize: '20px', whiteSpace: 'nowrap', }}
                                    >
                                        {parsingTable[nonTerminal][terminal] || ""}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    );
};

export default ParsingTableDisplay;
