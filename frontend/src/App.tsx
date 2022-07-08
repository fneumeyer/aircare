import React, {  } from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { BottomNavigation, BottomNavigationAction, Box, Container, Grid, Paper, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Routing } from './Routing';
import { PrimaryAppBar } from './PrimaryAppBar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { theme } from './theme';

function App() {
  const [value, setValue] = React.useState(0);

  return <>
    <CssBaseline />
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Box sx={{height: '100%', backgroundColor: theme.palette.grey[100]}}>
          <Grid container sx={{height: '100%'}} direction="column">
            <Grid item xs="auto">
              <PrimaryAppBar />
            </Grid>
            <Grid item xs sx={{overflow: 'hidden'}}>
              <Container sx={{height: '100%'}}>
                <BrowserRouter>
                  <Routing />
                </BrowserRouter>
              </Container>
            </Grid>
          </Grid>
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                <BottomNavigationAction label="Notifications" icon={<NotificationsIcon />} />
              </BottomNavigation>
            </Paper>
        </Box>
      </ThemeProvider>
    </RecoilRoot>
  </>;
}


  
export default App;
