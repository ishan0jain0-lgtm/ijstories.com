import React from "react";
import { getCachedDb } from "@/lib/db";
import ProjectDetailsClient from "./ProjectDetailsClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function ProjectDetailsPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = await getCachedDb();
  const project = db.showcaseItems?.find((s) => s.id === id) || null;

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#0b0a0a] text-[#d9bb97]">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      <Header />
      
      <ProjectDetailsClient project={project} />
      
      <Footer websiteDetails={db.websiteDetails} />
    </div>
  );
}
