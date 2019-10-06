import axios from 'axios';

export const addExpence = async (user, body) => {
    const {amount, date, category, paymentMethod, comment} = body
    const {id: userId} = user
    try {
        return await axios.post('expence/addExpence', {
            userId, amount, date, category, paymentMethod, comment  
        });        
    } catch (error) {
        return error.response;
    }
}