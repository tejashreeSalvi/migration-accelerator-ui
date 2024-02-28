import axios from "axios";

export const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Access- Control-Allow-Credentials': 'true'
    }, 
    timeout: 300000
};


const serverInstance = axios.create({
    ...axiosConfig,
    baseURL: "http://locahost:5000"
})


export { serverInstance };