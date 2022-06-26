import React, {  } from 'react';
import './App.css';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Routing } from './Routing';
import { PrimaryAppBar } from './PrimaryAppBar';


const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <PrimaryAppBar />
        <Container maxWidth="md">
          <BrowserRouter>
            <Routing />
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </RecoilRoot>
  );
}


  
export default App;
