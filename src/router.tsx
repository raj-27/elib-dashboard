import { createBrowserRouter } from 'react-router-dom';
import {
    BookPage,
    CreateBook,
    HomePage,
    LoginPage,
    RegisterPage,
} from './pages';
import DashboardLayout from './Layouts/DashboardLayout';
import AuthLayout from './Layouts/AuthLayout';

export const router = createBrowserRouter([
    {
        path: '/dashboard',
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
            {
                path: 'books/create',
                element: <CreateBook />,
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
