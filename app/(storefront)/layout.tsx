import {type ReactNode } from "react";
import { Navbar } from "../components/storefront/Navbar";

export default  function StroeFrontLayout({children}: {children: ReactNode}) {
 return (
    <>
    <Navbar />
    <main className="max-w-7-xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
    </>  
 )
}