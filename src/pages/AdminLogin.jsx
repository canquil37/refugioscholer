import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for this specific page/feature as requested
const supabaseUrl = 'https://kdiebhgdnhbcyomezsob.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkaWViaGdkbmhiY3lvbWV6c29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNjk2NjAsImV4cCI6MjA3NTk0NTY2MH0.Jfs74adWQtz8LRRlR5FDVA8zSs3p8_i1xJvIrFtWDdY';

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      // Successful login
      if (data.user) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Correo o contraseña incorrectos, o usuario no autorizado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login Administrativo | Refugio Scholer</title>
        <meta name="robots" content="noindex, nofollow" />
        <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" crossOrigin="anonymous"></script>
      </Helmet>

      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex flex-col items-center text-center mb-8">
            <img 
              src="https://kdiebhgdnhbcyomezsob.supabase.co/storage/v1/object/public/MEDIA%20CLIENTES/REFUGIO%20SCHOLER/logo%20primero/ChatGPT%20Image%2026%20nov%202025,%2007_53_34%20p.m..png"
              alt="Logo Refugio Scholer"
              className="h-20 w-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-stone-800 leading-tight">
              Panel administrativo<br />Refugio Scholer
            </h1>
            <p className="text-stone-500 mt-2 text-sm">
              Acceso exclusivo para administración del alojamiento.
            </p>
          </div>

          <form id="admin-login-form" onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700" htmlFor="admin-email">
                Correo electrónico
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@refugioscholer.cl"
                className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700" htmlFor="admin-password">
                Contraseña
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-stone-800 hover:bg-stone-900 text-white font-semibold py-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </Button>
            
            {error && (
              <div id="login-error" className="text-red-500 text-sm text-center font-medium mt-2 animate-in fade-in slide-in-from-top-1 duration-300">
                {error}
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-stone-400 mb-6">
              Si olvidaste tu contraseña, contacta al administrador de Experts on Duty.
            </p>
            
            <Link 
              to="/" 
              className="inline-flex items-center justify-center text-sm text-stone-500 hover:text-green-700 font-medium transition-colors group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Volver al sitio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;