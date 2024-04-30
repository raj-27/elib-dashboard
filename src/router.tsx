import { createBrowserRouter } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage } from './pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
]);
