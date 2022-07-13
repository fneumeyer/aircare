import { Alert, Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "./atoms/user";
import { useAuth } from "./Authentication/useAuth";
import { Copyright } from "./Copyright";
import client from "./feathers";
import { IUser } from "backend/src/models/users.model";


type Props = {

}

export function SignUp(prop: Props) {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')

    const [user, setUser] = useRecoilState(userAtom);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorText, setErrorText] = useState<string>('');
    const navigate = useNavigate()

    const {authState, setAuthenticated} = useAuth()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        console.log("here")
        if(firstname.length > 0 && lastname.length > 0 && email.length > 0 && password.length > 0) {
            // TODO: email validation
            try {
                const userInfo = {firstName: firstname, lastName: lastname, email: email, password: password}
                console.log("send request")
                const response : IUser | IUser[] = await client.service('users').create(userInfo)
                //console.log(response);
                setOpenSuccess(true);
               
                console.log(typeof(response))
                console.log(Array.isArray(response))
                if(!Array.isArray(response)) {
                    setUser(response)
                }else {
                    setUser(response[0]);
                }
                setAuthenticated(true);
                navigate("/");
            }catch(error:any) {
                console.log(error);
                if(error !== undefined && error.message) {
                    setErrorText(`${error.message}`);
                }else{
                    setErrorText(error);
                }
                setOpenError(true);
            }
        }else{
            setErrorText("Please fill in all required textfields");
            setOpenError(true);
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false)
    }
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="First name"
              name="firstname"
              autoComplete="firstname"
              autoFocus
              value={firstname}
              onChange={e => setFirstname(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Last name"
              name="lastname"
              autoComplete="lastname"
              autoFocus
              value={lastname}
              onChange={e => setLastname(e.target.value)}
            />
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs textAlign={"center"}>
                <Link color="inherit" to="/login">
                  Already have an account? Sign In
                </Link>
              </Grid>
              
            </Grid>
          </Box>
          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Account has been successfully created!
            </Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openError} autoHideDuration={6000} onClose={handleErrorClose}>
            <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                {errorText}
            </Alert>
        </Snackbar>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      
      </Container>
    );
}

/**
 <Grid item>
                <Link color="inherit" to="/signup">
                  {"Don't have an account? Sign up here"}
                </Link>
              </Grid>
 */