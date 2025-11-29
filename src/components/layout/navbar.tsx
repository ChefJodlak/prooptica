"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { NAV_ITEMS } from "@/lib/constants/navigation"
import { Button } from "@/components/ui/button"
import { Menu, Phone, X, ArrowUpRight } from "lucide-react"
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion"
import Image from "next/image"

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          isScrolled
            ? "bg-[#0A0A0A] py-3" 
            : "bg-[#0A0A0A]/90 backdrop-blur-md py-4"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex-shrink-0">
            <Image 
              src="/logo-prooptica.svg" 
              alt="Prooptica" 
              width={130} 
              height={28}
              className="h-6 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Compact */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <React.Fragment key={item.title}>
                {item.items ? (
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger 
                          className={cn(
                            "h-8 bg-transparent px-3 text-[12px] font-medium tracking-wider uppercase transition-all duration-300 whitespace-nowrap",
                            "text-white/70 hover:text-white data-[state=open]:text-[#E31F25]",
                            "focus:bg-transparent"
                          )}
                        >
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="w-[380px] p-4 bg-[#0A0A0A] border border-white/10">
                            {item.items.map((subItem) => (
                              <ListItem
                                key={subItem.title}
                                title={subItem.title}
                                href={subItem.href}
                              >
                                {subItem.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                ) : (
                  <Link 
                    href={item.href} 
                    className={cn(
                      "h-8 px-3 text-[12px] font-medium tracking-wider uppercase transition-all duration-300 flex items-center whitespace-nowrap",
                      "text-white/70 hover:text-white",
                      pathname === item.href && "text-[#E31F25]"
                    )}
                  >
                    {item.title}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* CTA */}
          <Button 
            className="hidden lg:flex font-medium tracking-wider uppercase text-[11px] px-5 h-8 bg-[#E31F25] hover:bg-[#c91b20] text-white border-0 transition-all duration-300 flex-shrink-0"
          >
            Umów wizytę
          </Button>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-white hover:text-[#E31F25] transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[#0A0A0A] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <Image 
                  src="/logo-prooptica.svg" 
                  alt="Prooptica" 
                  width={110} 
                  height={24}
                  className="h-5 w-auto"
                />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white/50 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Navigation */}
              <div className="flex-1 overflow-y-auto py-6 px-5">
                <nav className="space-y-1">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link 
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between py-3 text-base font-medium tracking-wide transition-colors border-b border-white/5",
                          pathname === item.href 
                            ? "text-[#E31F25]" 
                            : "text-white hover:text-[#E31F25]"
                        )}
                      >
                        {item.title}
                        <ArrowUpRight className="w-4 h-4 opacity-30" />
                      </Link>
                      
                      {item.items && (
                        <div className="pl-3 pb-3 space-y-2">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-2 text-sm text-white/50 hover:text-[#E31F25] transition-colors"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </nav>
              </div>
              
              {/* Footer */}
              <div className="p-5 border-t border-white/10 space-y-4">
                <a 
                  href="tel:+4822XXXXXXX" 
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <div className="p-2 border border-white/10">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-sm">+48 22 XXX XX XX</span>
                </a>
                
                <Button className="w-full bg-[#E31F25] hover:bg-[#c91b20] text-white py-5 font-medium tracking-wider uppercase text-xs">
                  Umów wizytę
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group flex items-start gap-3 p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5 border-b border-white/5 last:border-b-0",
            className
          )}
          {...props}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm font-medium text-white mb-1 group-hover:text-[#E31F25] transition-colors">
              {title}
              <ArrowUpRight className="w-3 h-3 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs leading-relaxed text-white/50">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
