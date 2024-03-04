import { Box, Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { requestUserByTokens } from '../../api/api';
import { getToken } from '../../components/Authorization/tokenUtils';
import { IUser } from '../../models/User';

const User = () => {
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
    const [currentTab, setCurrentTab] = useState<number>(0);
    useEffect(() => {
        const getUser = async () => {
            const tokens = getToken();
            if (!tokens) return false;
            const response = await requestUserByTokens(tokens);
            console.log(response);
            setCurrentUser(response.user);
        };
        getUser();
    }, []);
    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };
    return (
        <Container sx={{ minHeight: '900px' }}>
            <Grid container>
                <Grid item xs={2}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <img
                            src="https://img.freepik.com/free-photo/adorable-looking-kitten-with-yarn_23-2150886292.jpg"
                            style={{
                                borderRadius: '50%',
                                width: '150px',
                                height: '200px',
                                marginTop: '20px',
                                marginBottom: '10px',
                            }}
                            alt="profilePage"
                        />
                    </Box>
                    <Typography variant="h4" textAlign="center">
                        {currentUser?.firstName}
                    </Typography>
                </Grid>
                <Grid item sm={8} xs={12}>
                    <Box sx={{ width: '100%', mb: 3, mt: { sm: 3, xs: 0 } }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={currentTab} onChange={handleChangeTab} aria-label="basic tabs example">
                                <Tab label="Personal Data" />
                                <Tab label="Settings" />
                            </Tabs>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default User;
