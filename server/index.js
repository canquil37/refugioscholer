import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', process.env.FRONTEND_URL].filter(Boolean),
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// POST /api/reservas - Crear nueva reserva
app.post('/api/reservas', async (req, res) => {
    const { alojamiento, fechaLlegada, fechaSalida, numeroHuespedes, nombreCompleto, telefonoWhatsapp } = req.body;

    // Validación de campos requeridos
    const camposRequeridos = { alojamiento, fechaLlegada, fechaSalida, numeroHuespedes, nombreCompleto, telefonoWhatsapp };
    const camposFaltantes = Object.entries(camposRequeridos)
        .filter(([_, valor]) => !valor)
        .map(([campo]) => campo);

    if (camposFaltantes.length > 0) {
        return res.status(400).json({
            success: false,
            error: 'Campos requeridos faltantes',
            camposFaltantes
        });
    }

    try {
        const query = `
      INSERT INTO reservas (alojamiento, fecha_llegada, fecha_salida, numero_huespedes, nombre_completo, telefono_whatsapp)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, creado_en
    `;

        const values = [alojamiento, fechaLlegada, fechaSalida, numeroHuespedes, nombreCompleto, telefonoWhatsapp];
        const result = await pool.query(query, values);

        console.log(`✅ Nueva reserva creada: ID ${result.rows[0].id}`);

        res.status(201).json({
            success: true,
            message: 'Reserva guardada exitosamente',
            data: {
                id: result.rows[0].id,
                creadoEn: result.rows[0].creado_en
            }
        });

    } catch (error) {
        console.error('❌ Error al guardar reserva:', error.message);

        res.status(500).json({
            success: false,
            error: 'Error al guardar la reserva en la base de datos',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// GET /api/reservas - Listar reservas (para admin)
app.get('/api/reservas', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM reservas ORDER BY creado_en DESC LIMIT 100'
        );

        res.json({
            success: true,
            data: result.rows,
            total: result.rows.length
        });

    } catch (error) {
        console.error('❌ Error al obtener reservas:', error.message);
        res.status(500).json({
            success: false,
            error: 'Error al obtener reservas'
        });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 API Server corriendo en http://localhost:${PORT}`);
    console.log(`📍 Endpoints disponibles:`);
    console.log(`   GET  /api/health`);
    console.log(`   POST /api/reservas`);
    console.log(`   GET  /api/reservas`);
});
