import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register } from '@/http/api';
import useTokenStore from '@/store';
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const setToken = useTokenStore((state) => state.setToken);

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: (response) => {
            toast.success('Registeration Succesfull', {
                duration: 2500,
            });
            setToken(response.data.accessToken);
            navigate('/dashboard/home');
        },
        onError: (err) => {
            toast.error(err.message, {
                duration: 2500,
            });
        },
    });

    const handleRegisterSubmit = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const name = nameRef.current?.value;
        if (!email || !password || !name) {
            toast.error('Field is missing!!', {
                duration: 3000,
            });
        }
        if (email && password && name) {
            mutation.mutate({ email, password, name });
        }
    };

    return (
        <section className="flex justify-center items-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                        {mutation.isError && (
                            <span className="inline-block text-red-500">
                                {mutation.error.message}
                            </span>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">Name</Label>
                            <Input
                                ref={nameRef}
                                id="first-name"
                                placeholder="Max"
                                required
                            />
                        </div>
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
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            onClick={handleRegisterSubmit}
                            disabled={mutation.isPending}>
                            {mutation.isPending && (
                                <LoaderCircle className="animate-spin" />
                            )}
                            <span className={`${mutation.isPending && 'ml-2'}`}>
                                Create an account
                            </span>
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?
                        <Link to={'/auth/login'} className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export default RegisterPage;
