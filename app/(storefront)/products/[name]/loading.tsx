import { Skeleton } from "@/components/ui/skeleton";
import { LoadingProductCard } from "../../ProductCard";

export default function LoadingFile() {
    return (
        <div>
            <Skeleton className="h-10 w-56 my-5 " />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
            </div>
        </div>
    )
}