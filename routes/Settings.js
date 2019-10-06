const express = require('express');
const settings = express.Router();
const cors = require('cors');
const { doesCategoryExist, addCategoryToDB, editCategoryInDB } = require('../queries/settingsMethods');
const { getCategoryIdQuery, getAddCategoryQuery, getEditCategoryQuery } = require('../queries/settingsQueries');
settings.use(cors());

settings.post('/settings', async (req, res) => {
    const { userId, newCategory, categoriesType } = req.body;
    let category;

    try {
        const idQuery = getCategoryIdQuery(categoriesType);
        category = await doesCategoryExist(userId, newCategory, idQuery);

        if(category[0].length >= 1){
            throw new Error("Category already exists!");
        } else {
            const addQuery = getAddCategoryQuery(categoriesType);
            category = await addCategoryToDB(userId, newCategory,addQuery);
            res.status(200).send(category);
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

settings.put('/settings', async (req, res) => {
    const { userId, newCategory, oldCategory, categoriesType } = req.body;
    let category;
    
    try {
        if(oldCategory === newCategory) 
            throw new Error("New category name should be different from old one!");
            
        const idQuery = getCategoryIdQuery(categoriesType);
        category = await doesCategoryExist(userId, newCategory, idQuery);

        if(category[0].length >= 1){
            throw new Error("Category already exists!");
        } else {
            const editQuery = getEditCategoryQuery(categoriesType);
            category = await editCategoryInDB(userId, newCategory, oldCategory, editQuery);
            res.status(200).send(category);
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = settings;