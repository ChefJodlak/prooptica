"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  { number: "01", title: "Precyzja", desc: "Najnowocześniejszy sprzęt diagnostyczny" },
  { number: "02", title: "Tradycja", desc: "20 lat doświadczenia" },
  { number: "03", title: "Ekspertyza", desc: "Licencjonowani optometryści" },
  { number: "04", title: "Jakość", desc: "50+ prestiżowych marek" },
]

export function Intro() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: contentRef.current,
        pinSpacing: true,
      })

      // Timeline for sequential animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
        }
      })

      // Animate elements in sequence (only opacity, no movement)
      tl.fromTo(imageRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1 }
      )
      .fromTo(headerRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1 },
        "-=0.5"
      )
      .fromTo(textRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1 },
        "-=0.5"
      )
      
      // Animate items one by one
      itemRefs.current.forEach((item, i) => {
        if (item) {
          tl.fromTo(item, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.8 },
            i === 0 ? "-=0.5" : "-=0.4"
          )
        }
      })

      // Animate CTA last
      tl.fromTo(ctaRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1 },
        "-=0.3"
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative">
      <div 
        ref={contentRef} 
        className="h-screen w-full bg-[#FAFAFA] flex items-center"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Image */}
            <div 
              ref={imageRef}
              className="relative h-[50vh] lg:h-[70vh] overflow-hidden rounded-2xl opacity-0"
            >
              <Image 
                src="/salons/grojec-1.jpg" 
                alt="Salon Prooptica" 
                fill 
                className="object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-lg">
                  <p className="font-display text-base text-[#0A0A0A]">
                    <span className="text-[#E31F25] text-xl">"</span>
                    <span className="italic">Okulary to element Twojego stylu.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              
              {/* Header */}
              <div ref={headerRef} className="mb-8 opacity-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12 bg-[#E31F25]" />
                  <span className="text-[#E31F25] text-[11px] font-semibold tracking-[0.3em] uppercase">O nas</span>
                </div>
                <h2 className="font-display text-4xl lg:text-5xl font-light text-[#0A0A0A] leading-[1.1]">
                  Rodzinna firma
                </h2>
                <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#0A0A0A] leading-[1.1]">
                  z pasją do <span className="italic text-[#E31F25]">optyki</span>
                </h2>
              </div>

              {/* Description */}
              <p 
                ref={textRef}
                className="text-[#525252] text-base lg:text-lg leading-relaxed mb-10 max-w-md opacity-0"
              >
                Łączymy precyzję z indywidualnym podejściem. Od 2004 roku dbamy o wzrok tysięcy klientów.
              </p>
              
              {/* Items Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {ITEMS.map((item, i) => (
                  <div
                    key={item.number}
                    ref={(el) => { itemRefs.current[i] = el }}
                    className="p-5 bg-white rounded-xl border border-[#E5E5E5] hover:border-[#E31F25]/30 hover:shadow-lg transition-all duration-300 opacity-0"
                  >
                    <span className="text-[10px] tracking-widest text-[#E31F25] font-bold">{item.number}</span>
                    <h3 className="font-display text-xl text-[#0A0A0A] mt-1">{item.title}</h3>
                    <p className="text-[#737373] text-sm mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div
                ref={ctaRef}
                className="flex items-center justify-between opacity-0"
              >
                <Link href="/o-nas" className="group inline-flex items-center gap-3">
                  <span className="text-[#0A0A0A] text-xs font-semibold tracking-[0.15em] uppercase group-hover:text-[#E31F25] transition-colors">
                    Poznaj nas
                  </span>
                  <div className="w-11 h-11 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center group-hover:border-[#E31F25] group-hover:bg-[#E31F25] transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-[#0A0A0A] group-hover:text-white transition-colors" />
                  </div>
                </Link>
                <div className="flex items-center gap-8">
                  {[
                    { value: "20+", label: "Lat" }, 
                    { value: "4", label: "Salony" }, 
                    { value: "50+", label: "Marek" }
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <span className="font-display text-2xl font-semibold text-[#0A0A0A]">{stat.value}</span>
                      <span className="block text-[9px] tracking-[0.2em] text-[#737373] uppercase">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
