const productService = require('../services/product.service')

//get all products from db 
const getProduct = async (req, res) => {
    const { isAdmin, userId } = req.body
    const data = await productService.getAllProducts({ isAdmin, userId })
    res.json(data)
}
//add products in db 
const addProduct = async (req, res) => {
    const { userId } = req.body
    const { name, 
        price, 
        condition, 
        productTypeId, 
        state, 
        productSize 
    } = req.body
    const result = await productService.addProduct({
        userId, 
        name, 
        price, 
        condition, 
        productTypeId, 
        state, 
        productSize
    })
    res.json(result)
}
//update product in db
const updateProduct = async (req, res) => {
    try {
        const { isAdmin, userId } = req.body
        const { name, 
            price, 
            condition, 
            productTypeId, 
            state, 
            productSize
         } = req.body
        const { productId } = req.params        
        const result = await productService.updateProductById({
            isAdmin, 
            productId, 
            userId, 
            name, 
            price, 
            condition, 
            productTypeId, 
            state, 
            productSize 
        });
        
        res.json(result)
    } catch (e) {       
        return res.status(500).json({
            message: 'Server error'
          });
    }
}
//delete product in db
const deleteProduct = async (req, res) => {
    try {
        const { isAdmin, userId } = req.body
        const { productId } = req.params
        const result = await productService.deleteProductById({ 
            userId, 
            productId, 
            isAdmin })
        
        res.json(result)
    } catch (e) {
                return res.status(500).json({
            message: 'Server error'
          });
    }
}

module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}