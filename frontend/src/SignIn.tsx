import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import client from './feathers';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthResult, useAuth } from './Authentication/useAuth';
import { AuthState } from './atoms/auth';
import { userAtom } from "./atoms/user";
import { useRecoilState } from 'recoil';
import { Copyright } from './Copyright';
import { Alert, Collapse } from '@mui/material';



export interface LocationState {
  from?: {
    pathname?: string;
  };
}

export default function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  
  const [user, setUser] = useRecoilState(userAtom)

  const [errorText, setErrorText] = useState<string>('');
  const [openError, setOpenError] = useState<boolean>(false);

  const {authState, setAuthenticated} = useAuth()
  const location = useLocation()
  const from = useMemo(
    () => (location.state as LocationState)?.from?.pathname || '/', 
    [location.state]
  )

  const navigate = useNavigate()

  useEffect(() => {
    if(authState.authenticated && from !== '/login')
      navigate(from, {replace: true})
  }, [authState.authenticated, from, navigate])
  
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login()
      .then((response : AuthResult) => {
        if(response.user) {
          setUser(response.user); // TODO: improve sign in process
        }
        setAuthenticated(true)
        navigate(from, {replace: true})
      })
      .catch(e => {
        console.log(e);
        if(e !== undefined && e.message) {
          setErrorText(e.message);
        }else {
          setErrorText(e);
        }
        setOpenError(true);
      })
  };

  const login = async () => {
    try {
      // First try to log in with an existing JWT
      return await client.reAuthenticate();
    } catch (error) {
      // If that errors, log in with email/password
      // Here we would normally show a login page
      // to get the login information
      return await client.authenticate({
        strategy: 'local',
        email,
        password
      });
    }
  };

  const handleErrorClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenError(false)
}

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link color="inherit" to="/login">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link color="inherit" to="/signup">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Collapse in={openError}>
            <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%', marginTop: "10px"}}>
                {errorText}
            </Alert>
        </Collapse>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}