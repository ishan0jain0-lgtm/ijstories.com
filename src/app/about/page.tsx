import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutClient from "./AboutClient";
import { getCachedDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const db = await getCachedDb();

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#0b0a0a]">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      <Header />

      {/* Spacing for Nav clearance */}
      <div className="pt-24" />

      <AboutClient initialBlogs={db.blogPosts || []} />

      <Footer websiteDetails={db.websiteDetails} />
    </div>
  );
}
