import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    timeout: 10000,
});

const customAxiosPost = instance.create({
    headers : {
        'Content-Type' : 'application/json',
    },
    method : "POST",
    withCredentials : true
});

const customAxiosGet = instance.create({
    method : "GET",
});

const customAxiosDelete = instance.create({
    method : "delete",
    withCredentials : true
});

export {
    instance,
    customAxiosPost,
    customAxiosGet,
    customAxiosDelete
}