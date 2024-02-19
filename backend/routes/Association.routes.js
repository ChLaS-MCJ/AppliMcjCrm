/**
 * Express Router for handling authentication routes.
 * @module authRouter
 */

/***********************************/
/*** Import necessary modules */
const express = require('express')
const associationController = require('../controllers/Association.controllers')
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
/*** Routing for Association resource */
router.get('/', associationController.GetAllAssociation)
router.get('/:id', associationController.GetOneAssociation)
router.post('/', associationController.AddAssociation)
router.patch('/:id', associationController.UpdateAssociation)
router.delete('/:id', associationController.DeleteAssociation)


module.exports = router