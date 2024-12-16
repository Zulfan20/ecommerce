import React from "react";
import {Sheet, SheetTrigger, SheetContent} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, MenuIcon,CircleUser } from "lucide-react";
import { DropdownMenuItem, DropdownMenuSeparator, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import DashboardNavigation from "../components/dashboard/dashboardNavigation";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import {
  LogoutLink
} from "@kinde-oss/kinde-auth-nextjs/components"
export default async function DashboardLayout({children} : {children: React.ReactNode}) {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  if (!user || user.email !== "zulfanisious20@gmail.com") {
    return redirect("/")
  }
  return (
    <div className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white">
        <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <DashboardNavigation/>
        </nav>
        <Sheet>
          <SheetTrigger>
          <Button className="shrink-0 md:hidden" variant="outline" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
          </SheetTrigger>
          <SheetContent side="left" >
            <nav  className="flex flex-col gap-6 text-lg font-medium mt-5">
              <DashboardNavigation/>
            </nav>
            </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="w-5 h-5" / >
          </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
              <DropdownMenuItem asChild>
                <LogoutLink>Logout</LogoutLink>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        </header>
<main className="my-5">{children}</main>
    </div>
  );
}