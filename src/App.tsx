import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard  from './pages/Dashboard';

function ProtectedLayout() {
  const navigate = useNavigate();
  if (!localStorage.getItem('token')) 
    return <Navigate to="/login" replace />;

  const logout = () => {

    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <header className="flex items-center justify-between border-b bg-white px-6 py-3">
        <span className="font-bold">Nombre de la App</span>
        <button onClick={logout} className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700">
          Cerrar sesión
        </button>
      </header>
      <main className="mx-auto max-w-4xl p-6">
        <Outlet />
      </main>
    </> );
}

export default function App() {
  return (
    <BrowserRouter>

      <Routes>
        
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<p className="mt-16 text-center text-xl">404 - Página no encontrada</p>} />
      </Routes>
    </BrowserRouter>
  );
}
