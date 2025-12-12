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
import { Phone, ArrowUpRight, MapPin } from "lucide-react"
import Image from "next/image"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [hasMounted, setHasMounted] = React.useState(false)
  const isHomePage = pathname === "/"

  // Mark as mounted after hydration to prevent hydration mismatch
  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  // Simple scroll detection - works with any scroll library
  React.useEffect(() => {
    const checkScroll = () => {
      const scrolled = window.scrollY > 50 || document.documentElement.scrollTop > 50
      setIsScrolled(scrolled)
    }

    // Check on mount
    checkScroll()

    // Listen to scroll
    window.addEventListener("scroll", checkScroll, { passive: true })
    
    // Also check periodically in case Lenis doesn't fire scroll events
    const interval = setInterval(checkScroll, 100)

    return () => {
      window.removeEventListener("scroll", checkScroll)
      clearInterval(interval)
    }
  }, [])

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMobileMenuOpen])

  // Use scroll state only after hydration to prevent hydration mismatch
  const effectiveIsScrolled = hasMounted && isScrolled

  // Show dark background on non-home pages OR when scrolled on home page OR when mobile menu is open
  const showDarkBg = !isHomePage || effectiveIsScrolled || isMobileMenuOpen
  // Show CTA button on non-home pages OR after scrolling 70vh on home page
  const showCTA = !isHomePage || effectiveIsScrolled
  
  // Logo size: big on homepage when not scrolled (menu open state doesn't affect size to prevent jump)
  const showBigLogo = isHomePage && !effectiveIsScrolled
  const logoHeight = showBigLogo ? 36 : 28
  const logoWidth = showBigLogo ? 170 : 150

  return (
    <>
      {/* NAVBAR */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999, // Higher than mobile menu
          width: "100%",
          backgroundColor: showDarkBg ? "rgba(26, 26, 26, 0.95)" : "transparent",
          backdropFilter: showDarkBg ? "blur(12px)" : "none",
          WebkitBackdropFilter: showDarkBg ? "blur(12px)" : "none",
          padding: showBigLogo ? "20px 0" : "12px 0",
          boxShadow: showDarkBg ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "none",
          transition: "background-color 0.5s ease, padding 0.5s ease, box-shadow 0.5s ease, backdrop-filter 0.5s ease",
        }}
      >
        {/* Top border line - only on homepage before scroll and when menu is closed */}
        {isHomePage && !effectiveIsScrolled && !isMobileMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, #E31F25, transparent)",
            }}
          />
        )}

        <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link href="/" style={{ position: "relative", zIndex: 10001, flexShrink: 0 }} onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/logo-prooptica.svg"
              alt="Prooptica"
              width={logoWidth}
              height={logoHeight}
              style={{ 
                height: `${logoHeight}px`, 
                width: "auto",
                transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div style={{ width: "24px", height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1))", marginRight: "16px" }} />

            <div className="flex items-center">
              {NAV_ITEMS.map((item) => (
                <React.Fragment key={item.title}>
                  {item.items ? (
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger
                            className={cn(
                              "h-9 bg-transparent px-4 text-[11px] font-medium tracking-[0.15em] uppercase whitespace-nowrap",
                              "text-white/60 hover:text-[#E31F25] data-[state=open]:text-[#E31F25]",
                              "focus:bg-transparent relative group"
                            )}
                            style={{ transition: "color 0.3s ease" }}
                          >
                            {item.title}
                            <span className="absolute bottom-1.5 left-4 right-4 h-px bg-[#E31F25] scale-x-0 group-hover:scale-x-100 origin-left" style={{ transition: "transform 0.3s ease" }} />
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="w-[280px] p-4 bg-[#1a1a1a] border border-[#E31F25]/20">
                              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#E31F25]/15">
                                <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-[#E31F25]">{item.title}</span>
                                <div className="h-px flex-1 bg-linear-to-r from-[#E31F25]/30 to-transparent" />
                              </div>
                              {item.items.map((subItem) => (
                                <ListItem key={subItem.title} title={subItem.title} href={subItem.href} />
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
                        "h-9 px-4 text-[11px] font-medium tracking-[0.15em] uppercase flex items-center whitespace-nowrap relative group",
                        "text-white/60 hover:text-[#E31F25]",
                        pathname === item.href && "text-[#E31F25]"
                      )}
                      style={{ transition: "color 0.3s ease" }}
                    >
                      {item.title}
                      <span
                        className={cn(
                          "absolute bottom-1.5 left-4 right-4 h-px bg-[#E31F25] origin-left",
                          pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        )}
                        style={{ transition: "transform 0.3s ease" }}
                      />
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div style={{ width: "24px", height: "1px", background: "linear-gradient(to left, transparent, rgba(255,255,255,0.1))", marginLeft: "16px" }} />
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center justify-end" style={{ minWidth: "140px" }}>
            {showCTA && (
              <Link href="/umow-wizyte" className="group/nav">
                <button
                  className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_30px_-8px_rgba(227,31,37,0.5)] hover:brightness-110"
                  style={{
                    padding: "10px 24px",
                    backgroundColor: "#E31F25",
                    border: "none",
                  }}
                >
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/nav:translate-x-full transition-transform duration-700 ease-out" />
                  <span className="absolute inset-0 border border-white/20" />
                  <span style={{ position: "relative", zIndex: 10, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "white" }}>
                    Umów wizytę
                  </span>
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle - Animated */}
          <motion.button
            initial={false}
            animate={isMobileMenuOpen ? "open" : "closed"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative p-3 text-white/60 hover:text-[#E31F25] z-50"
            style={{ transition: "color 0.3s ease" }}
          >
            <MotionConfig transition={{ duration: 0.5, ease: "easeInOut" }}>
              <motion.span
                style={{
                  position: "absolute",
                  height: "2px",
                  width: "20px",
                  backgroundColor: "currentColor",
                  top: "50%",
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                }}
                variants={{
                  open: { rotate: 45, y: "-50%" },
                  closed: { rotate: 0, y: -6 },
                }}
              />
              <motion.span
                style={{
                  position: "absolute",
                  height: "2px",
                  width: "20px",
                  backgroundColor: "currentColor",
                  top: "50%",
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                }}
                variants={{
                  open: { opacity: 0 },
                  closed: { opacity: 1 },
                }}
              />
              <motion.span
                style={{
                  position: "absolute",
                  height: "2px",
                  width: "20px",
                  backgroundColor: "currentColor",
                  top: "50%",
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                }}
                variants={{
                  open: { rotate: -45, y: "-50%" },
                  closed: { rotate: 0, y: 6 },
                }}
              />
            </MotionConfig>
          </motion.button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9998, // Just below the navbar
              backgroundColor: "#1a1a1a",
              display: "flex",
              flexDirection: "column",
              paddingTop: "80px", // Space for the fixed header
            }}
            className="lg:hidden"
          >
            {/* Scrollable Content */}
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
              {/* Navigation */}
              <div style={{ padding: "20px", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <span style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase", color: "#E31F25" }}>Menu</span>
                  <div style={{ height: "1px", flex: 1, background: "linear-gradient(to right, rgba(227,31,37,0.3), transparent)" }} />
                </div>

                <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {NAV_ITEMS.map((item, i) => (
                    <div key={item.title}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 0",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                          color: pathname === item.href ? "#E31F25" : "rgba(255,255,255,0.8)",
                          textDecoration: "none",
                          transition: "color 0.3s ease",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "18px", fontWeight: 300, color: "rgba(255,255,255,0.2)" }}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "20px", fontWeight: 300, letterSpacing: "0.05em" }}>
                            {item.title}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 opacity-50" />
                      </Link>

                      {item.items && (
                        <div style={{ paddingLeft: "40px", paddingTop: "8px", paddingBottom: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "6px 0",
                                fontSize: "13px",
                                color: "rgba(255,255,255,0.4)",
                                textDecoration: "none",
                                transition: "color 0.3s ease",
                              }}
                            >
                              <span style={{ width: "12px", height: "1px", backgroundColor: "rgba(255,255,255,0.1)" }} />
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Footer */}
              <div style={{ padding: "20px", borderTop: "1px solid rgba(255,255,255,0.05)", backgroundColor: "#1a1a1a" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
                  <a href="tel:+48227200800" style={{ display: "flex", alignItems: "center", gap: "12px", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
                    <div style={{ padding: "10px", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <Phone className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "2px" }}>Zadzwoń</span>
                      <span style={{ fontWeight: 500, fontSize: "13px" }}>+48 22 720 08 00</span>
                    </div>
                  </a>

                  <Link href="/salony" onClick={() => setIsMobileMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "12px", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
                    <div style={{ padding: "10px", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "2px" }}>Lokalizacje</span>
                      <span style={{ fontWeight: 500, fontSize: "13px" }}>4 salony</span>
                    </div>
                  </Link>
                </div>

                <Link href="/umow-wizyte" onClick={() => setIsMobileMenuOpen(false)} className="group/mobile block">
                  <button
                    className="relative overflow-hidden w-full cursor-pointer transition-all duration-300 hover:shadow-[0_15px_30px_-8px_rgba(227,31,37,0.5)] hover:brightness-110"
                    style={{
                      padding: "14px",
                      backgroundColor: "#E31F25",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/mobile:translate-x-full transition-transform duration-700 ease-out" />
                    <span className="absolute inset-0 border border-white/20" />
                    <span style={{ position: "relative", fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "white" }}>
                      Umów wizytę
                    </span>
                  </button>
                </Link>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
                  <div style={{ height: "1px", width: "24px", backgroundColor: "rgba(255,255,255,0.1)" }} />
                  <span style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>Od 2004 roku</span>
                  <div style={{ height: "1px", width: "24px", backgroundColor: "rgba(255,255,255,0.1)" }} />
                </div>
              </div>
            </div>
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
              "group flex flex-row items-center gap-2 px-3 py-2.5 leading-none no-underline outline-none hover:bg-[#E31F25]/10 border-b border-[#E31F25]/10 last:border-b-0",
              className
            )}
            style={{ transition: "background-color 0.3s ease" }}
            {...props}
          >
            <span className="text-[12px] font-medium text-[#ccc] group-hover:text-[#E31F25] whitespace-nowrap" style={{ transition: "color 0.3s ease" }}>
              {title}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#E31F25] opacity-0 group-hover:opacity-100 shrink-0" style={{ transition: "opacity 0.3s ease" }} />
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"
