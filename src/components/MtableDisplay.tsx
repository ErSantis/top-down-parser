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
            <Typography variant="h5" gutterBottom>
                Tabla M (Tabla de Análisis)
            </Typography>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="tabla de análisis">
                    <TableHead>
                        <TableRow>
                            <TableCell>Non-terminal</TableCell>
                            {terminals.map((terminal) => (
                                <TableCell key={terminal} align="center">
                                    {terminal}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {nonTerminals.map((nonTerminal) => (
                            <TableRow key={nonTerminal}>
                                <TableCell component="th" scope="row">
                                    {nonTerminal}
                                </TableCell>
                                {terminals.map((terminal) => (
                                    <TableCell key={terminal} align="center">
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
