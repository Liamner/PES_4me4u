import axios from "axios";

const API_URL = "https://app4me4u.herokuapp.com/api";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDFkZjViZGQ4ZDViNzAwMjNhMzNlOCIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NDE4Mjk5NTEsImV4cCI6MTY0MjAwMjc1MX0.D4EN0Cary22LJbA4dkjLwc460AyVcIryElFcIUAENCg'; //token aqui
const config = {
    headers: {
        Authorization: `Bearer ${token}`
      } 
}

class APIService {
    login(body){
        return axios.post(API_URL + '/login/admin', body);
    }
    
    get(route) {
        return axios.get(API_URL + route, config);
    }
    
    post(route, body) {
        return axios.post(API_URL + route, body, config);
    }

    put(route, body) {
        return axios.put(API_URL + route, body, config);
    }

    delete(route) {
        return axios.delete(API_URL + route, config);
    }
}

export default new APIService();