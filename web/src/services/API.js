import axios from "axios";



const API_URL = "https://app4me4u.herokuapp.com/api";
const token = getToken();
const config = {
    headers: {
        Authorization: `Bearer ${token}`
      } 
}

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    return JSON.parse(tokenString);
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