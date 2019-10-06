const db = require('../database/db');

const getBalance = async (id, startDate, endDate, query) => {
    try {
        return await db.sequelize.query(query, 
            { replacements: [id, startDate, endDate], 
              type: db.sequelize.QueryTypes.SELECT 
            });
    } catch (error) {
        return error.response
    }
}

const getCategories = async (id, query) => {
    try {
        return await db.sequelize.query(query, 
            { replacements: [id],
              type: db.sequelize.QueryTypes.SELECT 
            });
    } catch (error) {
        return error.response
    }
}

const editBalance = async (categoryId, paymentMethodId = null, body, query) => {
    const {user, amount, date, comment, id } = body
    const {id: user_id} = user;
    const category_id = categoryId[0].id;
    const payment_id = paymentMethodId && paymentMethodId[0].id;
    const incomeReplacements = [user_id, category_id, amount, date, comment, id];
    const expenceReplacements = [user_id, category_id, payment_id, amount, date, comment, id];
    
    try {
        return await db.sequelize.query(query, 
            { replacements: body.formType === "incomes" ? incomeReplacements : expenceReplacements,
            });
    } catch (error) {
        return error.response
    }
}

const deleteBalance = async (id, query) => {
    try {
        return await db.sequelize.query(query,
            {replacements: [id]});
    } catch (error) {
        return error.response
    }
}

const findCategoryId = async(id, name, query) => {
    try {
        return await db.sequelize.query(query,
            { replacements: [id, name],
              type: db.sequelize.QueryTypes.SELECT
            });
    } catch (error) {
        return error.response
    }
}

module.exports = {
    getBalance,
    getCategories,
    editBalance,
    deleteBalance,
    findCategoryId
}