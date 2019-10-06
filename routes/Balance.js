const express = require('express');
const balance = express.Router();
const cors = require('cors');
const { getBalance, getCategories, editBalance, deleteBalance, findCategoryId } = require('../queries/balanceMethods');
const { incomeQuery, 
        expenceQuery, 
        incomeCategoriesQuery, 
        expenceCategoriesQuery, 
        paymentMethodsQuery,
        getEditQuery,
        getDeleteQuery,
        getCategorieIdQuery } = require('../queries/balanceQueries');
balance.use(cors());

balance.get('/balanceViewer', async (req, res) => {
    const {id, startDate, endDate} = req.query;
    try {
        const incomes = await getBalance(id, startDate, endDate, incomeQuery);
        const expences = await getBalance(id, startDate, endDate, expenceQuery);
        const incomeCategories = await getCategories(id, incomeCategoriesQuery);
        const expenceCategories = await getCategories(id, expenceCategoriesQuery);
        const paymentMethods = await getCategories(id, paymentMethodsQuery);
        res.status(200).send({ incomes, expences, incomeCategories, expenceCategories, paymentMethods })
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

balance.put('/balanceViewer', async (req, res) => {
    const body = req.body;
    const { user, name, formType, paymentMethod } = body;
    let categoryId, paymentMethodId;

    const categoryQuery = getCategorieIdQuery(formType);
    const editQuery = getEditQuery(formType);

    if(formType === "incomes") {
        categoryId = await findCategoryId(user.id, name, categoryQuery);
    } 
    else if(formType === "expences") {
        categoryId = await findCategoryId(user.id, name, categoryQuery.expenceCategoryId);
        paymentMethodId = await findCategoryId(user.id, paymentMethod, categoryQuery.paymentMethodId);
    }    
    
    try {
        const edited = await editBalance(categoryId, paymentMethodId, body, editQuery);
        res.status(200).send(edited);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

balance.delete('/balanceViewer', async (req, res) => {
    const {data, type} = req.body;
    const query = getDeleteQuery(type);

    try {
        const deleted = await deleteBalance(data.id, query);
        res.send(deleted).status(200);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

module.exports = balance;