const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const casosRoutes = require('./routes/casos');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/login', authRoutes);
app.use('/casos', casosRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Backend funcionando correctamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
