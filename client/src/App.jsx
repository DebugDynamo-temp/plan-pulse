import './index.scss';
import Landing from './pages/Landing';
import Register from './pages/Register';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      {
        //This is where we define all of our routes for this application
      }
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
