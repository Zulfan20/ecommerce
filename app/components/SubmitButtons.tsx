"use client"
import { Button } from "@/components/ui/button"
import { Loader2, ShoppingBag } from "lucide-react"
import { useFormStatus } from "react-dom"

interface buttonProps {
    text: string;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}


export function SubmitButton({text, variant}: buttonProps) {
    const { pending} = useFormStatus()
    return (
        <>
         { pending ? (
            <Button disabled variant={variant} >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                please wait
            </Button>
         ) : (
            <Button variant={variant} type="submit">
            {text}
            </Button>
         )

         }
        </>
    )
} 

export function ShoppingBagButton() {
    const {pending} = useFormStatus()
    return(
        <>
        {pending ? (
            <Button size="lg" className="w-full mt-5">
                <Loader2 className="mr-4 h-5 w-5 animate-spin" /> Add to Cart
                </Button>
        ) : (
            <Button size="lg" className="w-full mt-5" type="submit">
                <ShoppingBag className="mr-4 h-5 w-5" /> Add to Cart
            </Button>
        )}
        </>
    )
}

export function DeleteItem() {
    const {pending} = useFormStatus()
    return (
        <>
        {
            pending ? (
                <Button disabled className="font-medium text-white">
                    Removing...
                </Button>
                
            ) : (
                <Button className="font-medium text-white">delete</Button>

            )
        }
        </>
    )
}