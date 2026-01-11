import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Configuración del pool de conexiones PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test de conexión al iniciar
pool.query('SELECT NOW()')
    .then(() => console.log('✅ Conectado a PostgreSQL Railway'))
    .catch(err => console.error('❌ Error conectando a PostgreSQL:', err.message));

export default pool;
