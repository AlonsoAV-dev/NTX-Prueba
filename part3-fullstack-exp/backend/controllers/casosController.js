const casosDB = require('../data/casosDB');

// Obtiene todos los casos
const getCasos = (req, res) => {
    const casos = casosDB.getAll();
    res.json(casos);
};

// Crea un nuevo caso
const createCaso = (req, res) => {
    const { nombre, descripcion, estado } = req.body;

    const nuevoCaso = casosDB.create({
        nombre,
        descripcion,
        estado: estado || 'Abierto'
    });

    res.status(201).json(nuevoCaso);
};

// Actualiza un caso existente
const updateCaso = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, estado } = req.body;

    const casoActualizado = casosDB.update(id, { nombre, descripcion, estado });

    if (!casoActualizado) {
        return res.status(404).json({ error: 'Caso no encontrado' });
    }

    res.json(casoActualizado);
};

// Elimina un caso
const deleteCaso = (req, res) => {
    const { id } = req.params;

    const eliminado = casosDB.deleteById(id);

    if (!eliminado) {
        return res.status(404).json({ error: 'Caso no encontrado' });
    }

    res.json({ message: 'Caso eliminado correctamente' });
};

module.exports = {
    getCasos,
    createCaso,
    updateCaso,
    deleteCaso
};
