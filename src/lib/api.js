import Axios from 'axios';
import { BASE_URL } from './config';

const ls = window.localStorage.getItem('token');


const AxiosAuth = Axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Token ${JSON.parse(ls)}`
    }
});

export const api = {
    init: async () => {
        const result = await AxiosAuth.get('/api/adv/init');
        return result.data;
    },
    move: async (direction) => {
        const result = await AxiosAuth.post('/api/adv/move/', { direction });
        return result.data;
    }
}