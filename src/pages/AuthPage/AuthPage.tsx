import React, {useState} from 'react';
import {Tabs, Tab, Grid} from '@mui/material';
import Login from "../../components/Authorization/Login";
import SignUp from "../../components/Authorization/SignUp";
import NightModeToggle from "../../components/NightModeToggle";

const AuthPage = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Grid container direction="column" style={{ minHeight: '100vh' }}>
            <Grid item>
                <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
                    <Tab label="Login" />
                    <Tab label="Sign Up" />
                </Tabs>
            </Grid>
            <Grid item xs>
                {tabIndex === 0 && <Login />}
                {tabIndex === 1 && <SignUp />}
            </Grid>
            <Grid item style={{ marginLeft: 'auto' }}>
                <NightModeToggle />
            </Grid>
        </Grid>
    );
};

export default AuthPage;