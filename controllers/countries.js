const { db } = require('../config/database');

class Countries{
    static getCountries = (req, res) => {
        const countryId = req.params.countryId;
        db.query('call GetCountries(?)',[countryId], (err, result) => {
            if(err) throw err;
            const countries = result[0];
            res.status(200).json(countryId ? countries[0] : countries);
        });
    }
}

module.exports = Countries;