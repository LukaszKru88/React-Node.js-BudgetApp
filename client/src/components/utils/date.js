const generateDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() >= 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1}-${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}`
}

const getDate = (dateRange) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    let correctedStartMonth = 0;
    let correctedEndMonth = 0;
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let correction = 0;
    let startDate = "";
    let endDate = "";
     
    switch(dateRange){
      case "bieżący miesiąc ":
        correction = 0;
        correctedStartMonth = month + correction;
        correctedEndMonth = correctedStartMonth;
        break;
      case "poprzedni miesiąc ":
        correction = -1;
        correctedStartMonth = month + correction;
        correctedEndMonth = correctedStartMonth;
        break;
      case "ostatnie 3 miesiące ":
        correction = -3;
        correctedStartMonth = month + correction;
        correctedEndMonth = month - 1;
        break;
      case "zakres z kalendarza ":
        console.log(dateRange);
        break;
      default:
        correction = 0;
        correctedStartMonth = month + correction;
        correctedEndMonth = correctedStartMonth;
    }
    
    day = new Date(year, correctedEndMonth, 0).getDate();
    startDate = `${year}-${correctedStartMonth < 10 ? `0${correctedStartMonth}` : `${correctedStartMonth}`}-01`;
    endDate = `${year}-${correctedEndMonth < 10 ? `0${correctedEndMonth}` : `${correctedEndMonth}`}-${day < 10 ? `0${day}` : `${day}`}`
    return {startDate, endDate};    
}

module.exports = {
    getDate,
    generateDate,
}