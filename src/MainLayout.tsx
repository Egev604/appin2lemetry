import { Grid } from '@mui/material';
import React from 'react';

import { useAuth } from './components/Authorization/AuthContext';
import Footer from './components/Footer';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';

const MainLayout = () => {
    const { isValidToken } = useAuth();
    return (
        <Grid container direction="column" style={{ minHeight: '100vh' }}>
            <Grid item>
                <Header isValidToken={isValidToken} />
            </Grid>
            <Grid item xs>
                <AppRoutes isValidToken={isValidToken} />
            </Grid>
            <Grid item>
                <Footer />
            </Grid>
        </Grid>
    );
};

export default MainLayout;
