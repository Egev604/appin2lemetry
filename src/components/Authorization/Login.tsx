import React, { useState } from 'react'
import {
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
interface LoginData {
  email: string
  password: string
}
const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }))
  }

  const handleLogin = () => {
    console.log('login')
  }
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
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
                    event.preventDefault()
                  }
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
          control={
            <Checkbox
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
          }
          label="Remember me"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  )
}

export default Login
