const expenceCategories = [
    { id: 1, name: 'jedzenie' },
    { id: 2, name: 'czynsz' },
    { id: 3, name: 'energia elektryczna' },
    { id: 4, name: 'woda' },
    { id: 5, name: 'paliwo' }

]

function getExpenceCategories() {
    return expenceCategories;
}

module.exports = {
    getExpenceCategories
}