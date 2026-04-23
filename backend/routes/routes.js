import express from 'express'
import { getCategories, createCategory} from '../controllers/categoryControllers.js'
import { getInformation} from '../controllers/serviceProviderController.js'
import matchLogin from '../controllers/loginController.js'
import {providerSignup} from '../controllers/providerSignupController.js'
import upload from '../middleware/uploads.js';
import { customerSignup } from '../controllers/customerSignupController.js'
import userLogin from '../controllers/loginController.js'
import { authMiddleware, authorize } from '../middleware/authentication.js'
import { customerDashboard } from '../controllers/customerDashboardController.js'
import { getUserInfo } from '../controllers/userInformationController.js'
import { getProviderInfo } from '../controllers/providerControllers.js'
import { getProviderDetail } from '../controllers/businessDetailController.js'
import { bookProvider } from '../controllers/bookProviderController.js'
import { getBookings, getBookingsCustomer } from '../controllers/bookingsController.js'

const router = express.Router()

router.get('/categories', getCategories)
router.post('/categories', createCategory)
router.post('/login', matchLogin);
router.post('/providerSignup', upload.single("image"), providerSignup)
router.post('/CustomerSignup', upload.none(), customerSignup)
router.get('/serviceProviderinfo', getInformation)
router.get('/login', userLogin)
router.get('/customerDashboard', authMiddleware, authorize("customer"), customerDashboard);
router.get('/userInfo', authMiddleware, getUserInfo)
router.get('/serviceProviderinfoLogin', authMiddleware, getProviderInfo)
router.get('/ProviderDetail/:id', authMiddleware, getProviderDetail)
router.post('/book', authMiddleware, bookProvider);
router.get("/bookings/provider/:providerId/:date", authMiddleware, getBookings);
router.get("/bookings/customer/:customerId", authMiddleware, getBookingsCustomer);
// router.post('/serviceProviderinfo', setInformation)


export default router;