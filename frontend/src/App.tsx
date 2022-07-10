import React, {  } from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { BottomNavigation, BottomNavigationAction, Box, Container, Grid, Paper, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Routing } from './Routing';
import { PrimaryAppBar } from './PrimaryAppBar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { theme } from './theme';
import { BottomNavigationBar } from './BottomNavigationBar';

function App() {
  return <>
    <CssBaseline />
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Box sx={{height: '100%', backgroundColor: theme.palette.grey[100]}}>
            <Grid container sx={{height: '100%'}} direction="column">
              <Grid item xs="auto">
                <PrimaryAppBar />
              </Grid>
              <Grid item xs>
                <Container sx={{height: '100%'}}>
                  <Routing />
                </Container>
              </Grid>
              <Grid item xs="auto">
                <BottomNavigationBar/>
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  </>;
}


  
export default App;
