// Script para crear las tablas en PostgreSQL Railway
// Ejecutar: node setup-db.js

import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const schema = `
  -- Crear tabla reservas
  CREATE TABLE IF NOT EXISTS reservas (
    id SERIAL PRIMARY KEY,
    alojamiento VARCHAR(255) NOT NULL,
    fecha_llegada DATE NOT NULL,
    fecha_salida DATE NOT NULL,
    numero_huespedes INTEGER NOT NULL,
    nombre_completo VARCHAR(255) NOT NULL,
    telefono_whatsapp VARCHAR(50) NOT NULL,
    creado_en TIMESTAMP DEFAULT NOW()
  );

  -- Índice para búsquedas por fecha
  CREATE INDEX IF NOT EXISTS idx_reservas_fechas ON reservas(fecha_llegada, fecha_salida);

  -- Índice para búsquedas por fecha de creación
  CREATE INDEX IF NOT EXISTS idx_reservas_creado ON reservas(creado_en DESC);
`;

async function setupDatabase() {
    console.log('🔄 Conectando a PostgreSQL Railway...');

    try {
        // Test connection
        const testResult = await pool.query('SELECT NOW()');
        console.log('✅ Conectado exitosamente a:', testResult.rows[0].now);

        // Execute schema
        console.log('🔄 Creando tabla reservas...');
        await pool.query(schema);

        console.log('✅ Tabla reservas creada exitosamente!');

        // Verify table exists
        const tableCheck = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'reservas'
      ORDER BY ordinal_position
    `);

        console.log('\n📋 Estructura de la tabla:');
        tableCheck.rows.forEach(col => {
            console.log(`   - ${col.column_name}: ${col.data_type}`);
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        await pool.end();
        console.log('\n👋 Conexión cerrada.');
    }
}

setupDatabase();
