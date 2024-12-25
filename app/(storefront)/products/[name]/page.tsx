import prisma from "@/app/lib/db"
import { parseAppSegmentConfig } from "next/dist/build/segment-config/app/app-segment-config"
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime"
import { notFound } from "next/navigation"
import { ProductCard } from "../../ProductCard"

async function getData(productCategory: string) {
    switch(productCategory) {
        case "all": {
            const data = await prisma.product.findMany({
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true
                },
                where: {
                    status: "published"
                },

            })
            return {
                title: "All product",
                data: data
            }
        } 

        case "men": {
            const data= await prisma.product.findMany({
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true
                },  
                where: {
                    status: "published",
                    category: "men"
                },
            })
            return {
                title: "Men product",
                data: data
            }
        }
        case "women" : {
            const data = await prisma.product.findMany({
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true
                },
                where: {
                    status: "published",
                    category: "women"
                },
            })
            return {
                title: "Women product",
                data: data
            }
        }
        case "kids" : {
            const data = await prisma.product.findMany({
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true
                },
                where: {
                    status: "published",
                    category: "kids"
                },
            }) 
            return {
                title: "Kids product",
                data: data
            }
        } default : {
            return notFound()
        }
    }
    
}
export default async function CategoriesPage({params} :{params: {name: string}}) {
    const {data, title} = await getData(params.name)
    return (
        <section>
            <h1 className="font-semibold text-3xl my-5">
                {title}
            </h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.map((item) => (
                    <ProductCard item={item} />
                ))}
            </div>
        </section>
    )
}