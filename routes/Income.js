const express = require('express');
const income = express.Router();
const cors = require('cors');
const { findCategoryId } = require('../queries/balanceMethods');
const { incomeCategoryId: incomeQuery  } = require('../queries/balanceQueries');
const Income = require('../models/Income');
income.use(cors());


income.post('/addIncome', async ( req, res ) => {
    const incomeData = {
        user_id: req.body.userId,
        income_category_assigned_to_user_id: null,
        amount: req.body.amount,
        date: req.body.date,       
        comment: req.body.comment,
    }
    const category = req.body.category;

    try {
        const categoryId = await findCategoryId(incomeData.user_id, category, incomeQuery);
        if(categoryId){
            incomeData.income_category_assigned_to_user_id = categoryId[0].id;
            const income = await Income.create(incomeData);
            res.send(income).status(200); 
        }               
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = income;