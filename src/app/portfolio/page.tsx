import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioClient from "./PortfolioClient";
import { getCachedDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const db = await getCachedDb();
  
  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#0b0a0a]">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      <Header />

      {/* Spacing for Nav clearance */}
      <div className="pt-24" />

      <PortfolioClient initialItems={db.showcaseItems} />

      <Footer />
    </div>
  );
}
