const db = require('../db.config');
const Client = db.Clients;
const ClientAdresse = db.ClientAdresse;
const CompanyAdresse = db.CompanyAdresse;
const Country = db.Country;
const Company = db.Company;
const Association = db.Association;
const AssociationAdresse = db.AssociationAdresse;

exports.getAllClients = async (req, res) => {
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

exports.getOneClient = async (req, res) => {
    const clientId = parseInt(req.params.id);

    try {

        const client = await Client.findOne({
            where: { id: clientId },
            include: [ClientAdresse, Country, Company],
        });


        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        return res.json({ data: client });
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};

exports.addClient = async (req, res) => {
    const clientData = req.body;

    try {

        const newClient = await Client.create({
            clients_name: clientData.clients_name,
            clients_prenom: clientData.clients_prenom,
            clients_civilite: clientData.clients_civilite,
            clients_tel: clientData.clients_tel,
            clients_mail: clientData.clients_mail,
        });

        const newClientId = newClient.id;

        ClientAdresse.create({
            client_adresse_adresse: clientData.clients_adresse,
            client_adresse_ville: clientData.clients_ville,
            client_adresse_codepostal: clientData.clients_codepostal,
            clientAdresseCountry_id: clientData.pays_id,
            clients_id: newClientId,
        });

        if ('associationId' in clientData) {
            await Client.update(
                { clientsAsso_id: clientData.associationId },
                { where: { id: newClient.id } }
            );
        }

        if ('company_name' in clientData) {

            const newCompany = await Company.create({
                company_name: clientData.company_name,
                company_telephone: clientData.company_telephone,
                company_num_siret: clientData.company_num_siret,
                code_naf: clientData.code_naf,
                clients_id: newClient.id,
                pays_id: clientData.company_pays_id,
            });

            const companyId = newCompany.id;

            CompanyAdresse.create({
                company_adresse: clientData.company_adresse,
                company_ville: clientData.company_ville,
                company_codepostal: clientData.company_codepostal,
                company_id: companyId,
            });
        }

        return res.status(201).json({ message: 'Client added successfully', data: newClient });

    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};


exports.updateClient = async (req, res) => {
    const updatedData = req.body;
    const clientId = parseInt(req.params.id);

    try {
        const client = await Client.findOne({ where: { id: clientId } });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const updatedClient = await client.update({
            client_name: updatedData.client_name,
            client_telephone: updatedData.client_telephone,
            // Mettez à jour d'autres champs selon votre modèle de données
        });

        const updatedAddress = await Address.update({
            address_line: updatedData.address_line,
            city: updatedData.city,
            postal_code: updatedData.postal_code,
            country_id: updatedData.country_id,
        }, { where: { client_id: clientId } });

        return res.json({ message: 'Client updated successfully', data: { updatedClient, updatedAddress } });
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};

exports.deleteClient = async (req, res) => {
    const clientId = parseInt(req.params.id);

    try {
        const client = await Client.findOne({ where: { id: clientId } });
        const adresseclient = await ClientAdresse.findOne({ where: { clients_id: clientId } });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        await client.destroy();
        await adresseclient.destroy();

        return res.json({ message: 'Client deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};

exports.LinkCompanyAtClient = async (req, res) => {
    const clientId = parseInt(req.params.id);
    const companyIdLink = req.body.companyId;

    try {
        await Company.update(
            { clients_id: clientId },
            { where: { id: companyIdLink } }
        );

        return res.json({ message: 'Client Link successfully updated' });
    } catch (error) {
        console.error('Error during database update:', error);
        return res.status(500).json({ message: 'Database Error', error });
    }
};

exports.LinkAssociationAtClient = async (req, res) => {
    const clientId = parseInt(req.params.id);
    const associationIdLink = req.body.associationId;

    try {
        await Client.update(
            { clientsAsso_id: associationIdLink },
            { where: { id: clientId } }
        );

        return res.json({ message: 'Client Link at association successfully updated' });
    } catch (error) {
        console.error('Error during database update:', error);
        return res.status(500).json({ message: 'Database Error', error });
    }
};
