import React from 'react';
import {Container, Typography} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from 'react-router-dom';

const FooterContainer = styled('footer')(
    ({ theme }) => ({
            padding: theme.spacing(2),
            marginTop: 'auto',
    })
);
const Footer = () => {

    return (
        <FooterContainer>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    PC Load
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Mda
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                    {' © '}
                    <Link color="inherit" to="/main">
                        domoi
                    </Link>
                </Typography>
            </Container>
        </FooterContainer>
    );
};
export default Footer;