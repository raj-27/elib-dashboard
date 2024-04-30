import { createBrowserRouter } from 'react-router-dom';
import { BookPage, HomePage, LoginPage, RegisterPage } from './pages';
import DashboardLayout from './Layouts/DashboardLayout';
import AuthLayout from './Layouts/AuthLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                path: 'home',
                element: <HomePage />,
            },
            {
                path: 'books',
                element: <BookPage />,
            },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },
]);
