import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import { login } from '@/http/api';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';

const LoginPage = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            toast.success('Login Succesfull', {
                duration: 2500,
            });
            navigate('/dashboard/home');
        },
        onError: (err) => {
            toast.error(err.message, {
                duration: 2500,
            });
        },
    });

    const handleSubmit = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        if (!email || !password) {
            toast.error('Field is missing!!', {
                duration: 3000,
            });
        }
        if (email && password) {
            mutation.mutate({ email, password });
        }

        console.log('hello');
    };

    return (
        <section className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                        {mutation.isError && (
                            <span className="inline-block text-red-500">
                                {mutation.error?.message}
                            </span>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            ref={emailRef}
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            ref={passwordRef}
                            id="password"
                            type="password"
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full">
                        <Button
                            className="w-full"
                            onClick={handleSubmit}
                            disabled={mutation.isPending}>
                            {mutation.isPending && (
                                <LoaderCircle className="animate-spin" />
                            )}
                            <span className={`${mutation.isPending && 'ml-2'}`}>
                                Sign in
                            </span>
                        </Button>
                        <div className="mt-4 text-center text-sm">
                            Don't have an account?
                            <Link to={'/auth/register'} className="underline">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </section>
    );
};

export default LoginPage;
