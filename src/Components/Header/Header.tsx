import React from 'react';
import {Box, Tabs, Tab, AppBar, Typography} from "@mui/material";
import {Link} from 'react-router-dom';

//qwe
const Header = () => {
    return (
        <AppBar position="static">
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Link to="/main" style={{textDecoration: 'none', color: 'black'}}>
                    <Typography variant="h3">
                        PC Load
                    </Typography>
                </Link>
                <Tabs value={0} aria-label="basic tabs example">
                    <Link to="/main" style={{textDecoration: 'none', color: 'black'}}>
                        <Tab label="Главная"/>
                    </Link>
                    <Link to="/info" style={{textDecoration: 'none', color: 'black'}}>
                        <Tab label="Информация"/>
                    </Link>
                </Tabs>
            </Box>
        </AppBar>
    );
};
export default Header;