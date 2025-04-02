import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Doctores from './views/Doctores';
import Doctor from './views/Doctor';
import { Login } from './views/Login';
import { AdminPanel } from './views/AdminPanel';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/doctores" element={<Doctores />} />
              <Route path="/doctor" element={<Doctor />} />
            </Route>

            <Route element={<ProtectedRoute rolRequerido="admin" />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
