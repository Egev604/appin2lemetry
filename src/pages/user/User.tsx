import { Box, Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';

import { IUser } from '../../models/User';

const user: IUser = {
    id: 1,
    userName: 'john_doe',
    email: 'john.doe@example.com',
};
const User = () => {
    const [currentUser] = useState<IUser | undefined>(user);

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
                    <Typography variant="h4">{currentUser?.userName}</Typography>
                </Grid>
                <Grid item sm={8} xs={12}>
                    <Box sx={{ width: '100%', mb: 3, mt: { sm: 3, xs: 0 } }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={0} aria-label="basic tabs example">
                                <Tab label="tab one" />
                                <Tab label="tab two" />
                            </Tabs>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default User;
