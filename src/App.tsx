import React from 'react';
import { createTheme, Paper, ThemeProvider } from '@mui/material';
import useTheme, { ColorModeContext } from './hooks/useTheme';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routs/AppRoutes';
function App() {
    const { colorMode, theme} = useTheme()
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Paper elevation={0} sx={{height: "100%"}}>
                    <Router>
                        <Header/>
                        <AppRoutes/>
                        <Footer/>
                    </Router>
                </Paper>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
