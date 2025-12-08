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
import Image from "next/image"

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

  // Show dark background on non-home pages OR when scrolled on home page
  const showDarkBg = !isHomePage || effectiveIsScrolled
  // Show CTA button on non-home pages OR after scrolling 70vh on home page
  const showCTA = !isHomePage || effectiveIsScrolled

  // Logo size: big on homepage when not scrolled, small otherwise
  const showBigLogo = isHomePage && !effectiveIsScrolled
  const logoHeight = showBigLogo ? 36 : 28
  const logoWidth = showBigLogo ? 170 : 150

  return (
    <>
      {/* NAVBAR - Using plain CSS, no animation libraries */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          width: "100%",
          backgroundColor: showDarkBg ? "rgba(26, 26, 26, 0.95)" : "transparent",
          backdropFilter: showDarkBg ? "blur(12px)" : "none",
          WebkitBackdropFilter: showDarkBg ? "blur(12px)" : "none",
          padding: showBigLogo ? "20px 0" : "12px 0",
          boxShadow: showDarkBg ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "none",
          transition: "background-color 0.5s ease, padding 0.5s ease, box-shadow 0.5s ease, backdrop-filter 0.5s ease",
        }}
      >
        {/* Top border line - only on homepage before scroll */}
        {isHomePage && !effectiveIsScrolled && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, #C4A77D, transparent)",
            }}
          />
        )}

        <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link href="/" style={{ position: "relative", zIndex: 50, flexShrink: 0 }}>
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
                              "text-white/60 hover:text-[#C4A77D] data-[state=open]:text-[#C4A77D]",
                              "focus:bg-transparent relative group"
                            )}
                            style={{ transition: "color 0.3s ease" }}
                          >
                            {item.title}
                            <span className="absolute bottom-1.5 left-4 right-4 h-px bg-[#C4A77D] scale-x-0 group-hover:scale-x-100 origin-left" style={{ transition: "transform 0.3s ease" }} />
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="w-[280px] p-4 bg-[#1a1a1a] border border-[#C4A77D]/20">
                              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#C4A77D]/15">
                                <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-[#C4A77D]">{item.title}</span>
                                <div className="h-px flex-1 bg-gradient-to-r from-[#C4A77D]/30 to-transparent" />
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
                        "text-white/60 hover:text-[#C4A77D]",
                        pathname === item.href && "text-[#C4A77D]"
                      )}
                      style={{ transition: "color 0.3s ease" }}
                    >
                      {item.title}
                      <span
                        className={cn(
                          "absolute bottom-1.5 left-4 right-4 h-px bg-[#C4A77D] origin-left",
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
              <Link href="/umow-wizyte">
                <button
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    padding: "8px 20px",
                    backgroundColor: "#C4A77D",
                    border: "none",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <span style={{ position: "relative", zIndex: 10, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1a1a1a" }}>
                    Umów wizytę
                  </span>
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden relative p-3 text-white/60 hover:text-[#C4A77D]"
            style={{ transition: "color 0.3s ease" }}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            display: "block",
          }}
          className="lg:hidden"
        >
          {/* Backdrop */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(8px)",
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "100%",
              backgroundColor: "#1a1a1a",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <Image src="/logo-prooptica.svg" alt="Prooptica" width={120} height={28} style={{ height: "24px", width: "auto" }} />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 text-white/40 hover:text-[#C4A77D]" style={{ transition: "color 0.3s ease" }}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <div style={{ flex: 1, overflowY: "auto", padding: "40px 32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
                <span style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase", color: "#C4A77D" }}>Menu</span>
                <div style={{ height: "1px", flex: 1, background: "linear-gradient(to right, rgba(196,167,125,0.3), transparent)" }} />
              </div>

              <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {NAV_ITEMS.map((item, i) => (
                  <div key={item.title}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "20px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        color: pathname === item.href ? "#C4A77D" : "rgba(255,255,255,0.8)",
                        textDecoration: "none",
                        transition: "color 0.3s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                        <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "24px", fontWeight: 300, color: "rgba(255,255,255,0.2)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "24px", fontWeight: 300, letterSpacing: "0.05em" }}>
                          {item.title}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 opacity-50" />
                    </Link>

                    {item.items && (
                      <div style={{ paddingLeft: "64px", paddingTop: "16px", paddingBottom: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              padding: "8px 0",
                              fontSize: "14px",
                              color: "rgba(255,255,255,0.4)",
                              textDecoration: "none",
                              transition: "color 0.3s ease",
                            }}
                          >
                            <span style={{ width: "16px", height: "1px", backgroundColor: "rgba(255,255,255,0.1)" }} />
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
            <div style={{ padding: "32px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "32px", marginBottom: "32px" }}>
                <a href="tel:+48227200800" style={{ display: "flex", alignItems: "center", gap: "16px", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
                  <div style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>Zadzwoń</span>
                    <span style={{ fontWeight: 500, fontSize: "14px" }}>+48 22 720 08 00</span>
                  </div>
                </a>

                <Link href="/salony" onClick={() => setIsMobileMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "16px", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
                  <div style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>Lokalizacje</span>
                    <span style={{ fontWeight: 500, fontSize: "14px" }}>4 salony</span>
                  </div>
                </Link>
              </div>

              <Link href="/umow-wizyte" onClick={() => setIsMobileMenuOpen(false)}>
                <button
                  style={{
                    width: "100%",
                    padding: "20px",
                    backgroundColor: "#C4A77D",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#1a1a1a" }}>
                    Umów wizytę
                  </span>
                </button>
              </Link>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "24px" }}>
                <div style={{ height: "1px", width: "32px", backgroundColor: "rgba(255,255,255,0.1)" }} />
                <span style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>Od 2004 roku</span>
                <div style={{ height: "1px", width: "32px", backgroundColor: "rgba(255,255,255,0.1)" }} />
              </div>
            </div>
          </div>
        </div>
      )}
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
              "group flex flex-row items-center gap-2 px-3 py-2.5 leading-none no-underline outline-none hover:bg-[#C4A77D]/10 border-b border-[#C4A77D]/10 last:border-b-0",
              className
            )}
            style={{ transition: "background-color 0.3s ease" }}
            {...props}
          >
            <span className="text-[12px] font-medium text-[#ccc] group-hover:text-[#C4A77D] whitespace-nowrap" style={{ transition: "color 0.3s ease" }}>
              {title}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C4A77D] opacity-0 group-hover:opacity-100 flex-shrink-0" style={{ transition: "opacity 0.3s ease" }} />
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"
