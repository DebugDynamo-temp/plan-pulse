import { UserProvider } from './components/User';
import './index.scss';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskDetailed from './pages/TaskDetailed';
import UserProfile from './pages/UserProfile';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './components/Theme';
import Kanban from './components/Kanban';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Dashboard />}>
            <Route index element={<Kanban />} />
            <Route path='task' element={<TaskDetailed />} />
            <Route path='user' element={<UserProfile />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
