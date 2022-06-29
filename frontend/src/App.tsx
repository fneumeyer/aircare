import React, {  } from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { BottomNavigation, BottomNavigationAction, Box, Container, Grid, ThemeProvider } from '@mui/material';
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
            <Grid item xs>
              <Container sx={{height: '100%'}}>
                <BrowserRouter>
                  <Routing />
                </BrowserRouter>
              </Container>
            </Grid>
            <Grid item xs="auto">
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
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </RecoilRoot>
  </>;
}


  
export default App;
