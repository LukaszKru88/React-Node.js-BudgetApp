const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'expense',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
        expense_category_assigned_to_user_id: {
            type: Sequelize.INTEGER,
        },
        payment_method_assigned_to_user_id: {
            type: Sequelize.INTEGER,
        },
        amount: {
            type: Sequelize.DECIMAL,
        },
        date: {
            type: Sequelize.DATE,
        },
        comment: {
            type: Sequelize.STRING,
        }
    },
    {
        timestamps: false
    }
)