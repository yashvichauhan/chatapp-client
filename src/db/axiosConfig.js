import axios from 'axios'

//assign auth_token
const token=localStorage.getItem('token');
const AUTH_TOKEN = "Bearer "+token;

const instance = axios.create({
    baseURL:'http://localhost:4004/',
    headers: {
        'Content-Type':'application/json',
        'Authorization':AUTH_TOKEN,
    },
})

export default instance;