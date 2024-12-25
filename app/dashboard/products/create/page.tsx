"use client"
import { createProduct } from "@/app/actions";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zodSchemas";
import { useState } from "react";
import Image from "next/image";
import { categories } from "@/app/lib/categories";
import { SubmitButton } from "@/app/components/SubmitButtons";

export default function ProductCreateRoute() {
    const [images, setImages] = useState<string[]>([])
    const [lastResult, action] = useActionState( createProduct , undefined ) 
    const [form, fields] = useForm({
        lastResult,
        onValidate({formData}){
            return parseWithZod(formData, {schema: productSchema})

        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput'
    })
    const handleDelete = (index: number) => {
        setImages(images.filter((_, i) => i !== index))

    }

    return ( 
        <form id={form.id} onSubmit={form.onSubmit} action={action} >
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/products">
                    <ChevronLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">new product</h1>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>
                        Product details
                    </CardTitle>
                    <CardDescription>in this form you can create a new product</CardDescription>

                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Label className="font-semibold">name</Label>
                            <Input type="text"
                            key={fields.name.key}
                            name={fields.name.name}
                            defaultValue={fields.name.initialValue}
                            className="w-full" placeholder="product name" / >
                            <p className="text-red-500" > { fields.name.errors }</p>  
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Description</Label>
                            <Textarea
                            key={fields.description.key}
                            name={fields.description.name}
                            defaultValue={fields.description.initialValue}
                            placeholder="Please type your description here..." />
                            <p className="text-red-500" > { fields.name.errors }</p>  
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Price</Label>
                            <Input type="number"
                            key={fields.price.key}
                            name={fields.price.name}
                            defaultValue={fields.price.initialValue}
                            placeholder="$55" className="w-full" />
                            <p className="text-red-500" > { fields.name.errors }</p>  
                        </div>
                        <div className="flex flex-col gap-">
                            <Label className="mb-3">Featured product</Label>
                            <Switch 
                            key={fields.isFeatured.key}
                            name={fields.isFeatured.name}
                            defaultValue={fields.isFeatured.initialValue}
                            />
                            <p className="text-red-500" > { fields.name.errors }</p>  
                        </div>
                        <div className="flex flex-col gap-">
                            <Label className="mb-3">Status</Label>
                            <Select 
                            key={fields.status.key}
                            name={fields.status.name}
                            defaultValue={fields.status.initialValue}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="please select your status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-red-500" > { fields.name.errors }</p>  
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Category</Label>
                            <Select key={fields.category.key} name={fields.category.name} defaultValue={fields.category.initialValue}>
                                <SelectTrigger>
                                    <SelectValue placeholder="select category" />
                                    <SelectContent>
                                        {categories.map( (category) => (
                                            <SelectItem key={category.id} value={category.name}>
                                                {category.title}
                                            </SelectItem>
                                        
                                        ))}
                                    </SelectContent>
                                </SelectTrigger>
                            </Select>
                            <p className="text-red-500" > { fields.name.errors }</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>image</Label>
                            <input type="hidden" value={images} key={fields.images.key}
                            name={fields.images.name} defaultValue={fields.images.initialValue as any}
                            />
                            {images.length > 0 ? (
                                <div className="flex gap-5">
                                    {images.map ((image, index) => (
                                        <div key={index} className="relative w-[100px] h-[100px]">
                                                <Image 
                                                src={image}
                                                height={100}
                                                width={100}
                                                alt="Product Image"
                                                className="w-full h-full object-cover rounded-lg border"
                                                />
                                            <button 
                                            onClick={() => handleDelete(index)}
                                            type="button" className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white">
                                            <XIcon className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}

                                </div>
                            ): (
                                <UploadDropzone endpoint="bannerImageRoute" 
                            onClientUploadComplete={(res) => {
                                setImages(res.map((r) => r.url))
                            }}
                            onUploadError={() => {
                                alert('error uploading')    
                                }}
                            />
                            )}
                            <p className="text-red-500">{ fields.images.errors }</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton text="Create Product" />
                </CardFooter>
            </Card>
        </form>
        )
}
 
 