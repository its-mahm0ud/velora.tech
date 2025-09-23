"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X, Loader2, LogOut, Heart, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useContext, useEffect, useState } from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, Button } from "./ui";
import { cartContext } from "@/contexts/contextCart";
import { signOut, useSession } from "next-auth/react";




export function NavbarComponent() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<string | null>(null);
  const [isScroll, setIsScroll] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { cartCount, loadingCartCount, wishListtCount, loadingWishListCount, OrdersCountCount, loadingOrdersCount } = useContext(cartContext);
  const { status } = useSession();

  const navItems = [
    { href: "/products", label: "Products" },
    { href: "/brands", label: "Brands" },
    { href: "/categories", label: "Categories" },
  ];

  useEffect(() => {
    if (status == 'authenticated')
      setIsAuthenticated(true)
  }, [status])


  useEffect(() => {
    if (!("theme" in localStorage)) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark")
        setTheme("dark")
      } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        setTheme("light")
      }
    }
    if (("theme" in localStorage)) {
      if (localStorage.getItem("theme") == "dark") {
        document.documentElement.classList.add("dark")
        setTheme("dark")
      } else if (localStorage.getItem("theme") == "light") {
        setTheme("light")

      }
    }
  }, [])
  function toggleMood() {
    document.documentElement.classList.toggle("dark");
    if (theme == "dark") {
      localStorage.setItem("theme", "light")
      setTheme("light")
    } else if (theme == "light") {
      localStorage.setItem("theme", "dark")
      setTheme("dark")
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (scrollY > 0) {
        setIsScroll(true)

      } else {
        setIsScroll(false)

      }
    })
  
  }, [])



  return (
    <div>
      {isAuthenticated && <header className={`sticky  top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${isScroll ? "" : "py-4"} transition-all`}>
        <div>
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    V
                  </span>
                </div>
                <span className="font-bold text-xl">VeloraTech</span>
              </Link>
              {/* Desktop Navigation */}
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                  {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                      <NavigationMenuItem key={item.href}>
                        <Link href={item.href}>
                          <NavigationMenuLink
                            className={cn(
                              "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                              isActive
                                ? "bg-primary text-primary-foreground shadow-md font-semibold"
                                : "bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            )}
                          >
                            {item.label}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  onClick={toggleMood}
                  variant="ghost"
                  size="icon"
                  className="mr-4 rounded-full"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-600" />
                  )}
                </Button>
                {/* User Account */}
                <Link href={"/allorders"} >
                  <Button variant="ghost" size="icon" className="relative">
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                      {loadingOrdersCount ? < Loader2 className=" animate-spin" /> : OrdersCountCount}
                    </span>
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>

                  </Button>
                </Link>
                {/* WishList */}
                <Link href={"/wishlist"} >
                  <Button variant="ghost" size="icon" className="relative">
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                      {loadingWishListCount ? < Loader2 className=" animate-spin" /> : wishListtCount}
                    </span>
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Wishlist</span>

                  </Button>
                </Link>
                {/* Shopping Cart */}
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">

                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                      {loadingCartCount ? < Loader2 className=" animate-spin" /> : cartCount}
                    </span>
                    <span className="sr-only">Shopping cart</span>
                  </Button>
                </Link>
                {/* signOut */}
                <Button onClick={() => signOut()} variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">LogOut</span>
                </Button>
                {/* Mobile Menu */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                  <span className="sr-only">Menu</span>
                </Button>
              </div>
            </div>
          </div>
          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t bg-background">
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>}
    </div>
  )
}
