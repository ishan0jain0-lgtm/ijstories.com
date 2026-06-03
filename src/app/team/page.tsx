import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamClient from "./TeamClient";
import { getCachedDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const db = await getCachedDb();

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#0b0a0a]">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      <Header />

      {/* Spacing for Nav clearance */}
      <div className="pt-24" />

      {/* Team Section (Interactive Portrait Grid) */}
      <section id="team" className="team-section section-dark py-24 relative overflow-hidden">
        <div className="orange-glow w-[500px] h-[500px] bottom-[-100px] left-[-100px]" />
        <div className="grid-bg" />

        <div className="container z-10">
          <div className="showcase-header" style={{ marginBottom: "4rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--orange)", display: "inline-block", marginBottom: "0.75rem" }} className="uppercase">
              The Team
            </span>
            <h2 className="font-syne text-cream">
              Meet the minds shaping your narrative
            </h2>
          </div>

          <TeamClient initialMembers={db.teamMembers || []} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
