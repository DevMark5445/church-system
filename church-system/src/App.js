import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust path
import Login from './pages/Login'; // Adjust path
import Home from './pages/Home'; // Adjust path
// Import other components as needed

function AppLayout() {
  const location = useLocation();
  const showNavbar = location.pathname === '/'; // Show only on home

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Add other routes */}
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}