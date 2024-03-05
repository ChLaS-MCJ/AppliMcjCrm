const db = require('../db.config');
const { Op } = require('sequelize');

const Client = db.Clients;
const ClientAdresse = db.ClientAdresse;

const Company = db.Company;
const CompanyAdresse = db.CompanyAdresse;

const Association = db.Association;
const AssociationAdresse = db.AssociationAdresse;

const Country = db.Country;

exports.GetAllClientsDel = async (req, res) => {
    try {
        const clients = await Client.findAll({
            paranoid: false,
            where: {
                deletedAt: {
                    [Op.ne]: null,
                },
            },
            include: [
                {
                    paranoid: false,
                    model: ClientAdresse,
                    include: Country,
                },
                {
                    paranoid: false,
                    model: Association,
                    include: AssociationAdresse,
                },
                {
                    paranoid: false,
                    model: Company,
                    include: CompanyAdresse,
                },
            ],
        });

        return res.json({ data: clients });
    } catch (error) {
        console.error('Error in GetAllClientsDel:', error);
        return res.status(500).json({ message: 'Erreur de la base de données', error: error.message });
    }
};

exports.RestoreClientsDel = async (req, res) => {
    let clientId = parseInt(req.params.id);

    if (!clientId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        await Client.restore({ where: { id: clientId } });

        // Restaurer l'adresse du client
        const clientAdresseId = req.body.idclientadresses;
        if (clientAdresseId) {
            await ClientAdresse.restore({ where: { id: clientAdresseId } });
        }

        // Restaurer la compagnie du client
        const clientCompanyId = req.body.idclientcompanies;
        if (clientCompanyId) {
            await Company.restore({ where: { id: clientCompanyId } });
        }

        // Restaurer la compagnie Adresse du client
        const clientCompanyIdAdresses = req.body.idclientcompaniesadresses;
        if (clientCompanyIdAdresses) {
            await CompanyAdresse.restore({ where: { id: clientCompanyIdAdresses } });
        }

        res.status(204).json({});
    } catch (error) {
        console.error('Error restoring client and associated records:', error);
        res.status(500).json({ message: 'Database Error', error: error });
    }
};

exports.GetAllCompanyDel = async (req, res) => {
    try {
        const company = await Company.findAll({
            paranoid: false,
            where: {
                deletedAt: {
                    [Op.ne]: null,
                },
            },
            include: [
                {
                    paranoid: false,
                    model: CompanyAdresse,
                },
                {
                    paranoid: false,
                    model: Country,
                },
            ],

        });

        return res.json({ data: company });
    } catch (error) {
        console.error('Error in GetAllCompanyDel:', error);
        return res.status(500).json({ message: 'Erreur de la base de données', error: error.message });
    }
};

exports.RestoreCompanyDel = async (req, res) => {
    let companyId = parseInt(req.params.id);

    if (!companyId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        await Company.restore({ where: { id: companyId } });

        // Restaurer la compagnie Adresse
        const CompanyIdAdresses = req.body.idcompanyadresses;
        if (CompanyIdAdresses) {
            await CompanyAdresse.restore({ where: { id: CompanyIdAdresses } });
        }

        res.status(204).json({});
    } catch (error) {
        console.error('Error restoring compagny and associated records:', error);
        res.status(500).json({ message: 'Database Error', error: error });
    }
};

exports.GetAllAssociationsDel = async (req, res) => {

};

exports.GetAllAssociationsDel = async (req, res) => {

};