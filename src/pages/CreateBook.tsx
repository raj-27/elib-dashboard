import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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
import { Textarea } from '@/components/ui/textarea';
import { createBook } from '@/http/api';
import { useMutation } from '@tanstack/react-query';
import { CirclePlus, CircleX, LoaderCircle } from 'lucide-react';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const CreateBook = () => {
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const genreRef = useRef<HTMLInputElement>(null);
    const coverImageRef = useRef<HTMLInputElement>(null);
    const pdfFileRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: createBook,
        onSuccess: (response) => {
            console.log(response);
            toast.success('New Book Succesfull', {
                duration: 1500,
            });
            navigate('/dashboard/books');
        },
        onError: (err) => {
            console.log('Error');
            toast.error(err.message, {
                duration: 1500,
            });
        },
    });

    const handleCreateBook = () => {
        const title = titleRef.current?.value;
        const description = descriptionRef.current?.value;
        const genre = genreRef.current?.value;
        const coverImage = coverImageRef.current?.files;
        const file = pdfFileRef.current?.files;

        if (!title || !description || !genre || !coverImage || !file) {
            toast.error('Field is missing', {
                duration: 1200,
            });
            return;
        } else {
            const data = {
                title,
                description,
                genre,
                coverImage: coverImage[0],
                file: file[0],
            };
            // console.log(data);
            mutation.mutate(data);
        }
    };
    return (
        <section>
            <div className="flex justify-between items-center">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link to={'/dashboard/home'}>Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link to={'/dashboard/books'}>Books</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <BreadcrumbPage>Create</BreadcrumbPage>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <Link to={'/dashboard/books'}>
                        <Button variant={'outline'}>
                            <CircleX />
                            <span className="ml-2">Cancel</span>
                        </Button>
                    </Link>
                    <Button
                        onClick={handleCreateBook}
                        disabled={mutation.isPending}>
                        {mutation.isPending ? (
                            <LoaderCircle className="animate-spin" />
                        ) : (
                            <CirclePlus size={18} />
                        )}
                        <span className="ml-2">Submit</span>
                    </Button>
                </div>
            </div>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Create a new book</CardTitle>
                    <CardDescription>
                        Fill out the form to create a new book
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Card x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                            <CardTitle>Book Details</CardTitle>
                            {/* <CardDescription>
                                Lipsum dolor sit amet, consectetur adipiscing
                                elit
                            </CardDescription> */}
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        ref={titleRef}
                                        id="title"
                                        type="text"
                                        className="w-full"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="genre">Genre</Label>
                                    <Input
                                        ref={genreRef}
                                        id="genre"
                                        type="text"
                                        className="w-full"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        className="min-h-32"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="coverImage">
                                        Cover Image
                                    </Label>
                                    <Input
                                        type="file"
                                        id="coverImage"
                                        ref={coverImageRef}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="pdfFile">PDF File</Label>
                                    <Input
                                        type="file"
                                        id="pdfFile"
                                        ref={pdfFileRef}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </section>
    );
};

export default CreateBook;
