import express from 'express'
import routes from './routes/routes.js'
import pool from './config/db.js'
const app = express()
const port = 3000

app.use(express.json())
app.use('/api', routes)
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database Connected ✅",
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})