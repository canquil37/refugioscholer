-- Esquema de base de datos para reservas
-- Ejecutar este script en PostgreSQL Railway

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
