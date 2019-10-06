const paymentMethods = `INSERT INTO payment_methods_assigned_to_users (user_id, name) 
                        SELECT u.id, p.name 
                        FROM users u, payment_methods_default p 
                        WHERE u.id=?`;

const expenceCategories = `INSERT INTO expenses_category_assigned_to_users (user_id, name) 
                           SELECT u.id, e.name 
                           FROM users u, expenses_category_default e
                           WHERE u.id=?`;

const incomeCategories = `INSERT INTO incomes_category_assigned_to_users (user_id, name) 
                          SELECT u.id, i.name 
                          FROM users u, incomes_category_default i 
                          WHERE u.id=?`;

module.exports = {
    paymentMethods,
    expenceCategories,
    incomeCategories
}