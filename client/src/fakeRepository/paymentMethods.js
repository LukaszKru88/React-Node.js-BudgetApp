const paymentMethods = [
    { id: 1, name: 'karta płatnicza' },
    { id: 2, name: 'karta kredytowa' },
    { id: 3, name: 'gotówka' }
]

function getPaymentMethods() {
    return paymentMethods;
}

module.exports = {
    getPaymentMethods
}