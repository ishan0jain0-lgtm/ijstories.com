import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles, Calendar, Tag } from "lucide-react";
import { getCachedDb } from "@/lib/db";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const db = await getCachedDb();
  const post = db.blogPosts?.find((p) => p.id === id);

  return {
    title: post ? `${post.title} | I.J_Stories` : "Essay details | I.J_Stories",
    description: post ? post.snippet : "Read full strategic essay from the creative studio grid.",
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const db = await getCachedDb();
  const post = db.blogPosts?.find((p) => p.id === id) || null;

  if (!post) {
    return (
      <div className="relative overflow-x-hidden min-h-screen bg-[#0b0a0a] text-[#d9bb97] flex flex-col justify-between">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 space-y-4">
          <Sparkles size={48} className="text-[rgba(217,187,151,0.2)]" />
          <h2 className="text-xl font-bold font-syne text-white">Essay Not Found</h2>
          <p className="text-sm text-[rgba(217,187,151,0.5)]">The requested entry is not part of the creative grid.</p>
          <Link href="/blog" className="text-[#b34a26] hover:underline font-semibold flex items-center gap-2">
            <ArrowLeft size={16} /> Return to Stories
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#0b0a0a] text-[#d9bb97]">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Ambient background light */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#b34a26] rounded-full blur-[200px] opacity-10 pointer-events-none" />

      <Header />

      {/* Spacing for Nav clearance */}
      <div className="pt-32" />

      <main className="max-w-4xl mx-auto px-6 pb-24 relative z-10">
        
        {/* Navigation back */}
        <div className="mb-8">
          <Link 
            href="/about#notebook" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)] hover:text-white transition-all bg-[rgba(255,255,255,0.02)] border border-[rgba(217,187,151,0.08)] px-4 py-2 rounded-xl backdrop-blur-md"
            id="back-to-blog-link"
          >
            <ArrowLeft size={14} /> Back to Notebook
          </Link>
        </div>

        {/* Article Meta */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <span className="inline-flex items-center gap-1 text-[#b34a26] uppercase bg-[rgba(179,74,38,0.1)] px-3 py-1 rounded-full border border-[rgba(179,74,38,0.2)]">
              <Tag size={12} /> {post.tag}
            </span>
            <span className="flex items-center gap-1.5 text-[rgba(217,187,151,0.5)]">
              <Calendar size={12} /> {new Date(post.timestamp).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-tight leading-tight max-w-4xl">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-[rgba(217,187,151,0.7)] font-light leading-relaxed italic border-l-2 border-[#b34a26]/40 pl-4 py-1">
            {post.snippet}
          </p>
        </div>

        {/* Featured Cover Image */}
        <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-[rgba(217,187,151,0.08)] bg-neutral-900 mb-12 shadow-2xl">
          <Image
            src={post.image || "/brand_identity_mockup.png"}
            alt={post.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Content Body */}
        <div 
          className="prose prose-invert max-w-none text-[rgba(217,187,151,0.85)] font-light leading-relaxed text-sm sm:text-base space-y-6 whitespace-pre-line"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {post.content}
        </div>

        {/* Optional Pull Quote */}
        {post.quote && (
          <blockquote 
            className="mt-16 p-8 rounded-2xl border border-[rgba(179,74,38,0.2)] bg-[rgba(179,74,38,0.03)]"
            style={{ borderLeft: "4px solid var(--orange)" }}
          >
            <p className="font-syne italic font-bold text-cream text-lg sm:text-xl leading-relaxed">
              {post.quote}
            </p>
          </blockquote>
        )}

      </main>

      <Footer />
    </div>
  );
}
