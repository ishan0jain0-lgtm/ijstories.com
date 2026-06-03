"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Send, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const interest = (form.elements.namedItem("interest") as HTMLSelectElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, interest, message })
      });
      
      if (response.ok) {
        setFormSubmitted(true);
        form.reset();
        setTimeout(() => {
          setFormSubmitted(false);
        }, 5000);
      } else {
        alert("Failed to submit transmission. Please verify fields and try again.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission error. Please try again.");
    }
  };

  if (!mounted) return <div style={{ background: "#0b0a0a", minHeight: "100vh" }} />;

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* Premium SVG Noise Overlay */}
      <div className="noise-overlay" />

      <Header />

      {/* Hero Section */}
      <section className="hero-section section-dark">
        {/* Ambient background video */}
        <video
          src="/backgroundvideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.15,
            pointerEvents: "none",
            zIndex: 0
          }}
        />
        {/* Subtle orange ambient glow */}
        <div className="orange-glow w-[500px] h-[500px] top-[-100px] right-[-100px]" />
        <div className="orange-glow w-[600px] h-[600px] bottom-[-200px] left-[-200px]" />
        
        {/* Grid Overlay */}
        <div className="grid-bg" style={{ zIndex: 1 }} />

        <div className="container z-10 py-12">
          <div className="hero-content-wrapper">
            <div className="hero-text-block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="creative-badge">
                  <Sparkles size={12} className="animate-pulse" /> Creative Ecosystem
                </span>
              </motion.div>
              
              <h1 className="hero-title-main font-syne">
                <motion.span
                  style={{ display: "block", color: "var(--cream)" }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  I.J_Stories
                </motion.span>
                <motion.span
                  style={{ display: "block", color: "var(--orange)" }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  Building Brands
                </motion.span>
                <motion.span
                  className="hero-italic-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  that feel human.
                </motion.span>
              </h1>

              <motion.p
                className="hero-description-p"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                From identity to influence. Design. Strategy. Culture. Presence. We forge modern digital landscapes that blend design, storytelling, media, and human connection.
              </motion.p>

              <motion.div
                className="hero-buttons-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Link 
                  href="#contact" 
                  className="btn-primary-glow"
                >
                  Collaborate With Us
                </Link>
                <Link 
                  href="/about" 
                  className="link-hover-effect font-syne"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Our Manifesto <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="contact-section section-dark">
        <div className="orange-glow w-[500px] h-[500px] bottom-[-200px] right-[-100px]" />
        <div className="grid-bg" />

        <div className="container z-10">
          <div className="contact-grid-layout">
            
            {/* Contact Details */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--orange)", display: "inline-block", marginBottom: "0.75rem" }} className="uppercase">
                  Let&apos;s Begin
                </span>
                <h2 className="font-syne text-cream" style={{ fontSize: "3.5rem", fontWeight: 800 }}>
                  Let&apos;s build a brand that feels human<span style={{ color: "var(--orange)" }}>.</span>
                </h2>
                <p style={{ color: "rgba(217, 187, 151, 0.7)", fontWeight: 300, lineHeight: 1.6, marginTop: "1.5rem", fontSize: "1rem", maxWidth: "26rem" }}>
                  Have a vision? Need a complete rebrand, dynamic motion strategy, or custom photographic direction? Get in touch. Our ecosystem is ready.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", paddingTop: "2rem", marginTop: "2rem", borderTop: "1px solid rgba(217, 187, 151, 0.1)" }}>
                <div>
                  <p style={{ fontSize: "10px", color: "rgba(217, 187, 151, 0.4)", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">Send a Message</p>
                  <a href="mailto:hello@ijstories.com" className="font-syne text-cream hover:text-orange transition-colors" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                    hello@ijstories.com
                  </a>
                </div>
                <div>
                  <p style={{ fontSize: "10px", color: "rgba(217, 187, 151, 0.4)", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">Ecosystem Hub</p>
                  <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "var(--cream)" }}>
                    Mumbai • New York • London • Berlin
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Form */}
            <div>
              <div className="contact-form-card">
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form 
                      key="contact-form"
                      onSubmit={handleContactSubmit} 
                      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="contact-row-2col">
                        <div className="form-group-flex">
                          <label htmlFor="name" style={{ fontSize: "10px", color: "rgba(217, 187, 151, 0.6)", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">
                            Your Name
                          </label>
                          <input 
                            type="text" 
                            id="name" 
                            required 
                            className="form-input-studio"
                            placeholder="Alex Mercer"
                          />
                        </div>
                        <div className="form-group-flex">
                          <label htmlFor="email" style={{ fontSize: "10px", color: "rgba(217, 187, 151, 0.6)", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">
                            Email Address
                          </label>
                          <input 
                            type="email" 
                            id="email" 
                            required 
                            className="form-input-studio"
                            placeholder="alex@domain.com"
                          />
                        </div>
                      </div>

                      <div className="form-group-flex">
                        <label htmlFor="interest" style={{ fontSize: "10px", color: "rgba(217, 187, 151, 0.6)", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">
                          What can we build together?
                        </label>
                        <select 
                          id="interest" 
                          className="form-input-studio"
                          style={{ appearance: "none", cursor: "pointer" }}
                        >
                          <option value="brand-identity">Brand Identity & Visuals</option>
                          <option value="creative-direction">Creative Direction & Campaigns</option>
                          <option value="photography-3d">Photography, Video & 3D</option>
                          <option value="full-rebrand">Complete Brand Overhaul</option>
                          <option value="other">Other Creative Collaboration</option>
                        </select>
                      </div>

                      <div className="form-group-flex">
                        <label htmlFor="message" style={{ fontSize: "10px", color: "rgba(217, 187, 151, 0.6)", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">
                          Your Vision
                        </label>
                        <textarea 
                          id="message" 
                          rows={4} 
                          required 
                          className="form-input-studio"
                          style={{ resize: "none" }}
                          placeholder="Tell us about your brand philosophy, goals, and visual aesthetic..."
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="btn-submit-studio"
                      >
                        Transmit Vision <Send size={12} />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success-message"
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 0", textAlign: "center" }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div style={{ width: "4rem", height: "4rem", borderRadius: "50%", backgroundColor: "rgba(179, 74, 38, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)", marginBottom: "1.5rem" }}>
                        <CheckCircle size={36} />
                      </div>
                      <h3 className="font-syne text-cream" style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>Vision Transmitted Successfully</h3>
                      <p style={{ color: "rgba(217, 187, 151, 0.6)", fontWeight: 300, fontSize: "0.85rem", maxWidth: "22rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                        Thank you. Your message has bypassed traditional channels and entered the I.J_Stories creative grid. A director will connect with you soon.
                      </p>
                      <button 
                        onClick={() => setFormSubmitted(false)}
                        style={{ border: "none", background: "none", cursor: "pointer", fontSize: "0.75rem", fontWeight: 700, color: "var(--orange)", letterSpacing: "0.1em" }}
                        className="uppercase link-hover-effect"
                      >
                        Send another transmission
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <CookieConsent />
    </div>
  );
}

// ==========================================
// COOKIE CONSENT COMPONENTS (OGILVY INSPIRED)
// ==========================================

const CookieToggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => {
  return (
    <div 
      onClick={onChange}
      style={{
        width: "2.2rem",
        height: "1.1rem",
        borderRadius: "9999px",
        backgroundColor: checked ? "var(--orange)" : "rgba(217, 187, 151, 0.1)",
        border: "1px solid rgba(217, 187, 151, 0.15)",
        position: "relative",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: "2px",
        transition: "background-color 0.3s ease"
      }}
    >
      <motion.div 
        layout
        style={{
          width: "0.8rem",
          height: "0.8rem",
          borderRadius: "50%",
          backgroundColor: checked ? "#fff" : "rgba(217, 187, 151, 0.5)",
        }}
        animate={{
          x: checked ? "1.1rem" : "0rem"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
};

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [functionalCookies, setFunctionalCookies] = useState(false);
  const [performanceCookies, setPerformanceCookies] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("ijstories-cookie-preference");
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("ijstories-cookie-preference", JSON.stringify({
      necessary: true,
      functional: true,
      performance: true
    }));
    setVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("ijstories-cookie-preference", JSON.stringify({
      necessary: true,
      functional: functionalCookies,
      performance: performanceCookies
    }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            width: "min(380px, 90vw)",
            backgroundColor: "rgba(11, 10, 10, 0.92)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(217, 187, 151, 0.15)",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            zIndex: 99999,
            color: "var(--cream)",
          }}
          className="shadow-2xl"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            
            {/* Title */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--orange)" }} />
              <h4 className="font-syne" style={{ fontSize: "1.05rem", fontWeight: 700 }}>
                Our use of cookies
              </h4>
            </div>

            {/* Content view toggle */}
            {!showSettings ? (
              <>
                <p style={{ fontSize: "0.75rem", color: "rgba(217, 187, 151, 0.75)", lineHeight: 1.5, fontWeight: 300 }}>
                  I.J_Stories uses cookies, some are necessary for the operation of the website and some are designed to improve your experience. For more information,{" "}
                  <button 
                    onClick={() => setShowSettings(true)}
                    style={{ background: "none", border: "none", color: "var(--orange)", padding: 0, cursor: "pointer", textDecoration: "underline", fontSize: "0.75rem", fontWeight: 500 }}
                  >
                    click here
                  </button>.
                </p>
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                  <button 
                    onClick={() => setShowSettings(true)}
                    style={{
                      flex: 1,
                      padding: "0.55rem",
                      borderRadius: "6px",
                      border: "1px solid rgba(217, 187, 151, 0.15)",
                      backgroundColor: "transparent",
                      color: "var(--cream)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    className="hover:bg-[rgba(217,187,151,0.05)]"
                  >
                    Manage Settings
                  </button>
                  <button 
                    onClick={handleAcceptAll}
                    style={{
                      flex: 1,
                      padding: "0.55rem",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "var(--orange)",
                      color: "#fff",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    className="hover:opacity-90"
                  >
                    Accept All
                  </button>
                </div>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                style={{ display: "flex", flexDirection: "column", gap: "1rem", overflow: "hidden" }}
              >
                <hr style={{ border: "none", borderTop: "1px solid rgba(217, 187, 151, 0.1)" }} />
                
                {/* Accordion Lists */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  
                  {/* Necessary cookies */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--cream)" }}>Necessary cookies</span>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--orange)" }} className="uppercase">Always Active</span>
                    </div>
                    <p style={{ fontSize: "0.7rem", color: "rgba(217, 187, 151, 0.55)", lineHeight: 1.45, fontWeight: 300 }}>
                      Are essential to move around I.J_Stories and use its core functionality and enhanced features. Without these cookies, services you have asked for cannot be provided.
                    </p>
                  </div>

                  {/* Functional cookies */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--cream)" }}>Functional cookies</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.65rem", color: "rgba(217, 187, 151, 0.5)", textTransform: "uppercase" }}>{functionalCookies ? "On" : "Off"}</span>
                        <CookieToggle checked={functionalCookies} onChange={() => setFunctionalCookies(!functionalCookies)} />
                      </div>
                    </div>
                    <p style={{ fontSize: "0.7rem", color: "rgba(217, 187, 151, 0.55)", lineHeight: 1.45, fontWeight: 300 }}>
                      Allow I.J_Stories to remember choices you make to give you better functionality and personal features.
                    </p>
                  </div>

                  {/* Performance cookies */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--cream)" }}>Performance cookies</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.65rem", color: "rgba(217, 187, 151, 0.5)", textTransform: "uppercase" }}>{performanceCookies ? "On" : "Off"}</span>
                        <CookieToggle checked={performanceCookies} onChange={() => setPerformanceCookies(!performanceCookies)} />
                      </div>
                    </div>
                    <p style={{ fontSize: "0.7rem", color: "rgba(217, 187, 151, 0.55)", lineHeight: 1.45, fontWeight: 300 }}>
                      Help improve the performance of I.J_Stories by collecting and reporting information about how you use the website.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                  <button 
                    onClick={() => setShowSettings(false)}
                    style={{
                      padding: "0.55rem 1rem",
                      borderRadius: "6px",
                      border: "1px solid rgba(217, 187, 151, 0.15)",
                      backgroundColor: "transparent",
                      color: "var(--cream)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                    className="hover:bg-[rgba(217,187,151,0.05)]"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleSavePreferences}
                    style={{
                      flex: 1,
                      padding: "0.55rem",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "var(--orange)",
                      color: "#fff",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                    className="hover:opacity-90"
                  >
                    Save Preferences
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
