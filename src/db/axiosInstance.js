import axios from 'axios'

const Instance = axios.create({
    baseURL:'https://chatapp-789ae.firebaseio.com'
});

export default Instance;