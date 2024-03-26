import axios from 'axios';

const axiosConfig=axios.create({
    baseURL:'http://localhost:3001/v1'
})

export default axiosConfig;
