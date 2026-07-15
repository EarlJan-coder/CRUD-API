import express from 'express'
const router = express.Router()

const app = express()

let tasks = [
    {
        "id": 1,
        "title": "Code",
        "done": true,
    },
    {
        "id": 2,
        "title": "Study",
        "done": true,
    },
    {
        "id": 3,
        "title":"Eat",
        "done": false,
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

router.post("/new", (req, res) => {
    const task = req.body

    if (!task.title) {
        return res.status(400).json({ error: "Task title can not be empty" })
    }

    tasks.push({ id:tasks.length + 1, ...task, done: false })

    res.status(201).json(`${task.title} has been added to the tasks`)
})

router.delete("/delete/:id", (req, res) => {
    const { id } = req.params

    const taskExists = tasks.some((task) => task.id === Number(id))

    if (!taskExists) {
        return res.status(404).send("Task not found")
    }

    tasks = tasks.filter((task) => task.id !== Number(id))

    res.status(204).end()
})

router.put("/update/:id", (req, res) => {
    const { id } = req.params
    const { title, done } = req.body

    const task = tasks.find((task) => task.id === Number(id))

    if (!task) {
        return res.status(404).send("Task not found")
    }

    if(title !==undefined) task.title = title
    if(done !==undefined) task.done = done

    res.send(`Task with id: ${id} has been updated`)
})

export default router