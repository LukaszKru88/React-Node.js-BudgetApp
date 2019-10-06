import axios from 'axios';

export const getBalance = async (user, startDate, endDate) => {
    try {
        return await axios.get('balance/balanceViewer', {
            params: {
                id: user.id,
                startDate,
                endDate
              }
        });    
    } catch (error) {
        return error.response;
    }       
};

export const editBalance = async (user, body) => {
    const {formType, id, date, amount, paymentMethod, name, comment} = body
    try {
        return await axios.put('balance/balanceViewer', {
            user, formType, id, date, amount, paymentMethod, name, comment 
        });
    } catch (error) {
        return error.response;
    }
}

export const deleteBalance = async (data, type) => {
    try {
        return await axios.delete('balance/balanceViewer', {
           data: {data, type}
        });
    } catch (error) {
        return error.response;
    }
}