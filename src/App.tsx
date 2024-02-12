import { Grid, Paper, ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import useTheme, { ColorModeContext } from './hooks/useTheme';
import AppRoutes from './routes/AppRoutes';
function App() {
    const { colorMode, theme } = useTheme();
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Paper elevation={0} sx={{ height: '100%' }}>
                    <Router>
                        <Grid container direction="column" style={{ minHeight: '100vh' }}>
                            <Grid item>
                                <Header />
                            </Grid>
                            <Grid item xs>
                                <AppRoutes />
                            </Grid>
                            <Grid item>
                                <Footer />
                            </Grid>
                        </Grid>
                    </Router>
                </Paper>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
