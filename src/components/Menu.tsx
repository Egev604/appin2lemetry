import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Divider, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';

import NightModeToggle from './NightModeToggle';

interface MenuProps {
    isMenuOpen?: boolean;
    toggleMenu: () => void;
}

const drawerWidth = 300;
const Menu: React.FC<MenuProps> = ({ isMenuOpen = false, toggleMenu }) => {
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
                <ListItem button>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemText primary="Sign out" />
                </ListItem>
            </List>
            <Divider />
            <div style={{ marginTop: 'auto', marginLeft: 'auto', padding: 15 }}>
                <NightModeToggle />
            </div>
        </Drawer>
    );
};

export default Menu;
