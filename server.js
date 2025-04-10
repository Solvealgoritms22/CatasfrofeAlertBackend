const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const JSON_FILE = path.join(__dirname, 'pacientes.json');

// Middleware
app.use(express.json());
app.use(cors()); // Permitir solicitudes desde Angular

// Obtener todos los pacientes
app.get('/pacientes', async (req, res) => {
    try {
        const data = await fs.readFile(JSON_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({ error: 'Error al leer el archivo' });
    }
});

// Guardar pacientes (sobrescribe el archivo completo)
app.post('/pacientes', async (req, res) => {
    try {
        await fs.writeFile(JSON_FILE, JSON.stringify(req.body, null, 2));
        res.json({ message: 'Pacientes guardados correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al guardar el archivo' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});