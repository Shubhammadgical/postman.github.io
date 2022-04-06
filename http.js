import axios from "axios";

const baseURL = "http://localhost:2410";

function get( url){
    return axios.get(url);
}

function post(url,obj){
    return axios.post(url, obj);
}

function putApi(url,obj){
    return axios.put(baseURL + url, obj);
}
function deleteApi(url,obj){
    return axios.delete(baseURL + url, obj);
}
export default {
    get,
    post,
    deleteApi,
    putApi,
};