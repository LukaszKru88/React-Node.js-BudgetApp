const incomeCategories = [
    { id: 1, name: 'wypłata' },
    { id: 2, name: 'sprzedaż allegro' },
    { id: 3, name: 'sprzedaż olx' },
    { id: 4, name: 'inne' }
]

function getIncomeCategories() {
    return incomeCategories;
}

module.exports = {
    getIncomeCategories
}