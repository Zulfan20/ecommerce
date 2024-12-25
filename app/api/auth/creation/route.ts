//to create user

import prisma from "@/app/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server"


export async function GET() {
    const {getUser} = getKindeServerSession()
    const user = getUser()

    if (!user || user === null || !(await user).id) {
        throw new Error("User not found")
    }

    let dbUser = await prisma.user.findUnique({
        where:{
            id: (await user).id
        }
    })
    if(!dbUser){
        dbUser = await prisma.user.create({
            data:{
                id: (await user).id,
                firstName: (await user).given_name ?? "",
                lastName: (await user).family_name ?? "",
                email: (await user).email ?? "",
                profileImage: (await user).picture ??  `https://avatar.vercel.sh/${(await user).given_name}` ,
            }
        })
    }
    return NextResponse.redirect(`http://localhost:3000/dashboard`)
}