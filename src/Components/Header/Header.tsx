import React from 'react';
import {Box, Tabs, Tab, AppBar} from "@mui/material";

const Header = () => {
    return (
        <AppBar position="static">
        <Box sx={{ width: '100%', display: 'flex', justifyContent:'space-between', alignItems: 'center' }}>
            <h1>PC Load</h1>
                <Tabs aria-label="basic tabs example">
                    <Tab label="Item One"  />
                    <Tab label="Item Two" />
                    <Tab label="Item Three"  />
                </Tabs>
        </Box>
        </AppBar>
    );
};
export default Header;