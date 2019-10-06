const expences = [
    { id: 1, date: "2019-07-22", amount: 45.50, category: "jedzenie", paymentMethod: "gotówka", comment: "" },
    { id: 2, date: "2019-07-12", amount: 123.34, category: "woda", paymentMethod: "karta płatnicza", comment: "za ciepłą wodę" },
    { id: 3, date: "2019-07-07", amount: 223.35, category: "paliwo", paymentMethod: "karta kredytowa", comment: "" },
]

function getExpences() {
    return expences;
}

module.exports = {
    getExpences,
}