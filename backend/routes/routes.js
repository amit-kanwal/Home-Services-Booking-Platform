import express from 'express'
import { getCategories, createCategory } from '../controllers/categoryControllers.js'

const router = express.Router()

router.get('/categories', getCategories)
router.post('/categories', createCategory)

router.get("/services", async (req, res) => {
  try {
    const result = await prisma.services.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;