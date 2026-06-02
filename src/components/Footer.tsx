import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ padding: "4rem 0", backgroundColor: "#070606", borderTop: "1px solid rgba(217, 187, 151, 0.05)", color: "rgba(217, 187, 151, 0.4)", fontSize: "0.85rem", fontWeight: 300 }}>
      <div className="container">
        <div className="footer-grid-layout">
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ position: "relative", width: "3.2rem", aspectRatio: "1/1.2", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(217, 187, 151, 0.1)" }}>
              <Image 
                src="/logo.jpg" 
                alt="I.J_Stories Official Monogram" 
                fill 
                sizes="52px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <h4 className="font-syne text-cream" style={{ fontSize: "1.25rem", fontWeight: 700 }}>I.J_Stories</h4>
            <p style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
              A multidisciplinary creative ecosystem building modern brands that feel human. Designed for global impact.
            </p>
          </div>

          <div>
            <h5 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--cream)", letterSpacing: "0.1em", marginBottom: "1.25rem" }} className="uppercase">Navigations</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.75rem" }}>
              <Link href="/portfolio" className="hover:text-orange">Portfolio</Link>
              <Link href="/about" className="hover:text-orange">About us</Link>
              <Link href="/team" className="hover:text-orange">Team</Link>
            </div>
          </div>

          <div>
            <h5 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--cream)", letterSpacing: "0.1em", marginBottom: "1.25rem" }} className="uppercase">Core Ecosystem</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.75rem" }}>
              <p>Identity & Design</p>
              <p>Film & Photography</p>
              <p>3D Spatial Media</p>
              <p>Founder Branding</p>
            </div>
          </div>

          <div>
            <h5 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--cream)", letterSpacing: "0.1em", marginBottom: "1.25rem" }} className="uppercase">Channels</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.75rem" }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-orange">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-orange">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-orange">Twitter (X)</a>
              <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-orange">Behance</a>
            </div>
          </div>

        </div>

        <div className="footer-bottom-flex">
          <p>© {new Date().getFullYear()} I.J_Stories Studio Network. All rights reserved.</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="#" className="hover:text-orange">Privacy Policy</Link>
            <Link href="#" className="hover:text-orange">Terms of Service</Link>
            <p style={{ color: "var(--orange)" }}>Designed for Human Sensation</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
