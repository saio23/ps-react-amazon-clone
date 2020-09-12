import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-amazfclone-a7c3d.cloudfunctions.net/api' //api url (cloud function)

    // http://localhost:5001/amazfclone-a7c3d/us-central1/api' local changes
});

export default instance;