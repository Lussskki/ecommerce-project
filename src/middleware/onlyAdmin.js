const onlyAdmin = (req, res, next) => {
    const { isAdmin } = req.body
    if(isAdmin === 1){
        return next()
    }

    return res.status(401).json({message: 'Sorry, You Are Not Allowed to Access This Page'})
}



module.exports = onlyAdmin 