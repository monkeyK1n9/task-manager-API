const {CustomAPIError} = require('../errors/customError')

const errorHandler = (err, req, res, next) => {
    //we use the CustomAPIError to capture errors that could come but if we don't have, we push a 500 error
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message})
    }

    return res.status(500).json({msg: err.message})
}

module.exports = errorHandler