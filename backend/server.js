import express from 'express'
import routes from './routes/routes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use('/api', routes)
app.use('/uploads',express.static("uploads"))

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})