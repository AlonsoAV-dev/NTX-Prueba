const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const casosController = require('../controllers/casosController');
const router = express.Router();

// Todas las rutas protegidas con authMiddleware
router.use(authMiddleware);

router.get('/', casosController.getCasos);
router.post('/', casosController.createCaso);
router.put('/:id', casosController.updateCaso);
router.delete('/:id', casosController.deleteCaso);

module.exports = router;
