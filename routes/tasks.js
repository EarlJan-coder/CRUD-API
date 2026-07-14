import express from 'express'

const router = express.Router()

const app = express()

const tasks = [
    {
        "id":"1",
        "title":"Code",
        "done":"True",
    },
    {
        "id":"2",
        "title":"Study",
        "done":"True",
    },
    {
        "id":"3",
        "title":"Eat",
        "done":"False",
    },
]

router.get("/", (req, res) => {res.send(tasks)})

router.get("/:id", (req,res) => {
    const { id } = req.params

    const findTaskId = tasks.find((task) => task.id === id) 
    if (!findTaskId) {
       return res.status(404).json({error: `Task ${id} not found`})
    }

    res.send(findTaskId)
})

router.post('/new', (req, res) => {
    const task = req.body

    if (!task.title) {
        return res.status(400).json({error: `Task title can not be empty`})
    }

    tasks.push({  id: String(tasks.length + 1), ...task, done: "False" })


    res.status(201).send(`${task.title} has been added to the tasks`)
})

export default router