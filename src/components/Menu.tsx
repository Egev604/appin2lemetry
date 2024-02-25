import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Divider, Drawer, IconButton, List, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';

import { useRouter } from '../hooks/Router';
import { removeToken } from './Authorization/tokenUtils';
import NightModeToggle from './NightModeToggle';

interface MenuProps {
    isMenuOpen?: boolean;
    toggleMenu: () => void;
}

const drawerWidth = 300;

const Menu: React.FC<MenuProps> = ({ isMenuOpen = false, toggleMenu }) => {
    const router = useRouter();

    const handleClickProfile = () => {
        router.push('/userProfile');
        toggleMenu();
    };

    function handleClickSingOut() {
        removeToken();
        router.push('/');
    }

    return (
        <Drawer
            anchor="right"
            open={isMenuOpen}
            onClose={toggleMenu}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                },
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px',
                }}
            >
                <Avatar>
                    <AccountCircleIcon />
                </Avatar>
                <IconButton onClick={toggleMenu}>
                    <CloseIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItemButton onClick={handleClickProfile}>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemText primary="Settings" />
                </ListItemButton>
            </List>
            <Divider />
            <List>
                <ListItemButton onClick={handleClickSingOut}>
                    <ListItemText primary="Sign out" />
                </ListItemButton>
            </List>
            <Divider />
            <div style={{ marginTop: 'auto', marginLeft: 'auto', padding: 15 }}>
                <NightModeToggle />
            </div>
        </Drawer>
    );
};

export default Menu;
