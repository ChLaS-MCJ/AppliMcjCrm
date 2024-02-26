const db = require('../db.config');
const Association = db.Association;
const AssociationAdresse = db.AssociationAdresse;
const Country = db.Country;
const Clients = db.Clients;

exports.GetAllAssociation = async (req, res) => {
    try {
        const associations = await Association.findAll({
            include: [
                {
                    model: AssociationAdresse,
                    include: [Country],
                },
                Clients,
            ],
        });

        return res.json({ data: associations });
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }

};

exports.GetOneAssociation = async (req, res) => {
    const associationId = parseInt(req.params.id);

    try {
        const association = await Association.findOne({
            where: { id: associationId },
            include: [AssociationAdresse, CodeNaf, Country, Clients],
        });

        if (!association) {
            return res.status(404).json({ message: 'Association not found' });
        }

        return res.json({ data: association });
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};

exports.AddAssociation = async (req, res) => {
    const associationData = req.body;

    try {

        const newAssociation = await Association.create({
            association_name: associationData.association_name,
            association_telephone: associationData.association_telephone,
            association_num_siret: associationData.association_num_siret,
            code_naf: associationData.code_naf,
            code_rna: associationData.code_rna,
        });

        const associationId = newAssociation.id;

        const newAssociationAdresse = await AssociationAdresse.create({
            association_adresse: associationData.association_adresse,
            association_ville: associationData.association_ville,
            association_codepostal: associationData.association_codepostal,
            associationpays_id: associationData.pays_id,
            association_id: associationId,
        });

        return res.status(201).json({ message: 'Association added successfully', data: newAssociation });

    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};

exports.UpdateAssociation = async (req, res) => {
    const updatedData = req.body;
    const associationId = parseInt(req.params.id);

    try {
        const association = await Association.findOne({ where: { id: associationId } });

        if (!association) {
            return res.status(404).json({ message: 'Association not found' });
        }

        const associationadresse = await AssociationAdresse.findOne({ where: { association_id: association.id } });

        let objectassociation = {
            id: updatedData.id,
            association_name: updatedData.association_name,
            association_telephone: updatedData.association_telephone,
            association_num_siret: updatedData.association_num_siret,
            code_naf: updatedData.code_naf,
            code_rna: updatedData.code_rna,
        }

        let objectassociationAdresse = {
            association_adresse: updatedData.association_adresse,
            association_ville: updatedData.association_ville,
            association_codepostal: updatedData.association_codepostal,
            associationpays_id: updatedData.pays_id,
            association_id: objectassociation.id,
        }

        await association.update(objectassociation);

        let updatedAssociation = await AssociationAdresse.update(objectassociationAdresse, { where: { id: associationadresse.id } });

        return res.json({ message: 'Association updated successfully', data: updatedAssociation });
    } catch (error) {
        console.error('Error updating association:', error);
        return res.status(500).json({ message: 'Database Error', error: error.message });
    }
}


exports.DeleteAssociation = async (req, res) => {
    const associationId = parseInt(req.params.id);

    try {
        const association = await Association.findOne({ where: { id: associationId } });

        if (!association) {
            return res.status(404).json({ message: 'Association not found' });
        }

        await association.destroy();

        return res.json({ message: 'Association deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};
