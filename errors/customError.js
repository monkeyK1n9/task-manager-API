
//class to extend from the new Error class to create a custom Error object in controllers
class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (message, statusCode) => {
    return new CustomAPIError(message, statusCode)
}

module.exports = {createCustomError, CustomAPIError}