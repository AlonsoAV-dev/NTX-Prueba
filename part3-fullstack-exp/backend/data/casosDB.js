// Base de datos en memoria para casos
let casos = [
    { id: 1, nombre: 'Caso ejemplo 1', descripcion: 'Descripción del caso 1', estado: 'Abierto' },
    { id: 2, nombre: 'Caso ejemplo 2', descripcion: 'Descripción del caso 2', estado: 'En proceso' }
];

let nextId = 3;

// Obtiene todos los casos
const getAll = () => {
    return casos;
};

// Crea un nuevo caso
const create = (casoData) => {
    const nuevoCaso = {
        id: nextId++,
        ...casoData
    };
    casos.push(nuevoCaso);
    return nuevoCaso;
};

// Busca un caso por ID
const findById = (id) => {
    return casos.find(c => c.id === parseInt(id));
};

// Actualiza un caso por ID
const update = (id, casoData) => {
    const index = casos.findIndex(c => c.id === parseInt(id));
    if (index === -1) return null;

    casos[index] = { ...casos[index], ...casoData };
    return casos[index];
};

// Elimina un caso por ID
const deleteById = (id) => {
    const index = casos.findIndex(c => c.id === parseInt(id));
    if (index === -1) return false;

    casos.splice(index, 1);
    return true;
};

module.exports = {
    getAll,
    create,
    findById,
    update,
    deleteById
};
