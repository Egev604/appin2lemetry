import React from 'react'
import { Container, Typography } from '@mui/material'
import { styled } from '@mui/system'

const FooterContainer = styled('footer')(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: 'auto',
}))
const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          PC Load
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          {'appin2lemetry '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </FooterContainer>
  )
}
export default Footer
