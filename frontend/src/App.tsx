import React, {  } from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
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
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}


  
export default App;
