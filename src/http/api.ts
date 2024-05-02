import { config } from '@/config/config';
import axios from 'axios';

const api = axios.create({
    baseURL: config.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (data: { email: string; password: string }) => {
    return api.post('api/user/login ', data);
};

export const register = async (data: {
    email: string;
    password: string;
    name: string;
}) => {
    return api.post('api/user/register', data);
};
