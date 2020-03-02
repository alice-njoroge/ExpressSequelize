const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todosController");
const auth = require('../middlewares/auth');

router.get('/',auth, todosController.index);
router.post('/',todosController.create);
router.get('/:id',todosController.show);
router.put('/:id',todosController.update);
router.delete('/:id',todosController.destroy);

module.exports = router;