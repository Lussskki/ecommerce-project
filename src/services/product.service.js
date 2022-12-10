const Product = require('../db/models/product.model')
const Log = require('../db/mongdb/models/log.mode')

//get all product from db
const getAllProducts = async ({ isAdmin, userId }) => {

    const data = await Product.findAll({
        attributes: ['name', 'price','condition','productTypeId','state','productSize'],
           where: {
            deletedAt: null,
            ...(isAdmin = 0 ? {userId} : {})
        }
    });
    return (!data.length ? {message:'data is empty'} : data);
}
//add all product to db 
const addProduct = async ({userId, 
    name, 
    price, 
    condition, 
    productTypeId, 
    state, 
    productSize  })=> {

    if(!name || !price || !condition || !productTypeId || !state || !productSize){
        return {message:'Not filled in all parts'}
    }
    await Product.create({
        userId,
        createdAt: new Date(),
        name,
        price,
        condition,
        productTypeId: Number(productTypeId),
        state,
        productSize,
    });
    const creationLog = new Log({
        userId,
        actionType: 'CREATED',
        dataType: 'PRODUCT'
      })
      await creationLog.save()
    return {message:'product added successfully'}
}
//update product in db 
const updateProductById = async ({productId, 
    userId, 
    isAdmin, 
    name, 
    price, 
    condition, 
    productTypeId, 
    state, 
    productSize }) => {
    await Product.update({
     name,
    price,
    condition,
    productTypeId,
    state,
    productSize 
    },
    {
        where: {
            id: productId,
            deletedAt: null,
            ...(isAdmin === 0 ? {userId} : {})
        }
    })
     const updatingProductLog = new Log({
        userId,
        ...(isAdmin===1 ? {isAdmin} : {}),
        productId,
        actionType: 'UPDATED',
        dataType: 'PRODUCT',
      })
      await updatingProductLog.save()
    if(isAdmin === 1){
        return {message: 'product updated by admin'}
    }
    return {message: 'product updated'}
}
//delete product in db
const deleteProductById = async ({isAdmin, userId, productId})=> {
    await Product.update({
        deletedAt: new Date(),
    },
    {
        where: {
            ...(isAdmin === 0 ? {userId} : {}),
            id: productId,
            deletedAt: null
        }
    })
    const deletingProductLog = new Log({
        userId,
        ...(isAdmin === 1 ? {isAdmin} : {}),
        productId,
        actionType: 'DELETED',
        dataType: 'PRODUCT'
      })
    await deletingProductLog.save()
      if(isAdmin === 1){
          return {message: 'product deleted by admin'}
    }
    return {message: 'product deleted by user'}
}

    module.exports = {
        getAllProducts,
        addProduct,
        updateProductById,
        deleteProductById 
        }