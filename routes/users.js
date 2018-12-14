const express = require('express');
const router  = express.Router();

const UsersController = require('../controllers/UserController');
const validateHeaders = require('../middleware/ValidateHeaders');

router.get('/', UsersController.users_get_all);

router.post('/', validateHeaders, UsersController.users_create_user);

router.patch('/', UsersController.users_manage_user);

router.get('/:userId', UsersController.users_find_by_id);

router.delete('/:userId',  UsersController.users_delete_user);

module.exports = router;