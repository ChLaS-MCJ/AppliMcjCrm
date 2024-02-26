/**
 * Express Router for handling Admin routes.
 * @module authRouter
 */

/***********************************/
/*** Import necessary modules */
const express = require('express')
const adminController = require('../controllers/Admin.controllers')
/***************************************/

/*** Get the express router */
let router = express.Router()

/*********************************************/
/*** Middleware to log request dates */
router.use((req, res, next) => {
    const event = new Date()
    console.log('AUTH Time:', event.toString())
    next()
})

/***********************************/
/*** Routing for Admin resource */
router.get('/clients', adminController.GetAllClientsDel)
router.get('/company', adminController.GetAllCompanyDel)
router.post('/associations', adminController.GetAllAssociationsDel)
router.patch('/employe', adminController.GetAllAssociationsDel)


module.exports = router