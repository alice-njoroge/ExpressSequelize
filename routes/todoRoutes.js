const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todosController");

router.get('/',todosController.index);
router.post('/',todosController.create);
router.get('/:id',todosController.show);

module.exports = router;