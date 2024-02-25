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
import React, { useState } from 'react';

import { signup } from '../../api/api';
import { useRouter } from '../../hooks/Router';
import { setToken } from './tokenUtils';

interface SignUpData {
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUp = () => {
    const [signUpData, setSignUpData] = useState<SignUpData>({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [passwordsMatchError, setPasswordsMatchError] = useState('');
    const router = useRouter();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpData((prevSignUpData) => ({
            ...prevSignUpData,
            [name]: value,
        }));
    };

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (signUpData.password !== signUpData.confirmPassword) {
            setPasswordsMatchError('Passwords do not match');
            return;
        }
        setPasswordsMatchError('');
        try {
            const { email, password } = signUpData;
            const response = await signup({ email, password });
            setToken(response);
            router.push('/');
        } catch (error) {
            console.error('Login error:', error);
        }
    };
    return (
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
            <Typography variant="h5" align="center" gutterBottom>
                Sign Up
            </Typography>
            <form onSubmit={handleSignUp}>
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    variant="outlined"
                    margin="normal"
                    value={signUpData.email}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={signUpData.password}
                        onChange={handleInputChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
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
                <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={signUpData.confirmPassword}
                        onChange={handleInputChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm Password"
                    />
                </FormControl>
                <FormControlLabel
                    control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />}
                    label="Remember me"
                />
                {passwordsMatchError && (
                    <Typography variant="body2" color="error" gutterBottom>
                        {passwordsMatchError}
                    </Typography>
                )}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign Up
                </Button>
            </form>
        </Container>
    );
};

export default SignUp;
