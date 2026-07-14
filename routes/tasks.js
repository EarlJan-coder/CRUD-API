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

export default router