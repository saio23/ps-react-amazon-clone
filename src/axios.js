import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/amazfclone-a7c3d/us-central1/api' //api url (cloud function)
});

export default instance;