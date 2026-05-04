"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "SERVICES", href: "/services" },
  { label: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = 0;
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (pathname === "/") {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }
      lastScrollY = currentScrollY;
      setScrolled(currentScrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${pathname !== "/" ? "shadow-lg" : scrolled ? "shadow-lg" : ""}`}
      style={{
        backgroundColor: pathname === "/" ? (scrolled ? "rgba(255,255,255,0.7)" : "transparent") : "#1f1f1f",
        backdropFilter: pathname === "/" && scrolled ? "blur(10px)" : "none"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <img src="/logo.png" alt="HP Studio" className="h-8 w-auto mr-2" />
            <span className="font-bold text-lg md:text-xl tracking-wider" style={{ fontFamily: "var(--font-family-playfair)" }}>
              <span className={pathname === "/" && scrolled ? "text-black" : "text-white"}>HP </span>
              <span style={{ color: "#FFB936" }}>STUDIO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`${pathname === "/" && scrolled ? "text-black/80 hover:text-black" : "text-white/80 hover:text-white"} text-sm tracking-[0.15em] font-medium transition-colors duration-200 will-change-transform`}
                style={{ color: pathname === link.href ? "#FFB936" : undefined }}
                onClick={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut",
                  });
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-6 py-2 text-xs tracking-[0.15em] font-semibold uppercase rounded-full transition-all duration-300 will-change-transform"
              style={{ backgroundColor: "#FFB936", color: "#0d0d0d" }}
              onClick={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 0.95,
                  duration: 0.1,
                  yoyo: true,
                  repeat: 1,
                  ease: "power2.inOut",
                });
              }}
            >
              BOOK NOW
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={(e) => {
              setMobileOpen(!mobileOpen);
              gsap.to(e.currentTarget, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
              });
            }}
            className={`lg:hidden p-2 rounded-md transition-colors duration-200 will-change-transform ${pathname === "/" && scrolled ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#1a1a1a]/98 backdrop-blur-md border-t border-white/10">
          <div className="flex flex-col items-center py-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-white/80 hover:text-white text-base tracking-[0.15em] font-medium touch-friendly transition-colors`}
                style={{ color: pathname === link.href ? "#FFB936" : undefined }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2 w-full max-w-xs px-6 py-3 text-sm tracking-[0.15em] font-semibold border-2 rounded-full text-center"
              style={{ borderColor: "#FFB936", color: "#FFB936" }}
            >
              BOOK NOW
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
