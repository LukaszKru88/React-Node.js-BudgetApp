import axios from "axios";

export const register = async newUser => {
    try {
        const callback = await axios.post('users/register', {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        });
        return callback;
    } catch (error) {
        return error.response;
    }
}

export const login = async user => {
    try {
        const token = await axios.post('users/login', {
            email: user.email,
            password: user.password
        });
        localStorage.setItem('userToken', token.data)
        return token;
    } catch (error) {
        return error.response;
    }
}