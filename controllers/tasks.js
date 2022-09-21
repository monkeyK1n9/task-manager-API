const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError, CustomAPIError} = require('../errors/customError')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
})

const getTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params
    const task = await Task.findOne({_id: taskID})

    if(!task) {

        return next(createCustomError(`Task with id: ${taskID} not found`, 404))

        // const error = new Error('Not Found') // Not Found is the message here in err.message in the errorHandler.js
        // error.status = 404
        // return next(error)

        // return res.status(404).json({msg: `No task with id: ${taskID}`})
    }
    res.status(200).json({task})
})

const updateTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params

    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
        new: true, //this is to avoid rewriting properties in the task to be modified that we didn't want to
        runValidators: true,
        useFindAndModify: false
    })

    if(!task) {
        return next(createCustomError(`Task with id: ${taskID} not found`, 404))
    }
    res.status(200).json({task})

})

const deleteTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params
    const task = await Task.findOneAndDelete({_id: taskID}, {useFindAndModify: false})

    if(!task) {
        return next(createCustomError(`Task with id: ${taskID} not found`, 404))
    }
    // res.status(200).send()
    // res.status(200).json({task: null, status: "success"})
    res.status(200).json({task})
})

module.exports = {
    getAllTasks, 
    createTask, 
    getTask,
    updateTask, 
    deleteTask
}