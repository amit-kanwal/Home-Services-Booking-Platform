import express from 'express'
import { getCategories, createCategory} from '../controllers/categoryControllers.js'
// import { getInformation, setInformation } from '../controllers/serviceProviderController.js'

const router = express.Router()

router.get('/categories', getCategories)
router.post('/categories', createCategory)
// router.get('/serviceProviderinfo', getInformation)
// router.post('/serviceProviderinfo', setInformation)


export default router;