"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { parseWithZod} from "@conform-to/zod"
import { bannerSchema, productSchema } from "./lib/zodSchemas"
import prisma from "./lib/db"
import { redis } from "./lib/redis"
import { Cart } from "./lib/interfaces"
import { revalidatePath } from "next/cache"

export async function createProduct(prevState: unknown, formData: FormData) {
    const { getUser} = getKindeServerSession()
    const user = getUser()
    if (!user || (await user).email !== 'zulfanisious20@gmail.com' ) {
        return redirect('/')
    }
    const submission = parseWithZod( formData, {
        schema: productSchema
    })

    if(submission.status !== 'success' ) {
        return submission.reply()
    }
    const flattenUrls = submission.value.images.flatMap((urlString) => urlString.split(",").map(
        (url) => url.trim()
    ))
    await prisma.product.create({
        data: {
            name: submission.value.name,
            description: submission.value.description,
            status: submission.value.status,
            price: submission.value.price,
            images: flattenUrls,
            category: submission.value.category,
            isFeatured: submission.value.isFeatured,     
        }
    })
    redirect("/dashboard/products")
}

export async function editProduct(prevState: any, formData: FormData) {
    const { getUser} = getKindeServerSession()
    const user = getUser()
    if (!user || (await user).email !== 'zulfanisious20@gmail.com' ) {
        return redirect('/')
    }
    
    const submission = parseWithZod(formData, {
        schema: productSchema,
    })
    
    if(submission.status !== "success") {
        return submission.reply()
    }

    const flattenUrls = submission.value.images.flatMap((urlString) => urlString.split(",").map(
        (url) => url.trim()
    ))

    const productId = formData.get('productId') as string
    await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            name: submission.value.name,
            description: submission.value.description,
            status: submission.value.status, 
            price: submission.value.price,
            images: flattenUrls,
            category: submission.value.category,
            isFeatured: submission.value.isFeatured === true ? true : false,
        }
    })

    redirect("/dashboard/products")
}

export async function deleteProduct(formData: FormData) {
    const { getUser} = getKindeServerSession()
    const user = getUser()
    if (!user || (await user).email !== 'zulfanisious20@gmail.com' ) {
        return redirect('/')
    }
    await prisma.product.delete({
        where: {
            id: formData.get("productId") as string
        }
    })
    redirect("/dashboard/products")

}

export async function createBanner(prevState: any, formData: FormData) {
    const { getUser} = getKindeServerSession()
    const user = getUser()
    if (!user || (await user).email !== 'zulfanisious20@gmail.com' ) {
        return redirect('/')
    }
    const submission = parseWithZod(formData, {
        schema: bannerSchema,

    })

    if(submission.status !== "success") {
        return submission.reply()
    }
    await prisma.banner.create({
        data: {
            title: submission.value.title,
            imageString: submission.value.imageString,
        }
    })
    redirect("/dashboard/banner") 
}

export async function deleteBanner(formData: FormData) { 
    const { getUser} = getKindeServerSession()
    const user = getUser()
    if (!user || (await user).email !== 'zulfanisious20@gmail.com' ) {
        return redirect('/')
    }
    await prisma.banner.delete({
        where: {
            id: formData.get('bannerId') as string
        }
        })
    redirect("/dashboard/banner")
}

export async function addItem(productId : string) {
    const { getUser} = getKindeServerSession()
    const user = getUser()  
    if (!user ) {
        return redirect('/')
    }
    let cart: Cart | null = await redis.get(`cart-${(await user).id}`)
    const selectedProduct = await prisma.product.findUnique({
        select: {
            id: true,
            name: true,
            price: true,
            images: true
        },
        where: {
            id: productId
        }
    })
    if(!selectedProduct ) {
        throw new Error('the product does not exist')
    }
    let myCart = {} as Cart
    //if user doesn't have cart create a new cart
    if(!cart  || !cart.items) {
        myCart = {
            userId : (await user).id,
            items : [
                {
                    price: selectedProduct.price,
                    id: selectedProduct.id,
                    imageString: selectedProduct.images[0],
                    name: selectedProduct.name,
                    quantity: 1
                }
            ]
        }
    } 
    //if the user already has a cart
    else {
        let itemFound = false
        myCart.items = cart.items.map((item) => {
            if(item.id === productId) {
                itemFound =true
                item.quantity +=1 
            }
            return item
        })
        if(!itemFound) {
            myCart.items.push({
                id: selectedProduct.id,
                price: selectedProduct.price,
                imageString: selectedProduct.images[0],
                name: selectedProduct.name,
                quantity: 1
            })
        }
    }

    
    await redis.set(`cart-${(await user).id}`, myCart)
    revalidatePath("/", "layout")
}


export async function delItem(formData : FormData) {
    const { getUser} = getKindeServerSession()
    const user = getUser()
    if(!user) {
        return redirect('/')
    }
    const productId = formData.get('productId') as string
    let cart : Cart |null  = await redis.get(`cart-${(await user).id}`)

    if(cart && cart.items) {
        const updateCart: Cart = {
            userId: (await user).id,
            items: cart.items.filter((item) => item.id !== productId)
        }
        await redis.set(`cart-${(await user).id}`, updateCart)
    }
    revalidatePath("/", "layout")
}

export async function checkOut(formData: FormData) {
    const { getUser} = getKindeServerSession()
    const user = getUser()
    if(!user) {
        return redirect('/')
    }
    
}