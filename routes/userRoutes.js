const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const loginController = require("../controllers/loginController");
const auth = require("../middlewares/auth");

router.post('/login', loginController.login);
router.get('/me', auth, usersController.profile);

router.get('/', auth, usersController.index);
router.post('/', usersController.create);
router.get('/:id', usersController.show);
router.put('/:id', usersController.update);
router.delete('/:id',usersController.destroy);
module.exports = router;