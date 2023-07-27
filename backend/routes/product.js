var express = require('express')
const roleAuthentication = require('../middlewares/role-auth-middleware')
const { createProduct, updateProduct, deleteProduct, getAllProduct, getSingleProduct } = require('../controller/products-controller')
var router = express.Router()

router.post('/create', roleAuthentication(["ADMIN", "EDITOR"]), createProduct)
router.post('/update', roleAuthentication(["ADMIN", "EDITOR"]), updateProduct)
router.post('/delete', roleAuthentication(["ADMIN"]), deleteProduct)
router.get('/get-all', getAllProduct)
router.get('/get', getSingleProduct)

module.exports = router