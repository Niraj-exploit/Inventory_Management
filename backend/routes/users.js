var express = require('express');
var router = express.Router();
require('dotenv').config();

const roleAuthentication = require('../middlewares/role-auth-middleware');
const { userRegister, userLogin, getAllUser, getUserInfo, assignUserRole } = require('../controller/users');

router.post('/register', userRegister)

router.post('/login', userLogin)

router.get('/all-user',  roleAuthentication(["ADMIN"]), getAllUser)

router.get('/userInfo', roleAuthentication(["ADMIN"]), getUserInfo)

router.post('/user-role-assign', roleAuthentication(["ADMIN"]) , assignUserRole)

module.exports = router;
