/***********************************/
/*** Import des module nécessaires */
const db = require('../db.config')
const User = db.User

/**********************************/
/*** Routage de la ressource User */

/**
 * Retrieves all users from the database and sends the data as a JSON response.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON response with user data or error message.
 */
exports.getAllUsers = (req, res) => {
    User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

/**
 * Retrieves a specific user from the database based on the provided id parameter and sends it as a JSON response.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON response with user data or error message.
 */
exports.getUser = async (req, res) => {
    let userId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'utilisateur et vérification
        let user = await User.findOne({ where: { id: userId }, attributes: ['id','pseudo','email']})
        if (user === null) {
            return res.status(404).json({ message: 'This user does not exist !' })
        }

        return res.json({ data: user })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

/**
 * Updates a specific user in the database based on the provided id parameter and the request body.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON response with success message or error message.
 */
exports.updateUser = async (req, res) => {
    let userId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche de l'utilisateur et vérification
        let user = await User.findOne({ where: {id: userId}, raw: true})
        if(user === null){
            return res.status(404).json({ message: 'This user does not exist !'})
        }

        // Mise à jour de l'utilisateur
        await User.update(req.body, { where: {id: userId}})
        return res.json({ message: 'User Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

/**
 * Restores a user from the trash in the database based on the provided id parameter.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON response with success message or error message.
 */
exports.untrashUser =  (req, res) => {
    let userId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    
    User.restore({ where: {id: userId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

/**
 * Moves a user to the trash in the database based on the provided id parameter.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON response with success message or error message.
 */
exports.trashUser = (req, res) => {
    let userId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    User.destroy({ where: {id: userId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

/**
 * Permanently deletes a user from the database based on the provided id parameter.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON response with success message or error message.
 */
exports.deleteUser =  (req, res) => {
    let userId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    User.destroy({ where: {id: userId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}