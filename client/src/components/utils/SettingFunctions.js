import axios from 'axios';

export const addCategory = async( user, newCategory, categoriesType ) => {
    const {id: userId} = user;
    try {
        return await axios.post('settings/settings', {
            userId, newCategory, categoriesType
        });
    } catch (error) {
        return error.response;
    }
}

export const editCategory = async (user, newCategory, oldCategory, categoriesType ) => {
    const {id: userId} = user;
    try {
        return await axios.put('settings/settings', {
            userId, newCategory, oldCategory, categoriesType
        });
    } catch (error) {
        return error.response;
    }
}