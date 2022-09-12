const mongoose = require('mongoose')


const TaskSchema = new mongoose.Schema({
    // Here, we have added validators for name property.
    name: {
        type:String, //type of name value
        required: [true, 'must provide name'], // imposing to the user to enter a name or else the error message will be shown
        trim: true, // if name has unneccessary spaces, this validator trims it
        maxlength: [20, 'name can not be more than 20 characters'] // validator to take just a required number of characters
    }, 
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema)