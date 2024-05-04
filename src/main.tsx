import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './components/theme-provider.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <Toaster />
                <RouterProvider router={router} />
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>
);
