import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, pink } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: blue, 
    secondary: pink 
  },
  typography: {
    fontFamily: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif']
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
