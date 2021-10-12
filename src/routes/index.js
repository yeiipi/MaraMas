const {Router}= require("express");
const router = Router()

const {getcustomers,createcustomer,getcustomersbyid,deletecustomersbyid, updatecustomer,
     getadministrators,getadminbyid,deleteadminbyid,updateadmin,
     getdelivery,getdeliverybyid,deletedeliverybyid,updatedelivery}=require('../controlers/index.controler')

router.get('/customers',getcustomers)
router.post('/customers',createcustomer)
router.get('/customers/:id',getcustomersbyid)
router.delete('/customers/:id',deletecustomersbyid)
router.put('/customers/:id',updatecustomer)

router.get('/admin',getadministrators)
router.get('/admin/:id',getadminbyid)
router.delete('/admin/:id',deleteadminbyid)
router.put('/admin/:id',updateadmin)

router.get('/delivery',getdelivery)
router.get('/delivery/:id',getdeliverybyid)
router.delete('/delivery/:id',deletedeliverybyid)
router.put('/delivery/:id',updatedelivery)

module.exports = router;
