import { UserProvider } from './contexts/User';
import './index.scss';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './contexts/Theme';
import { TaskProvider } from './contexts/TaskContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <TaskProvider>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </TaskProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
