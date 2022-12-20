import axios from 'axios';

const instance = axios.create({
    baseURL: "https://roysanreality.com/"
});

export default instance;
