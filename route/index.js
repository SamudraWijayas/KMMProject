import express from 'express'

import Users from './UserRoute.js'
import Desa from './DesaRoute.js'
import Kelompok from './KelompokRoute.js'
import Generus from './GenerusRoute.js'



const router = express()


router.use(Users)
router.use(Desa)
router.use(Kelompok)
router.use(Generus)



export default router
