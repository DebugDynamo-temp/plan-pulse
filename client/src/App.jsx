import { UserProvider } from './contexts/User';
import './index.scss';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import TaskDetailed from './pages/TaskDetailed';
import UserProfile from './pages/UserProfile';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './contexts/Theme';
import Kanban from './components/Kanban';
import Error from './pages/Error';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Dashboard />}>
            <Route index element={<Kanban />} />
            <Route path='task/:id' element={<TaskDetailed />} />
            <Route path='user' element={<UserProfile />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path='/not-authed' element={<Error msg={"Something went wrong."} />} />
          <Route path="*" element={<Error msg="404 Page not found." />} />
        </Routes>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App;
