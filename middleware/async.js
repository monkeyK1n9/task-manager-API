const asyncWrapper = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (err) {
            next(err)
        }
    }
}

module.exports = asyncWrapper