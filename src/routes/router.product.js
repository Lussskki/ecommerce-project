const router = require('express').Router()
const productController = require('../controllers/product.Controller')

//get all product
router.get('/',productController.getProduct)
//add product
router.post('/',productController.addProduct)
//update product
router.put('/:productId',productController.updateProduct)
//delete product
router.delete('/:productId',productController.deleteProduct)



module.exports = router