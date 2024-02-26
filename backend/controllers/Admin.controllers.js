const db = require('../db.config');

const Client = db.Clients;
const ClientAdresse = db.ClientAdresse;

const Company = db.Company;
const CompanyAdresse = db.CompanyAdresse;

const Association = db.Association;
const AssociationAdresse = db.AssociationAdresse;

const User = db.User;

exports.GetAllClientsDel = async (req, res) => {
    try {
        const clients = await Client.findAll({
            include: [
                {
                    model: ClientAdresse,
                    include: Country,
                },
                {
                    model: Company,
                    include: [CompanyAdresse, Country],
                },
                {
                    model: Association,
                    include: [AssociationAdresse],
                },
            ],
        });

        return res.json({ data: clients });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur de la base de données', error });
    }
};

exports.GetAllCompanyDel = async (req, res) => {

};

exports.GetAllAssociationsDel = async (req, res) => {

};

exports.GetAllAssociationsDel = async (req, res) => {

};