import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/system';
import React from 'react';

import { ColorModeContext } from '../hooks/useTheme';
const NightModeToggle = () => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    return (
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
};

export default NightModeToggle;
