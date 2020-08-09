import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://localhost:5003'
})

// const instance = axios.create({
//     baseURL : 'https://userdeptassignment-be.herokuapp.com/'
// })

export default instance