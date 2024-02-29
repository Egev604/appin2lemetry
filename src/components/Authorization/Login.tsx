import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';

import { login } from '../../api/api';
import { useRouter } from '../../hooks/Router';
import { AuthContext } from './AuthContext';
import { setToken } from './tokenUtils';
interface LoginData {
    email: string;
    password: string;
}
const Login = () => {
    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: '',
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const { setIsValidToken } = useContext(AuthContext);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prevLoginData) => ({
            ...prevLoginData,
            [name]: value,
        }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await login(loginData);
            setToken(response.token);
            router.push('/main');
            setIsValidToken(true);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
            <Typography variant="h5" align="center" gutterBottom>
                Log in
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                Please log in to use platform
            </Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    fullWidth
                    label="Email/Login"
                    name="email"
                    variant="outlined"
                    margin="normal"
                    value={loginData.email}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={loginData.password}
                        onChange={handleInputChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword((show) => !show)}
                                    onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <FormControlLabel
                    control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />}
                    label="Remember me"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default Login;
