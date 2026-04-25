import express from 'express'
import routes from './routes/routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api', routes)
app.use('/uploads',express.static("uploads"))

app.use((err, req, res, next) => {
  console.error("Error", err.message);

  res.status(400).json({
    error: err.message || "Something went wrong",
  });
});

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})