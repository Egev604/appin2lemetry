import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, IconButton, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Menu from './Menu';
interface HeaderProps {
    isValidToken: boolean;
}
const Header: React.FC<HeaderProps> = ({ isValidToken }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <AppBar position="static">
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h3">PC Load</Typography>
                <Tabs value={0} aria-label="basic tabs example" style={{ margin: 10 }}>
                    <Link to="/main" style={{ textDecoration: 'none', color: 'black' }}>
                        <Tab label="Home" />
                    </Link>
                    <Link to="/info" style={{ textDecoration: 'none', color: 'black' }}>
                        <Tab label="Information" />
                    </Link>
                    {isValidToken ? (
                        <IconButton onClick={toggleMenu} size="large" edge="end" color="inherit" sx={{ mr: 2, ml: 2 }}>
                            <AccountCircleIcon />
                        </IconButton>
                    ) : (
                        <>
                            <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                                <Tab label="Login" />
                            </Link>
                            <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>
                                <Tab label="Sign Up" />
                            </Link>
                        </>
                    )}
                    <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
                </Tabs>
            </Box>
        </AppBar>
    );
};
export default Header;
