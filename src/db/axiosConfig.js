import axios from 'axios'

//assign auth_token
const instance = axios.create({
    baseURL:'http://localhost:4004/',
    headers: {
        'Content-Type':'application/json',
        'Authorization':"Bearer "+localStorage.getItem('token'),
    },
})

export default instance;