import { Paper, ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './components/Authorization/AuthContext';
import useTheme, { ColorModeContext } from './hooks/useTheme';
import MainLayout from './MainLayout';
function App() {
    const { colorMode, theme } = useTheme();
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Paper elevation={0} sx={{ height: '100%' }}>
                    <Router>
                        <AuthProvider>
                            <MainLayout />
                        </AuthProvider>
                    </Router>
                </Paper>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
