import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { deleteBanner } from "@/app/actions";

export default async function deleteBannerRoute({params }: {params: {id: string}}) {
    return (
        <div className="h-[80vh] w-full flex items-center justify-center ">
            <Card className="max-2-xl">
                <CardHeader>
                <CardTitle>Are you sure?</CardTitle>
                <CardDescription>This action cannot be undone</CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex justify-between">
                    <Button variant="secondary" asChild>
                        <Link href="/dashboard/products" >cancel</Link>
                    </Button>
                    <form action={deleteBanner} >
                        <input type="hidden" name="bannerId" value={params.id} />
                        <SubmitButton variant={"destructive"} text="Delete Product " />
                      </form>
                </CardFooter>
            </Card>  
        </div>
    )

}