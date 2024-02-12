/**
 * Express Router for handling authentication routes.
 * @module authRouter
 */

/***********************************/
/*** Import necessary modules */
const express = require('express')
const clientController = require('../controllers/Client.controllers')
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
/*** Routing for client resource */
router.get('/', clientController.getAllClients)
router.get('/:id', clientController.getOneClient)
router.post('/', clientController.addClient)
router.patch('/:id', clientController.updateClient)
router.patch('/linkcompany/:id', clientController.LinkCompanyAtClient)
router.delete('/:id', clientController.deleteClient)


module.exports = router