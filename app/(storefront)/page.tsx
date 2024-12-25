import { CategorySelectio } from "./CategorySelection";
import { FeaturedProducts } from "./FeaturedProducts";
import { Hero } from "./Hero";

export default function IndexPage() {
    return (
        <div>
            <Hero />
            <CategorySelectio />
            <FeaturedProducts />
            
        </div>
    )
}