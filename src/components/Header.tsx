import React, {useState} from 'react';
import {Box, Tabs, Tab, AppBar, Typography, IconButton} from "@mui/material";
import {Link} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from "./Menu";
import {IUser} from "../models/User";
//qwe
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <AppBar position="static">
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h3">
                    PC Load
                </Typography>
                <Tabs aria-label="basic tabs example" style={{margin: 10}}>
                    <Link to="/main" style={{textDecoration: 'none', color: 'black'}}>
                        <Tab label="Home"/>
                    </Link>
                    <Link to="/info" style={{textDecoration: 'none', color: 'black'}}>
                        <Tab label="Information"/>
                    </Link>
                    {currentUser ? (<IconButton onClick={toggleMenu} size="large" edge="end" color="inherit">
                        <AccountCircleIcon/>
                    </IconButton>) : (
                        <>
                            <Link to="/login" style={{textDecoration: 'none', color: 'black'}}>
                                <Tab label="Login"/>
                            </Link>
                            <Link to="/register" style={{textDecoration: 'none', color: 'black'}}>
                                <Tab label="Sign Up"/>
                            </Link>
                        </>
                    )}
                    <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}/>
                </Tabs>
            </Box>
        </AppBar>
    );
};
export default Header;