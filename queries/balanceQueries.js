const incomeQuery = `SELECT incomes.id, incomes.date, incomes.amount,incomes_category_assigned_to_users.name, incomes.comment 
                    FROM incomes, incomes_category_assigned_to_users 
                    WHERE incomes.user_id=? 
                    AND incomes.user_id = incomes_category_assigned_to_users.user_id  
                    AND incomes.income_category_assigned_to_user_id=incomes_category_assigned_to_users.id 
                    AND date BETWEEN ? AND ? 
                    ORDER BY incomes.date DESC`;
const expenceQuery = `SELECT expenses.id, expenses.date, expenses.amount, expenses_category_assigned_to_users.name, expenses.comment 
                    FROM expenses, expenses_category_assigned_to_users 
                    WHERE expenses.user_id=? 
                    AND expenses.user_id = expenses_category_assigned_to_users.user_id 
                    AND expenses.expense_category_assigned_to_user_id=expenses_category_assigned_to_users.id 
                    AND date BETWEEN ? AND ?
                    ORDER BY expenses.date DESC`;

const incomeCategoriesQuery = `SELECT id, name FROM incomes_category_assigned_to_users WHERE user_id=?`;
const expenceCategoriesQuery = `SELECT id, name FROM expenses_category_assigned_to_users WHERE user_id=?`;
const paymentMethodsQuery = `SELECT id, name FROM payment_methods_assigned_to_users WHERE user_id=?`;

const incomeCategoryId = `SELECT id FROM incomes_category_assigned_to_users WHERE user_id=? AND name=? LIMIT 1;`;
const expenceCategoryId = `SELECT id FROM expenses_category_assigned_to_users WHERE user_id=? AND name=? LIMIT 1;`;
const paymentMethodId = `SELECT id FROM payment_methods_assigned_to_users WHERE user_id=? AND name=? LIMIT 1;`;


const editIncomeQuery = `UPDATE incomes SET 
                                user_id=?, 
                                income_category_assigned_to_user_id=?, 
                                amount=?, 
                                date=?, 
                                comment=?
                                WHERE id=?;`;
const editExpenceQuery = `UPDATE expenses SET 
                                 user_id=?, 
                                 expense_category_assigned_to_user_id=?, 
                                 payment_method_assigned_to_user_id=?, 
                                 amount=?, 
                                 date=?, 
                                 comment=?
                          WHERE id=?;`;

const deleteIncomeQuery = "DELETE FROM incomes WHERE id=?";
const deleteExpenceQuery = "DELETE FROM expenses WHERE id=?";

const getEditQuery = (formType) => {
    if(formType === "incomes") return editIncomeQuery;
    if(formType === "expences") return editExpenceQuery;
}

const getCategorieIdQuery = (formType) => {
    if(formType === 'incomes') return incomeCategoryId;
    if(formType === 'expences') return { expenceCategoryId, paymentMethodId };
}

const getDeleteQuery = (formType) => {
    if(formType === 'incomes') return deleteIncomeQuery;
    if(formType === 'expences') return deleteExpenceQuery;
}

module.exports = {
    incomeQuery,
    expenceQuery,
    incomeCategoriesQuery,
    expenceCategoriesQuery,
    paymentMethodsQuery,
    getEditQuery,
    getDeleteQuery,
    getCategorieIdQuery,
    incomeCategoryId,
    expenceCategoryId,
    paymentMethodId
}