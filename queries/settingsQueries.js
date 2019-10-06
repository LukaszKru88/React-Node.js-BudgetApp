const incomeCategoryIdQuery = "SELECT id FROM incomes_category_assigned_to_users WHERE user_id =? AND name=? LIMIT 1";
const expenceCategoriesIdQuery = "SELECT id FROM expenses_category_assigned_to_users WHERE user_id =? AND name=? LIMIT 1";
const paymentMethodsIdQuery = "SELECT id FROM payment_methods_assigned_to_users WHERE user_id =? AND name=? LIMIT 1";

const addIncomeCategory = "INSERT INTO incomes_category_assigned_to_users (user_id, name) VALUES (?, ?)";
const addExpenceCategory = "INSERT INTO expenses_category_assigned_to_users (user_id, name) VALUES (?, ?)";
const addPaymentMethod = "INSERT INTO payment_methods_assigned_to_users (user_id, name) VALUES (?, ?)";

const editIncomeCategory = "UPDATE incomes_category_assigned_to_users SET name=? WHERE name=? AND user_id=?";
const editExpenceCategory = "UPDATE expenses_category_assigned_to_users SET name=? WHERE name=? AND user_id=?";
const editPaymentMethod = "UPDATE payment_methods_assigned_to_users SET name=? WHERE name=? AND user_id=?";

const getCategoryIdQuery = (categoriesType) => {
    if(categoriesType === "incomeCategories") return incomeCategoryIdQuery;
    else if(categoriesType === "expenceCategories") return expenceCategoriesIdQuery;
    else if(categoriesType === "paymentMethods") return paymentMethodsIdQuery;
}

const getAddCategoryQuery = (categoriesType) => {
    if(categoriesType === "incomeCategories") return addIncomeCategory;
    else if(categoriesType === "expenceCategories") return addExpenceCategory;
    else if(categoriesType === "paymentMethods") return addPaymentMethod;
}

const getEditCategoryQuery = (categoriesType) => {
    if(categoriesType === "incomeCategories") return editIncomeCategory;
    else if(categoriesType === "expenceCategories") return editExpenceCategory;
    else if(categoriesType === "paymentMethods") return editPaymentMethod;    
}

module.exports = {
    getCategoryIdQuery,
    getAddCategoryQuery,
    getEditCategoryQuery
}