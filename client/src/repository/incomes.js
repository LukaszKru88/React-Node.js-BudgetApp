const incomes = [
    { id: 1, date: "2019-07-15", amount: 123.35, category: "sprzedaż allegro", comment: "" },
    { id: 2, date: "2019-07-10", amount: 4122.33, category: "wypłata", comment: "wynagrodzenie lipiec" },
    { id: 3, date: "2019-07-03", amount: 2123.35, category: "sprzedaż olx", comment: "sprzedaż roweru" },
]

function getIncomes() {
    return incomes;
}

module.exports = {
    getIncomes,
}