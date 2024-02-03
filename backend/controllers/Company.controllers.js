const db = require('../db.config');
const Company = db.Company;

const CompanyAdresse = db.CompanyAdresse;
const Country = db.Country;
const Clients = db.Clients;

exports.GetAllCompany = async (req, res) => {
    try {
        const companies = await Company.findAll({
            include: [CompanyAdresse, Country, Clients],
        });
        return res.json({ data: companies });
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};

exports.GetOneCompany = async (req, res) => {
    const companyId = parseInt(req.params.id);

    try {
        const company = await Company.findOne({
            where: { id: companyId },
            include: [CompanyAdresse, CodeNaf, Pays, Clients],
        });

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        return res.json({ data: company });
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};

exports.AddCompany = async (req, res) => {
    const companyData = req.body;

    try {
        // Créez d'abord la société
        const newCompany = await Company.create({
            company_name: companyData.company_name,
            company_telephone: companyData.company_telephone,
            company_num_siret: companyData.company_num_siret,
            code_naf: companyData.code_naf,
            pays_id: companyData.pays_id,
        });

        const companyId = newCompany.id;

        CompanyAdresse.create({
            company_adresse: companyData.company_adresse,
            company_ville: companyData.company_ville,
            company_codepostal: companyData.company_codepostal,
            company_id: companyId,
        });

        return res.status(201).json({ message: 'Company added successfully', data: newCompany });

    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};

exports.UpdateCompany = async (req, res) => {
    const companyId = parseInt(req.params.id);
    const updatedData = req.body;
    console.log(req.body.company_name);

    try {
        const company = await Company.findOne({ where: { id: companyId } });

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        await company.update(updatedData);

        return res.json({ message: 'Company updated successfully', data: updatedCompany });
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};



exports.DeleteCompany = async (req, res) => {
    const companyId = parseInt(req.params.id);

    try {
        const company = await Company.findOne({ where: { id: companyId } });

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        await company.destroy();

        return res.json({ message: 'Company deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};