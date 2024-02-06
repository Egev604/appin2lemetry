import React from 'react';
import { createTheme } from '@mui/material';
import getDesignTokens from '../theme/ThemeSettings';
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
export default function useTheme() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return {
        theme,
        colorMode
    }
}