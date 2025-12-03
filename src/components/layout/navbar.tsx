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
import { Menu, Phone, X, ArrowUpRight, MapPin } from "lucide-react"
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion"
import Image from "next/image"

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [showCTA, setShowCTA] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const { scrollY } = useScroll()
  const isHomePage = pathname === "/"

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
    // Show CTA button after scrolling past hero section (approximately 80vh)
    setShowCTA(latest > window.innerHeight * 0.7)
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
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.8 }}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-700 ease-out",
          isScrolled
            ? "bg-[#1a1a1a]/95 backdrop-blur-xl py-3 shadow-2xl shadow-black/20" 
            : "bg-transparent py-5"
        )}
      >
        {/* Elegant top border line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 2.2, ease: [0.77, 0, 0.175, 1] }}
          className={cn(
            "absolute top-0 left-0 right-0 h-px origin-left transition-opacity duration-500",
            isScrolled ? "opacity-0" : "opacity-100"
          )}
          style={{ background: "linear-gradient(90deg, transparent, #C4A77D, transparent)" }}
        />
        
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex-shrink-0 group">
            <div className="relative">
              <Image 
                src="/logo-prooptica.svg" 
                alt="Prooptica" 
                width={150} 
                height={32}
                className="h-7 w-auto transition-all duration-500 group-hover:opacity-80"
                priority
              />
              {/* Subtle gold underline on hover */}
              <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#C4A77D] to-transparent group-hover:w-full transition-all duration-700" />
            </div>
          </Link>

          {/* Desktop Navigation - Luxury Style */}
          <nav className="hidden lg:flex items-center">
            {/* Decorative line before nav */}
            <div className="w-6 h-px bg-gradient-to-r from-transparent to-white/10 mr-4" />
            
            <div className="flex items-center">
              {NAV_ITEMS.map((item) => (
                <React.Fragment key={item.title}>
                  {item.items ? (
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger 
                            className={cn(
                              "h-9 bg-transparent px-4 text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-500 whitespace-nowrap",
                              "text-white/60 hover:text-[#C4A77D] data-[state=open]:text-[#C4A77D]",
                              "focus:bg-transparent relative group"
                            )}
                          >
                            {item.title}
                            {/* Elegant underline effect */}
                            <span className="absolute bottom-1.5 left-4 right-4 h-px bg-[#C4A77D] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="w-[280px] p-4 bg-[#1a1a1a] border border-[#C4A77D]/20">
                              {/* Dropdown header */}
                              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#C4A77D]/15">
                                <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-[#C4A77D]">{item.title}</span>
                                <div className="h-px flex-1 bg-gradient-to-r from-[#C4A77D]/30 to-transparent" />
                              </div>
                              {item.items.map((subItem) => (
                                <ListItem
                                  key={subItem.title}
                                  title={subItem.title}
                                  href={subItem.href}
                                />
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
                        "h-9 px-4 text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-500 flex items-center whitespace-nowrap relative group",
                        "text-white/60 hover:text-[#C4A77D]",
                        pathname === item.href && "text-[#C4A77D]"
                      )}
                    >
                      {item.title}
                      {/* Active/hover underline */}
                      <span className={cn(
                        "absolute bottom-1.5 left-4 right-4 h-px bg-[#C4A77D] transition-transform duration-500 origin-left",
                        pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )} />
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Decorative line after nav */}
            <div className="w-6 h-px bg-gradient-to-l from-transparent to-white/10 ml-4" />
          </nav>

          {/* CTA - Luxury Button with scroll-based visibility on homepage */}
          <div className="hidden lg:flex items-center justify-end w-[120px] h-6">
            <AnimatePresence>
              {(!isHomePage || showCTA) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
<Link href="/umow-wizyte">
<button className="group relative overflow-hidden px-5 py-2 transition-all duration-500 whitespace-nowrap flex items-center justify-center">
                                    {/* Background */}
                                    <div className="absolute inset-0 bg-[#C4A77D] transition-transform duration-700 ease-out group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    {/* Text */}
                                    <span className="relative z-10 text-[11px] font-bold tracking-[0.12em] uppercase text-[#1a1a1a] group-hover:text-[#1a1a1a] transition-colors duration-500">
                                      Umów wizytę
                                    </span>
                                  </button>
                </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Mobile Menu Toggle - Luxury */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden relative p-3 text-white/60 hover:text-[#C4A77D] transition-colors duration-500 group"
          >
            <Menu className="h-5 w-5" />
            {/* Decorative corner */}
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-[#C4A77D]/50 transition-colors duration-500" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu - Luxury Full-screen Experience */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel - Full-screen luxury */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 35, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full bg-[#1a1a1a] flex flex-col"
            >
              {/* Decorative texture */}
              <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
              }} />
              
              {/* Decorative vertical line */}
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
                className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C4A77D]/30 to-transparent origin-top"
              />
              
              {/* Header */}
              <div className="relative flex items-center justify-between p-6 border-b border-white/5">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Image 
                    src="/logo-prooptica.svg" 
                    alt="Prooptica" 
                    width={120} 
                    height={28}
                    className="h-6 w-auto"
                  />
                </motion.div>
                
                <motion.button 
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative p-3 text-white/40 hover:text-[#C4A77D] transition-colors duration-500 group"
                >
                  <X className="h-5 w-5" />
                  {/* Decorative corners */}
                  <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-[#C4A77D]/30 transition-colors" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-[#C4A77D]/30 transition-colors" />
                </motion.button>
              </div>
              
              {/* Navigation */}
              <div className="flex-1 overflow-y-auto py-10 px-8">
                {/* Section label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4 mb-10"
                >
                  <span className="text-[9px] font-medium tracking-[0.4em] uppercase text-[#C4A77D]">Menu</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#C4A77D]/30 to-transparent" />
                </motion.div>
                
                <nav className="space-y-2">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.3 + i * 0.08,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      <Link 
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "group flex items-center justify-between py-5 transition-colors duration-500 border-b border-white/5",
                          pathname === item.href 
                            ? "text-[#C4A77D]" 
                            : "text-white/80 hover:text-[#C4A77D]"
                        )}
                      >
                        <div className="flex items-center gap-6">
                          {/* Number */}
                          <span className="font-display text-2xl font-light text-white/20 group-hover:text-[#C4A77D]/40 transition-colors duration-500">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {/* Title */}
                          <span className="font-display text-2xl font-light tracking-wide">
                            {item.title}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                      </Link>
                      
                      {item.items && (
                        <div className="pl-16 py-4 space-y-3">
                          {item.items.map((subItem, si) => (
                            <motion.div
                              key={subItem.title}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + i * 0.08 + si * 0.05 }}
                            >
                              <Link
                                href={subItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="group flex items-center gap-3 py-2 text-sm text-white/40 hover:text-[#C4A77D] transition-colors duration-500"
                              >
                                <span className="w-4 h-px bg-white/10 group-hover:bg-[#C4A77D] group-hover:w-6 transition-all duration-500" />
                                {subItem.title}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </nav>
              </div>
              
              {/* Footer - Luxury contact section */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-8 border-t border-white/5"
              >
                {/* Contact info */}
                <div className="flex items-center gap-8 mb-8">
                  <a 
                    href="tel:+48227200800" 
                    className="group flex items-center gap-4 text-white/50 hover:text-[#C4A77D] transition-colors duration-500"
                  >
                    <div className="relative p-3 border border-white/10 group-hover:border-[#C4A77D]/30 transition-colors duration-500">
                      <Phone className="h-4 w-4" />
                      {/* Corner accents */}
                      <span className="absolute -top-px -left-px w-2 h-2 border-t border-l border-[#C4A77D]/0 group-hover:border-[#C4A77D]/50 transition-colors" />
                      <span className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-[#C4A77D]/0 group-hover:border-[#C4A77D]/50 transition-colors" />
                    </div>
                    <div>
                      <span className="block text-[9px] tracking-[0.2em] uppercase text-white/30 mb-1">Zadzwoń</span>
                      <span className="font-medium text-sm">+48 22 720 08 00</span>
                    </div>
                  </a>
                  
                  <Link 
                    href="/salony" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center gap-4 text-white/50 hover:text-[#C4A77D] transition-colors duration-500"
                  >
                    <div className="relative p-3 border border-white/10 group-hover:border-[#C4A77D]/30 transition-colors duration-500">
                      <MapPin className="h-4 w-4" />
                      <span className="absolute -top-px -left-px w-2 h-2 border-t border-l border-[#C4A77D]/0 group-hover:border-[#C4A77D]/50 transition-colors" />
                      <span className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-[#C4A77D]/0 group-hover:border-[#C4A77D]/50 transition-colors" />
                    </div>
                    <div>
                      <span className="block text-[9px] tracking-[0.2em] uppercase text-white/30 mb-1">Lokalizacje</span>
                      <span className="font-medium text-sm">4 salony</span>
                    </div>
                  </Link>
                </div>
                
                {/* CTA Button */}
                <Link href="/umow-wizyte" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="group relative w-full overflow-hidden py-5 transition-all duration-500 flex items-center justify-center">
                    {/* Background layers */}
                    <div className="absolute inset-0 bg-[#C4A77D]" />
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                    
                    {/* Frame decoration */}
                    <div className="absolute inset-2 border border-[#1a1a1a]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Text */}
                    <span className="relative z-10 text-xs font-bold tracking-[0.25em] uppercase text-[#1a1a1a]">
                      Umów wizytę
                    </span>
                  </button>
                </Link>
                
                {/* Bottom tagline */}
                <div className="flex items-center justify-center gap-3 mt-6">
                  <div className="h-px w-8 bg-white/10" />
                  <span className="text-[9px] tracking-[0.3em] uppercase text-white/20">Od 2004 roku</span>
                  <div className="h-px w-8 bg-white/10" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "group flex flex-row items-center gap-2 px-3 py-2.5 leading-none no-underline outline-none transition-all duration-300 hover:bg-[#C4A77D]/10 border-b border-[#C4A77D]/10 last:border-b-0",
              className
            )}
            {...props}
          >
            <span className="text-[12px] font-medium text-[#ccc] group-hover:text-[#C4A77D] transition-colors duration-300 whitespace-nowrap">
              {title}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C4A77D] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"
