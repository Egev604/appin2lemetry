import { Box, Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { getDataTest } from '../../api/api';
import { IUser } from '../../models/User';

const user: IUser = {
    id: 1,
    userName: 'john_doe',
    email: 'john.doe@example.com',
};
const User = () => {
    const [currentUser] = useState<IUser | undefined>(user);
    const [testData, setTestData] = useState('');
    useEffect(() => {
        const getData = async () => {
            const data = await getDataTest();
            setTestData(data.data);
        };

        getData();
    }, []);
    return (
        <Container sx={{ minHeight: '900px' }}>
            <Grid container>
                <Grid item xs={2}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <img
                            src="https://img.freepik.com/free-photo/adorable-looking-kitten-with-yarn_23-2150886292.jpg"
                            style={{ borderRadius: '50%', width: '150px', height: '200px' }}
                            alt="profilePage"
                        />
                    </Box>
                    <Typography variant="h4">{currentUser?.userName}</Typography>
                    <Typography variant="h6">{testData}</Typography>
                </Grid>
                <Grid item sm={8} xs={12}>
                    <Box sx={{ width: '100%', mb: 3, mt: { sm: 3, xs: 0 } }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={0}>
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
