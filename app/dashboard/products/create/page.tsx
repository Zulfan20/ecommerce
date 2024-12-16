"use client"
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ProductCreateRoute() {
    return ( 
        <form >
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
                            <Input type="text" className="w-full" placeholder="product name" / > 
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Description</Label>
                            <Textarea placeholder="Please type your description here..." />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Price</Label>
                            <Input type="number" placeholder="$55" className="w-full" />
                        </div>
                        <div className="flex flex-col gap-">
                            <Label className="mb-3">Featured product</Label>
                            <Switch/>
                            
                        </div>
                        <div className="flex flex-col gap-">
                            <Label className="mb-3">Status</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="please select your status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>image</Label>
                            <UploadDropzone endpoint="imageUploader" 
                            onClientUploadComplete={(res) => {
                                alert('finished uploading') 
                            }}
                            onUploadError={() => {
                                alert('error uploading')    
                                }}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">
                        Save
                    </Button>
                </CardFooter>
            </Card>
        </form>
        )
}