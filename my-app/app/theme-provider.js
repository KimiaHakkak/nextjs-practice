"use client"

import React, { useMemo, useState, useEffect, createContext } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ColorModeProvider( {children} ){

    const [mode, setMode] = useState("light");

    const colorMode = useMemo(
    () => ({
        toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
        },
    }),
    []
    );
    
    // Create theme based on mode
    const theme = useMemo(
        () =>
        createTheme({
            palette: {
            mode,
            ...(mode === "light"
                ? {
                    background: {
                    default: "#f0f4ff",
                    paper: "rgba(255,255,255,0.8)",
                    },
                }
                : {
                    background: {
                    default: "#0b1120",
                    paper: "rgba(255,255,255,0.1)",
                    },
                }),
            },
        }),
        [mode]
    );
    
        useEffect(() => {
        document.body.dataset.theme = mode;
        }, [mode]);
    return(
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                    {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}