const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todosController");

router.get('/',todosController.index);

module.exports = router;