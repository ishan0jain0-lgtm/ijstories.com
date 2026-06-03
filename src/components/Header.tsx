"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "About us", href: "/about" },
    { label: "Team", href: "/team" }
  ];

  return (
    <>
      <header className="studio-header">
        <div className="container flex-row-center-between">
          <Link 
            href="/" 
            className="hover:scale-102 transition-transform duration-300"
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <div style={{ position: "relative", width: "1.8rem", height: "2.16rem", borderRadius: "4px", overflow: "hidden", border: "1px solid rgba(217, 187, 151, 0.15)" }}>
              <Image 
                src="/logo.jpg" 
                alt="I.J_Stories Official Monogram" 
                fill 
                sizes="35px"
                priority
                style={{ objectFit: "cover" }}
              />
            </div>
            <span className="font-syne" style={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--cream)" }}>
              I.J_Stories
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="nav-links-desktop">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`link-hover-effect ${isActive ? "active" : ""}`}
                  style={{ 
                    fontSize: "0.85rem", 
                    fontWeight: isActive ? 700 : 400, 
                    letterSpacing: "0.05em", 
                    color: isActive ? "var(--orange)" : "rgba(217, 187, 151, 0.85)" 
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex-row-center-gap4">
            <Link 
              href="/#contact" 
              className="nav-btn-story"
            >
              Start a Story <ArrowUpRight size={14} />
            </Link>

            {/* Mobile Menu Icon */}
            <button 
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--cream)" }}
              className="md:hidden hover:text-orange transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "var(--black)",
              zIndex: 90,
              paddingTop: "8rem",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem"
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} className="font-syne">
              {links.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontSize: "1.75rem", fontWeight: 700 }}
                  className="hover:text-orange"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <hr style={{ border: "none", borderTop: "1px solid rgba(217, 187, 151, 0.1)" }} />
            <Link 
              href="/#contact" 
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.5rem",
                borderRadius: "0.75rem",
                border: "1px solid rgba(217, 187, 151, 0.2)"
              }}
              className="hover:bg-cream hover:text-black transition-all"
            >
              <span style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">Start a Story</span>
              <ArrowUpRight size={20} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
