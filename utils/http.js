const axios = require('axios');

const http = ( baseurl ) => {
    const instance = axios.create({
        baseURL: baseurl || '',
        timeout: 3000
    });
    
    const post = async (url, body) => {
        try {
            const response = await instance.post(url, body);
            return response;
        } catch (error) {
            console.log(error)
            return error.response;
        }
    }
    return {post}
}

module.exports = http;