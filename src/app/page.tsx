"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  Compass, 
  Camera, 
  FileText, 
  Film, 
  Globe, 
  Play, 
  Plus, 
  CornerDownRight, 
  Send,
  CheckCircle,
  Menu,
  X
} from "lucide-react";

// Types
interface Capability {
  id: string;
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [hoveredCapability, setHoveredCapability] = useState<string | null>(null);
  const [activeNote, setActiveNote] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom Cursor state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "drag">("default");
  
  const studioRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: studioRef,
    offset: ["start end", "end start"]
  });

  // Background color interpolation for an premium page transition
  const sectionBg = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.7, 0.9],
    ["#0b0a0a", "#d9bb97", "#d9bb97", "#0b0a0a"]
  );
  
  const sectionText = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.7, 0.9],
    ["#d9bb97", "#0b0a0a", "#0b0a0a", "#d9bb97"]
  );

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!mounted) return <div style={{ background: "#0b0a0a", minHeight: "100vh" }} />;

  const capabilities: Capability[] = [
    {
      id: "brand-identity",
      num: "01",
      title: "Brand Identity",
      description: "Crafting distinct visual worlds including typography systems, responsive color architectures, logos, and comprehensive guidelines that convey human depth.",
      icon: <Layers size={20} />
    },
    {
      id: "creative-direction",
      num: "02",
      title: "Creative Direction",
      description: "Defining high-level creative concepts, styling, visual metaphors, and brand guidelines that maintain a cohesive voice across physical and digital mediums.",
      icon: <Compass size={20} />
    },
    {
      id: "founder-branding",
      num: "03",
      title: "Founder Branding",
      description: "Translating individual founder philosophies, personal narratives, and human charisma into authoritative and magnetic brand extensions.",
      icon: <Sparkles size={20} />
    },
    {
      id: "campaign-strategy",
      num: "04",
      title: "Campaign Strategy",
      description: "Developing culturally relevant, analytical marketing frameworks and narrative positioning plans designed to maximize brand resonance and user engagement.",
      icon: <FileText size={20} />
    },
    {
      id: "photography-videography",
      num: "05",
      title: "Photography & Videography",
      description: "Producing cinematic fashion portraits, evocative brand films, and high-fidelity video campaigns with sophisticated shadow-play and color gradients.",
      icon: <Camera size={20} />
    },
    {
      id: "social-media-systems",
      num: "06",
      title: "Social Media Systems",
      description: "Architecting structured editorial grids, interactive micro-animations, and content frameworks that elevate day-to-day community interaction.",
      icon: <Globe size={20} />
    },
    {
      id: "motion-visuals",
      num: "07",
      title: "3D & Motion Visuals",
      description: "Developing hyper-realistic liquid simulations, fluid physics animations, and immersive spatial 3D elements for digital platforms.",
      icon: <Film size={20} />
    },
    {
      id: "marketing-launch",
      num: "08",
      title: "Marketing & Launch",
      description: "Orchestrating high-impact market entry strategies, physical event direction, and experiential campaigns that capture instant global awareness.",
      icon: <ArrowUpRight size={20} />
    }
  ];

  const notebookNotes = [
    {
      id: "note-1",
      tag: "PHILOSOPHY",
      title: "The Human Brand Paradox",
      snippet: "Why do we love some brands and ignore others? Because some feel like sterile corporations, and others feel like human characters. We design for character, not corporations.",
      quote: "“A brand is a living entity, an emotional bank account. From identity to influence, it must beat like a human heart.”"
    },
    {
      id: "note-2",
      tag: "STRATEGY",
      title: "Identity is More Than a Logo",
      snippet: "A logo is an anchor, but an identity is an entire landscape. It is the texture of the linen paper, the subtle pacing of a film, the spacing of text, the quiet confidence of your brand voice.",
      quote: "“Consistency creates trust; authenticity creates devotion. If it is manufactured, humans will sense it instantly.”"
    },
    {
      id: "note-3",
      tag: "COLLABORATION",
      title: "The Ecosystem Advantage",
      snippet: "By operating a lean core alongside an international ecosystem of filmmakers, visual artists, and thinkers, we bypass agency bloat and match elite talent directly with our clients.",
      quote: "“Creativity cannot be mass-produced in silos. We bring the right minds together at the perfect cultural moment.”"
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* Premium SVG Noise Overlay */}
      <div className="noise-overlay" />

      {/* Custom Cursor - Hidden on Touch Devices */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mixBlendMode: "difference"
        }}
        className="hidden md:flex"
        animate={{
          x: mousePos.x - (cursorType === "view" ? 40 : cursorType === "hover" ? 15 : 6),
          y: mousePos.y - (cursorType === "view" ? 40 : cursorType === "hover" ? 15 : 6),
          width: cursorType === "view" ? 80 : cursorType === "hover" ? 30 : 12,
          height: cursorType === "view" ? 80 : cursorType === "hover" ? 30 : 12,
          backgroundColor: cursorType === "view" ? "#d9bb97" : cursorType === "hover" ? "rgba(179, 74, 38, 0.4)" : "#b34a26",
          border: cursorType === "view" ? "1px solid #0b0a0a" : cursorType === "hover" ? "1px solid #b34a26" : "none"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.6 }}
      >
        {cursorType === "view" && (
          <span style={{ fontSize: "10px", letterSpacing: "0.2em" }} className="font-bold font-syne uppercase text-black">
            View
          </span>
        )}
      </motion.div>

      {/* Navigation Header */}
      <header className="studio-header">
        <div className="container flex-row-center-between">
          <a 
            href="#" 
            className="font-syne hover:scale-105 transition-transform duration-300"
            style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--cream)" }}
            onMouseEnter={() => setCursorType("hover")}
            onMouseLeave={() => setCursorType("default")}
          >
            I.J_Stories<span className="text-orange" style={{ color: "var(--orange)" }}>.</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav-links-desktop">
            <a 
              href="#philosophy" 
              className="link-hover-effect"
              style={{ fontSize: "0.85rem", fontWeight: 400, letterSpacing: "0.05em", color: "rgba(217, 187, 151, 0.85)" }}
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              Philosophy
            </a>
            <a 
              href="#capabilities" 
              className="link-hover-effect"
              style={{ fontSize: "0.85rem", fontWeight: 400, letterSpacing: "0.05em", color: "rgba(217, 187, 151, 0.85)" }}
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              Capabilities
            </a>
            <a 
              href="#notebook" 
              className="link-hover-effect"
              style={{ fontSize: "0.85rem", fontWeight: 400, letterSpacing: "0.05em", color: "rgba(217, 187, 151, 0.85)" }}
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              Notebook
            </a>
            <a 
              href="#gallery" 
              className="link-hover-effect"
              style={{ fontSize: "0.85rem", fontWeight: 400, letterSpacing: "0.05em", color: "rgba(217, 187, 151, 0.85)" }}
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              Showcase
            </a>
          </nav>

          <div className="flex-row-center-gap4">
            <a 
              href="#contact" 
              className="nav-btn-story"
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              Start a Story <ArrowUpRight size={14} />
            </a>

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
              <a 
                href="#philosophy" 
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: "1.75rem", fontWeight: 700 }}
                className="hover:text-orange"
              >
                Philosophy
              </a>
              <a 
                href="#capabilities" 
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: "1.75rem", fontWeight: 700 }}
                className="hover:text-orange"
              >
                Capabilities
              </a>
              <a 
                href="#notebook" 
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: "1.75rem", fontWeight: 700 }}
                className="hover:text-orange"
              >
                Notebook
              </a>
              <a 
                href="#gallery" 
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: "1.75rem", fontWeight: 700 }}
                className="hover:text-orange"
              >
                Showcase
              </a>
            </nav>
            <hr style={{ border: "none", borderTop: "1px solid rgba(217, 187, 151, 0.1)" }} />
            <a 
              href="#contact" 
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
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="hero-section section-dark">
        {/* Subtle orange ambient glow */}
        <div className="orange-glow w-[500px] h-[500px] top-[-100px] right-[-100px]" />
        <div className="orange-glow w-[600px] h-[600px] bottom-[-200px] left-[-200px]" />
        
        {/* Grid Overlay */}
        <div className="grid-bg" />

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
                <a 
                  href="#contact" 
                  className="btn-primary-glow"
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  Collaborate With Us
                </a>
                <a 
                  href="#philosophy" 
                  className="link-hover-effect"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  Our Manifesto <CornerDownRight size={16} />
                </a>
              </motion.div>
            </div>

            {/* Interactive Hero Visual */}
            <div className="hero-visual-block">
              <motion.div 
                className="hero-visual-card"
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setCursorType("view")}
                onMouseLeave={() => setCursorType("default")}
              >
                <Image 
                  src="/abstract_motion_art.png" 
                  alt="I.J_Stories Abstract Fluid Motion"
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 hover:scale-105"
                />
                {/* Backdrop Gradient overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11, 10, 10, 0.8) 0%, rgba(11, 10, 10, 0.1) 70%, transparent 100%)", pointerEvents: "none" }} />
                
                <div className="hero-card-bottom-bar">
                  <div>
                    <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "var(--orange)", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                      Interactive Showcase
                    </p>
                    <h3 className="font-syne text-cream" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                      Fluid Brand Dynamics
                    </h3>
                  </div>
                  <div className="hero-play-btn">
                    <Play size={16} style={{ transform: "translateX(1px)" }} className="fill-black" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section (Dynamic Background Transition) */}
      <motion.section 
        id="philosophy"
        ref={studioRef}
        style={{ backgroundColor: sectionBg, color: sectionText }}
        className="philosophy-section relative overflow-hidden"
      >
        <div className="container z-10">
          <div className="philosophy-grid-layout">
            
            {/* Left Header Column */}
            <div className="philosophy-left-title" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 text-orange" style={{ color: "var(--orange)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "1rem", display: "inline-block" }}>
                  Creative Philosophy
                </span>
                <h2 className="font-syne">
                  A multidisciplinary creative ecosystem.
                </h2>
              </div>
              
              <div className="hidden lg:block" style={{ marginTop: "2rem" }}>
                <div style={{ width: "4rem", height: "1px", backgroundColor: "var(--orange)", marginBottom: "1rem" }} />
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.05em", fontWeight: 600, opacity: 0.7 }} className="uppercase">
                  I.J_Stories — From Identity to Influence
                </p>
              </div>
            </div>

            {/* Right Paragraph Column */}
            <div className="philosophy-right-content">
              <p className="lead">
                We are a creative studio focused on building modern brands through design, storytelling, strategy, and media. I.J_Stories operates alongside an extended network of creatives, strategists, filmmakers, and visual artists.
              </p>
              
              <p className="desc">
                We believe brand building is an evolutionary process. By merging rigorous visual design systems with genuine stories, we ensure every touchpoint resonates on a human level. We translate high-level strategies into emotional resonance and digital influence.
              </p>

              {/* Core Values grid */}
              <div className="core-values-grid">
                <div className="core-value-item">
                  <h4 className="font-syne" style={{ color: "var(--orange)" }}>01. Human Design</h4>
                  <p>Forging visual spaces with warmth, elegance, and intentional touchpoints.</p>
                </div>
                <div className="core-value-item">
                  <h4 className="font-syne" style={{ color: "var(--orange)" }}>02. Elite Network</h4>
                  <p>Collaborating with global filmmakers, 3D artists, and creative disruptors.</p>
                </div>
                <div className="core-value-item">
                  <h4 className="font-syne" style={{ color: "var(--orange)" }}>03. Real Presence</h4>
                  <p>Positioning brands that dominate search, social systems, and cultural narrative.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* Capabilities Section */}
      <section id="capabilities" className="capabilities-section section-dark">
        <div className="orange-glow w-[500px] h-[500px] bottom-[-100px] right-[-100px]" />
        <div className="grid-bg" />

        <div className="container z-10">
          <div className="capabilities-header-block">
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--orange)", display: "inline-block", marginBottom: "0.75rem" }} className="uppercase">
                Our Capabilities
              </span>
              <h2 className="font-syne text-cream">
                What We Build<span style={{ color: "var(--orange)" }}>.</span>
              </h2>
            </div>
            <p className="capabilities-header-desc">
              Crafting premium visual landscapes and human narratives from high-level positioning to digital execution.
            </p>
          </div>

          {/* Interactive capabilities grid */}
          <div className="capabilities-card-grid">
            {capabilities.map((cap) => (
              <div
                key={cap.id}
                className="capability-card-wrapper"
                onMouseEnter={() => {
                  setHoveredCapability(cap.id);
                  setCursorType("hover");
                }}
                onMouseLeave={() => {
                  setHoveredCapability(null);
                  setCursorType("default");
                }}
              >
                {/* Glow behind icon */}
                <div className="capability-card-icon">
                  {cap.icon}
                </div>

                <span className="capability-card-num">
                  {cap.num}
                </span>
                
                <h3 className="capability-card-title font-syne">
                  {cap.title}
                </h3>
                
                <p className="capability-card-desc">
                  {cap.description}
                </p>
                
                {/* Animated Orange bottom border hover slider */}
                <div className="capability-hover-border" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Asymmetric Image Gallery */}
      <section id="gallery" className="gallery-section section-dark">
        <div className="container z-10">
          <div className="showcase-header">
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--orange)", display: "inline-block", marginBottom: "0.75rem" }} className="uppercase">
              Visual Showcase
            </span>
            <h2 className="font-syne text-cream">
              Artistic direction at the intersection of media & strategy
            </h2>
          </div>

          <div className="showcase-masonry-grid">
            {/* Gallery Item 1 */}
            <motion.div 
              className="gallery-visual-card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setCursorType("view")}
              onMouseLeave={() => setCursorType("default")}
            >
              <div className="gallery-image-wrapper">
                <Image 
                  src="/brand_identity_mockup.png" 
                  alt="I.J_Stories Brand identity publication mockup"
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="gallery-caption-bar">
                <div>
                  <p className="gallery-caption-tag">Visual Identity</p>
                  <h4 className="gallery-caption-title font-syne">Minimalist brand book</h4>
                </div>
                <ArrowUpRight size={18} style={{ color: "rgba(217, 187, 151, 0.6)" }} />
              </div>
            </motion.div>

            {/* Gallery Item 2 */}
            <motion.div 
              className="gallery-visual-card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setCursorType("view")}
              onMouseLeave={() => setCursorType("default")}
            >
              <div className="gallery-image-wrapper">
                <Image 
                  src="/creative_direction_portrait.png" 
                  alt="I.J_Stories Creative Studio Portrait"
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="gallery-caption-bar">
                <div>
                  <p className="gallery-caption-tag">Creative Direction</p>
                  <h4 className="gallery-caption-title font-syne">Human-centric campaign</h4>
                </div>
                <ArrowUpRight size={18} style={{ color: "rgba(217, 187, 151, 0.6)" }} />
              </div>
            </motion.div>

            {/* Gallery Info Column */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "2rem" }}>
              <div className="showcase-text-widget">
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--orange)", display: "block", marginBottom: "1rem" }} className="uppercase">
                    Our Philosophy
                  </span>
                  <h3 className="font-syne text-cream" style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem", lineHeight: "1.2" }}>
                    Why we build brands that feel human.
                  </h3>
                  <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "rgba(217, 187, 151, 0.7)" }}>
                    Humans respond to humans, not corporations. We structure your strategy, film aesthetics, and digital touchpoints to capture real hearts.
                  </p>
                </div>
                <div style={{ borderTop: "1px solid rgba(217, 187, 151, 0.05)", paddingTop: "1.5rem", marginTop: "1.5rem" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--cream)" }}>I.J_Stories Ecosystem</p>
                  <p style={{ fontSize: "10px", color: "rgba(217, 187, 151, 0.4)" }}>EST. 2026</p>
                </div>
              </div>

              {/* Dynamic decorative visual widget */}
              <div className="showcase-launch-widget">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--orange)" }}>
                  <Sparkles size={16} />
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">Ready to launch?</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "rgba(217, 187, 151, 0.8)", lineHeight: "1.5" }}>
                  Join our network of elite clients and design a presence that is impossible to ignore.
                </p>
                <a 
                  href="#contact" 
                  className="btn-widget-launch"
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  Start Project <Plus size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notebook Section (Interactive Creative Notebook Grid) */}
      <section id="notebook" className="notebook-section">
        <div className="grid-bg" />
        <div className="orange-glow w-[600px] h-[600px] top-[-200px] left-[-200px]" />

        <div className="container z-10">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--orange)", display: "inline-block", marginBottom: "0.75rem" }} className="uppercase">
              ค N o t e b o o k L M
            </span>
            <h2 className="font-syne text-cream" style={{ fontSize: "3rem" }}>
              The Creative Notebook
            </h2>
            <p style={{ color: "rgba(217, 187, 151, 0.6)", fontWeight: 300, marginTop: "1rem", fontSize: "1rem" }}>
              A multidisciplinary canvas of thoughts, strategic insights, and brand design manifestos curated by our core network.
            </p>
          </div>

          <div className="notebook-grid-layout">
            {/* Left Nav for Notes */}
            <div className="notebook-notes-list">
              {notebookNotes.map((note, index) => (
                <button
                  key={note.id}
                  className={`notebook-note-btn ${activeNote === index ? "active" : ""}`}
                  onClick={() => setActiveNote(index)}
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  <div className="notebook-note-btn-header">
                    <span className="notebook-note-btn-tag">
                      {note.tag}
                    </span>
                    <span style={{ fontSize: "10px", fontWeight: 700, opacity: 0.6 }}>0{index + 1}</span>
                  </div>
                  <h3 className="notebook-note-btn-title">
                    {note.title}
                  </h3>
                </button>
              ))}
            </div>

            {/* Right Display: Notebook paper effect */}
            <div>
              <motion.div 
                key={activeNote}
                className="notebook-style p-8 md:p-12 h-full flex flex-col justify-between"
                style={{ padding: "3rem 2.5rem", minHeight: "26rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Spiral Ring Binder Aesthetic */}
                <div style={{ position: "absolute", top: 0, left: "2.5rem", right: "2.5rem", display: "flex", justifyContent: "space-between", transform: "translateY(-6px)", pointerEvents: "none" }}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ width: "10px", height: "16px", borderRadius: "9999px", backgroundColor: "#a8a29e", border: "1px solid #78716c", boxShadow: "0 4px 6px rgba(0,0,0,0.15)" }} />
                  ))}
                </div>

                <div className="notebook-lines" style={{ paddingTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(179, 74, 38, 0.15)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                    <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--orange)", letterSpacing: "0.1em" }} className="uppercase">
                      I.J_Stories // Core Journal
                    </p>
                    <p style={{ fontSize: "10px", fontWeight: 700, color: "#78716c" }}>
                      ENTRY_0{activeNote + 1}
                    </p>
                  </div>

                  <h4 className="font-syne" style={{ fontSize: "2rem", fontWeight: 800, color: "var(--black)", marginBottom: "1.5rem" }}>
                    {notebookNotes[activeNote].title}
                  </h4>

                  <p style={{ color: "#1c1917", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.6, marginBottom: "2rem" }}>
                    {notebookNotes[activeNote].snippet}
                  </p>
                </div>

                <div style={{ backgroundColor: "#edd8c4", borderLeft: "4px solid var(--orange)", padding: "1.25rem", borderRadius: "0 0.5rem 0.5rem 0", marginTop: "auto" }}>
                  <p className="font-syne italic" style={{ fontWeight: 700, color: "var(--black)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                    {notebookNotes[activeNote].quote}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Network / Collaborator Section */}
      <section className="collab-section section-dark">
        <div className="container z-10">
          <div className="collab-outer-card">
            {/* Orange glowing flare */}
            <div className="orange-glow w-[300px] h-[300px] top-[-50px] right-[-50px]" />
            
            <div className="collab-text-col">
              <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--orange)", display: "inline-block", marginBottom: "0.75rem" }} className="uppercase">
                The Creative Network
              </span>
              <h2 className="font-syne text-cream" style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
                Operating without borders.
              </h2>
              <p style={{ color: "rgba(217, 187, 151, 0.7)", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.6 }}>
                I.J_Stories functions as a core multidisciplinary team operating alongside an elite distributed network of filmmakers, strategists, developers, 3D artists, and physical space designers. This allows us to scale fluidly from tight conceptual brand sprints to multi-million dollar global launch campaigns.
              </p>
            </div>

            <div className="collab-grid-col">
              {[
                { label: "Core Hub", value: "Creative Strategy" },
                { label: "Visual Artists", value: "3D & Motion design" },
                { label: "Filmmakers", value: "Cinematography" },
                { label: "Engineers", value: "Next.js & Digital Platforms" }
              ].map((item, idx) => (
                <div key={idx} className="collab-item-node">
                  <p style={{ fontSize: "10px", color: "var(--orange)", fontWeight: 700, letterSpacing: "0.1em" }} className="uppercase">{item.label}</p>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--cream)" }} className="font-syne">{item.value}</p>
                </div>
              ))}
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
                  Let's Begin
                </span>
                <h2 className="font-syne text-cream" style={{ fontSize: "3.5rem", fontWeight: 800 }}>
                  Let's build a brand that feels human<span style={{ color: "var(--orange)" }}>.</span>
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
                        onMouseEnter={() => setCursorType("hover")}
                        onMouseLeave={() => setCursorType("default")}
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

      {/* Modern Studio Footer */}
      <footer style={{ padding: "4rem 0", backgroundColor: "#070606", borderTop: "1px solid rgba(217, 187, 151, 0.05)", color: "rgba(217, 187, 151, 0.4)", fontSize: "0.85rem", fontWeight: 300 }}>
        <div className="container">
          <div className="footer-grid-layout">
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h4 className="font-syne text-cream" style={{ fontSize: "1.25rem", fontWeight: 700 }}>I.J_Stories</h4>
              <p style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                A multidisciplinary creative ecosystem building modern brands that feel human. Designed for global impact.
              </p>
            </div>

            <div>
              <h5 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--cream)", letterSpacing: "0.1em", marginBottom: "1.25rem" }} className="uppercase">Navigations</h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.75rem" }}>
                <a href="#philosophy" className="hover:text-orange">Our Philosophy</a>
                <a href="#capabilities" className="hover:text-orange">Capabilities</a>
                <a href="#notebook" className="hover:text-orange">Creative Notebook</a>
                <a href="#gallery" className="hover:text-orange">Visual Showcase</a>
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
              <a href="#" className="hover:text-orange">Privacy Policy</a>
              <a href="#" className="hover:text-orange">Terms of Service</a>
              <p style={{ color: "var(--orange)" }}>Designed for Human Sensation</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
