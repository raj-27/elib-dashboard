import { config } from '@/config/config';
import useTokenStore from '@/store';
import axios from 'axios';

/* The `const api = axios.create({})` statement is creating an instance of Axios with specific
configuration options. In this case:
- `baseURL: config.baseUrl` sets the base URL for all requests made with this Axios instance. It
allows you to define a base URL that will be prepended to all relative URLs.
- `headers: { 'Content-Type': 'application/json' }` sets the default headers for all requests made
with this Axios instance. In this case, it sets the 'Content-Type' header to 'application/json',
indicating that the data being sent in the request body is in JSON format. */
const api = axios.create({
    baseURL: config.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = useTokenStore.getState().token;
    console.log(token);
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

/**
 * The login function in TypeScript sends a POST request to the 'api/user/login' endpoint with the
 * provided email and password data.
 * @param data - The `data` parameter in the `login` function is an object with two properties:
 * @returns The `login` function is returning the result of a POST request to the 'api/user/login'
 * endpoint with the provided `data` object containing an email and password.
 */
export const login = async (data: { email: string; password: string }) => {
    return api.post('api/user/login ', data);
};

/**
 * The `register` function in TypeScript sends a POST request to the 'api/user/register' endpoint with
 * user registration data.
 * @param data - The `data` parameter in the `register` function is an object with the following
 * properties:
 * @returns The `register` function is returning the result of a POST request to the
 * 'api/user/register' endpoint with the provided `data` object containing email, password, and name.
 */
export const register = async (data: {
    email: string;
    password: string;
    name: string;
}) => {
    return api.post('api/user/register', data);
};

/**
 * The function `getBooks` makes an asynchronous API call to retrieve a list of books.
 */
export const getBooks = async () => api.get('/api/books');

/**
 * The function createBook sends a POST request to the '/api/books' endpoint with the provided data
 * using multipart form data.
 * @param data - The `data` parameter in the `createBook` function likely contains the information
 * needed to create a new book entry. This could include details such as the book title, author, genre,
 * publication date, and any other relevant information about the book that needs to be stored in the
 * database. This data
 * @returns The `createBook` function is returning a promise that makes a POST request to the
 * '/api/books' endpoint with the provided data and headers.
 */
export const createBook = async (data: any) => {
    return api.post('/api/books', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
