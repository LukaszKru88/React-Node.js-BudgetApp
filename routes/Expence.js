const express = require('express');
const expence = express.Router();
const cors = require('cors');
const { findCategoryId } = require('../queries/balanceMethods');
const { expenceCategoryId: expenceQuery, paymentMethodId: paymentMethodQuery  } = require('../queries/balanceQueries');
const Expence = require('../models/Expence');
expence.use(cors());


expence.post('/addExpence', async ( req, res ) => {
    const expenceData = {
        user_id: req.body.userId,
        expense_category_assigned_to_user_id: null,
        payment_method_assigned_to_user_id: null,
        amount: req.body.amount,
        date: req.body.date,       
        comment: req.body.comment,
    }
    const category = req.body.category;
    const paymentMethod = req.body.paymentMethod;

    try {
        const categoryId = await findCategoryId(expenceData.user_id, category, expenceQuery);
        const paymentMethodId = await findCategoryId(expenceData.user_id, paymentMethod, paymentMethodQuery);

        if(categoryId && paymentMethodId){
            expenceData.expense_category_assigned_to_user_id = categoryId[0].id;
            expenceData.payment_method_assigned_to_user_id = paymentMethodId[0].id;
            const expence = await Expence.create(expenceData);
            res.send(expence).status(200); 
        }               
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = expence;