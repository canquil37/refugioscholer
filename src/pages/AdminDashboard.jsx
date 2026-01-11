import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LogOut, 
  LayoutDashboard, 
  CalendarRange, 
  BedDouble, 
  Users,
  Home,
  Loader2
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://kdiebhgdnhbcyomezsob.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkaWViaGdkbmhiY3lvbWV6c29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNjk2NjAsImV4cCI6MjA3NTk0NTY2MH0.Jfs74adWQtz8LRRlR5FDVA8zSs3p8_i1xJvIrFtWDdY';
const CLIENTE_APP_ID = '0eb88d8d-5b64-47c2-8720-95813678d7d5';

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState({
    activeAlojamientos: 0,
    futureReservas: 0,
    monthReservas: 0
  });
  
  const [reservas, setReservas] = useState([]);
  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (!session) {
        navigate('/admin');
        return;
      }
      setUser(session.user);
      await loadDashboardData();
      setLoading(false);
    };

    checkSession();
  }, [navigate]);

  const loadDashboardData = async () => {
    await Promise.all([
      cargarResumen(),
      cargarReservasProximas(),
      cargarAlojamientos()
    ]);
  };

  const cargarResumen = async () => {
    const today = new Date().toISOString().split('T')[0];
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

    try {
      // Alojamientos activos
      const { count: countAlojamientos } = await supabaseClient
        .from('alojamientos')
        .select('*', { count: 'exact', head: true })
        .eq('cliente_app_id', CLIENTE_APP_ID)
        .eq('activo', true);

      // Reservas futuras
      const { count: countFuture } = await supabaseClient
        .from('vw_reservas_detalle')
        .select('*', { count: 'exact', head: true })
        .eq('cliente_app_id', CLIENTE_APP_ID)
        .gte('fecha_entrada', today);

      // Reservas este mes
      const { count: countMonth } = await supabaseClient
        .from('vw_reservas_detalle')
        .select('*', { count: 'exact', head: true })
        .eq('cliente_app_id', CLIENTE_APP_ID)
        .gte('fecha_entrada', firstDayOfMonth);

      setStats({
        activeAlojamientos: countAlojamientos || 0,
        futureReservas: countFuture || 0,
        monthReservas: countMonth || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const cargarReservasProximas = async () => {
    const today = new Date().toISOString().split('T')[0];
    
    try {
      const { data, error } = await supabaseClient
        .from('vw_reservas_detalle')
        .select('*')
        .eq('cliente_app_id', CLIENTE_APP_ID)
        .gte('fecha_entrada', today)
        .order('fecha_entrada', { ascending: true })
        .limit(10);

      if (error) throw error;
      setReservas(data || []);
    } catch (error) {
      console.error('Error loading reservations:', error);
    }
  };

  const cargarAlojamientos = async () => {
    try {
      const { data, error } = await supabaseClient
        .from('alojamientos')
        .select('*')
        .eq('cliente_app_id', CLIENTE_APP_ID)
        .order('nombre_alojamiento', { ascending: true });

      if (error) throw error;
      setAlojamientos(data || []);
    } catch (error) {
      console.error('Error loading accommodations:', error);
    }
  };

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    navigate('/admin');
  };

  const calculateNights = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'short' }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Panel Administrativo | Refugio Scholer</title>
        <meta name="robots" content="noindex, nofollow" />
        <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" crossOrigin="anonymous"></script>
      </Helmet>

      <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
        {/* Header */}
        <header className="bg-white border-b border-stone-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <img 
                  src="https://kdiebhgdnhbcyomezsob.supabase.co/storage/v1/object/public/MEDIA%20CLIENTES/REFUGIO%20SCHOLER/logo%20primero/ChatGPT%20Image%2026%20nov%202025,%2007_53_34%20p.m..png"
                  alt="Logo" 
                  className="h-10 w-auto"
                />
                <div className="hidden md:block h-6 w-px bg-stone-300 mx-2"></div>
                <h1 className="text-lg font-semibold text-stone-800 hidden md:block">
                  Refugio Scholer — Panel administrativo
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <span id="user-email" className="text-sm text-stone-500 hidden sm:block">
                  {user?.email}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-stone-600 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Salir
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-full">
                <Home className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-stone-500">Alojamientos activos</p>
                <h3 className="text-2xl font-bold text-stone-800">{stats.activeAlojamientos}</h3>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-full">
                <CalendarRange className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-stone-500">Reservas futuras</p>
                <h3 className="text-2xl font-bold text-stone-800">{stats.futureReservas}</h3>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-full">
                <LayoutDashboard className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-stone-500">Reservas este mes</p>
                <h3 className="text-2xl font-bold text-stone-800">{stats.monthReservas}</h3>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Upcoming Reservations */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-stone-800 flex items-center gap-2">
                  <CalendarRange className="h-5 w-5 text-stone-500" />
                  Próximas reservas
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-stone-500 uppercase bg-stone-50">
                    <tr>
                      <th className="px-6 py-3">Entrada</th>
                      <th className="px-6 py-3">Alojamiento</th>
                      <th className="px-6 py-3">Huésped</th>
                      <th className="px-6 py-3 text-center">Noches</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {reservas.length > 0 ? (
                      reservas.map((reserva) => (
                        <tr key={reserva.id} className="hover:bg-stone-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-stone-900">
                            {formatDate(reserva.fecha_entrada)}
                          </td>
                          <td className="px-6 py-4 text-stone-600">
                            {reserva.nombre_alojamiento}
                          </td>
                          <td className="px-6 py-4 text-stone-600">
                            {reserva.cliente_final_nombre || 'Sin nombre'}
                          </td>
                          <td className="px-6 py-4 text-center text-stone-600">
                            {calculateNights(reserva.fecha_entrada, reserva.fecha_salida)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-stone-400">
                          No hay reservas próximas registradas.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Alojamientos List */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden h-fit">
              <div className="px-6 py-4 border-b border-stone-100">
                <h2 className="text-lg font-semibold text-stone-800 flex items-center gap-2">
                  <BedDouble className="h-5 w-5 text-stone-500" />
                  Alojamientos
                </h2>
              </div>

              <div className="divide-y divide-stone-100">
                {alojamientos.length > 0 ? (
                  alojamientos.map((alojamiento) => (
                    <div key={alojamiento.id} className="px-6 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
                      <div>
                        <h3 className="font-medium text-stone-900">{alojamiento.nombre_alojamiento}</h3>
                        <div className="flex items-center gap-2 mt-1 text-xs text-stone-500">
                          <Users className="h-3 w-3" />
                          <span>Capacidad: {alojamiento.capacidad_maxima} pax</span>
                        </div>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          alojamiento.activo 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-stone-100 text-stone-800'
                        }`}>
                          {alojamiento.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center text-stone-400 text-sm">
                    No hay alojamientos registrados.
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;