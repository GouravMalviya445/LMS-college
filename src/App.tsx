import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/dashboard';
import About from './pages/about';
import { Login, Signup } from './pages/auth';
import VerifyOtp from './pages/otp/VerifyOtp';
import { NotFound } from './pages/not-found/NotFound';

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/auth/login" />} />
          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path='user/verify' element={<VerifyOtp/>} />
          <Route path="dashboard" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}