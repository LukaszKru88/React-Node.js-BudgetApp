import axios from 'axios';

export const addIncome = async (user, body) => {
    const {amount, date, category, comment} = body
    const {id: userId} = user
    try {
        return await axios.post('income/addIncome', {
            userId, amount, date, category, comment  
        });
    } catch (error) {
        return error.response;
    }
}