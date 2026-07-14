import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const PORT = 3000

app.use(bodyParser.json())

app.get("/", (req, res) => {
    console.log('[GET ROUTE]')
    res.json({
        "name":"Task API",
        "version":"1.0",
        "endpoints":["/tasks"],
    })
})

app.get("/health", (req, res) => {
    console.log('[HEALTH ROUTE]')
    res.json({
        "status":"ok"
    })
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))