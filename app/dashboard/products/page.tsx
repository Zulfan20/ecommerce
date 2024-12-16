"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {DropdownMenuItem, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, UserIcon } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
    return (
        <>
        <div className="flex items-center justify-end">
            <Button asChild className="flex items-center gap-x-2" >
                <Link href="/dashboard/products/create">
                <PlusCircle className="w-3.5 h-3.5"/>
                <span >add product</span>
                </Link>
            </Button>
        </div>
        <Card className="mt-5">
            <CardHeader>
                <CardTitle >Product</CardTitle>
                <CardDescription>Manage your Products and review your sales performance</CardDescription>
            </CardHeader>
            <CardContent>
                <Table> 
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead className="text-end">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <UserIcon className="w-16 h-16"/>
                            </TableCell>
                            <TableCell>Nike Air</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>$200.00</TableCell>
                            <TableCell>25/3/56</TableCell>
                            <TableCell className="text-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4"/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        </>
    )
}