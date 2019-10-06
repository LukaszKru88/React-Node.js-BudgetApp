const db = require('../database/db');

const copyDefaultCategoriesTable = async (user, query) => {
    db.sequelize.query(query, 
            { replacements: [user.id], 
              type: db.sequelize.QueryTypes.SELECT 
            })
            .then(results => {
                return results;
            })
            .catch(error => {
                return error
            }); 
}

module.exports = {
    copyDefaultCategoriesTable,
}
