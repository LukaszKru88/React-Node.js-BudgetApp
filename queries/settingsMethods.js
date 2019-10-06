const db = require('../database/db');

const doesCategoryExist = async (userId, newCategory, query) => {
    try {
        return await db.sequelize.query(query, 
            {replacements: [userId, newCategory]});
    } catch (error) {
        return error.response;
    }
}

const addCategoryToDB = async (userId, newCategory, query) => {
    try {
        return await db.sequelize.query(query,
            { replacements: [userId, newCategory]});
    } catch (error) {
        return error.response;
    }
}

const editCategoryInDB = async (userId, newCategory, oldCategory, query) => {
    try {
        return await db.sequelize.query(query, 
            { replacements: [newCategory, oldCategory, userId]})
    } catch (error) {
        return error.response
    }
}

module.exports = {
    doesCategoryExist,
    addCategoryToDB,
    editCategoryInDB
}