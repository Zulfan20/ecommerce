"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
  },
  {
    name: "Products",
    href: "/dashboard/products",
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
  },
  
]
export default function DashboardNavigation() {
  const pathName = usePathname()
    return (
    <>
    {links.map((link) => (
        <Link key={link.href} href={link.href} className={cn(link.href === pathName ?
          "text-black" : "text-muted-foreground  hover:text-foreground" 
        )}> {link.name} </Link>
    ))}
    </>
  );
}