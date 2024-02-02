const db = require('../db.config');
const Company = db.Company;
const CompanyAdresse = db.CompanyAdresse;
const Pays = db.Pays;


exports.GetAllCompany = async (req, res) => {
    try {
        const companies = await Company.findAll({
            include: [CompanyAdresse, CodeNaf, Pays, Clients],
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
    console.log(companyData);
    try {
        console.log("je passe la");
        const newPays = await Pays.create({
            pays_name: companyData.pays_name,
        });
        console.log(newPays);

        const newCompany = await Company.create({
            company_name: companyData.company_name,
            company_telephone: companyData.company_telephone,
            company_num_siret: companyData.company_num_siret,
            code_naf: companyData.code_naf,
            company_adresse_id: newCompanyAdresse.id,
            pays_id: newPays.id,
        });

        const newCompanyAdresse = await CompanyAdresse.create({
            company_adresse: companyData.company_adresse,
            company_ville: companyData.company_ville,
            company_codepostal: companyData.company_codepostal,
            company_id: newCompany.id,
        });
        console.log(newCompany);
        console.log(newCompanyAdresse);
        return res.status(201).json({ message: 'Company added successfully', data: newCompany });
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};

exports.UpdateCompany = async (req, res) => {
    const companyId = parseInt(req.params.id);
    const updatedData = req.body;

    try {
        const company = await Company.findOne({ where: { id: companyId } });

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        await company.update(updatedData);

        return res.json({ message: 'Company updated successfully', data: company });
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