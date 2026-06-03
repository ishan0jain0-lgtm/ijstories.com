"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Image as IKImage } from "@imagekit/react";
import {
  Trash2,
  Edit3,
  Plus,
  ArrowLeft,
  Users,
  BookOpen,
  Layers,
  Mail,
  UploadCloud,
  CheckCircle,
  ExternalLink,
  Sparkles,
  RefreshCw,
  FolderOpen,
  Image as ImageIcon
} from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface BlogPost {
  id: string;
  tag: string;
  title: string;
  snippet: string;
  content: string;
  quote: string;
  timestamp: string;
  image: string;
}

interface ShowcaseItem {
  id: string;
  tag: string;
  title: string;
  image: string;
  link: string;
  images: string[];
  width?: number;
  height?: number;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  interest: string;
  message: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "team" | "blog" | "showcase" | "imagekit">("overview");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [db, setDb] = useState<{
    teamMembers: TeamMember[];
    blogPosts: BlogPost[];
    showcaseItems: ShowcaseItem[];
    leads: Lead[];
    isFallback?: boolean;
    dbError?: string;
  }>({
    teamMembers: [],
    blogPosts: [],
    showcaseItems: [],
    leads: [],
    isFallback: false,
    dbError: ""
  });

  // ImageKit states
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [ikSubTab, setIkSubTab] = useState<"uploader" | "library">("uploader");
  const [searchQuery, setSearchQuery] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // ImageKit Multiple Upload States
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadTags, setUploadTags] = useState("");
  const [uploadCollection, setUploadCollection] = useState("");
  const [uploadQueue, setUploadQueue] = useState<Array<{
    name: string;
    status: "pending" | "uploading" | "success" | "error";
    progress: number;
    error?: string;
  }>>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit / Add Modal States
  const [modalType, setModalType] = useState<"team" | "blog" | "showcase" | "leadView" | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Form Fields
  const [teamForm, setTeamForm] = useState({ name: "", role: "", image: "" });
  const [blogForm, setBlogForm] = useState({ id: "", tag: "", title: "", snippet: "", content: "", quote: "", timestamp: "", image: "" });
  const [showcaseForm, setShowcaseForm] = useState<{ id: string; tag: string; title: string; image: string; link: string; images: string[]; width: number; height: number }>({
    id: "",
    tag: "",
    title: "",
    image: "",
    link: "",
    images: [],
    width: 800,
    height: 600
  });

  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "";
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "";

  // Load Content
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/content");
      if (response.ok) {
        const data = await response.json();
        setDb(data);
      } else {
        const errText = await response.text();
        setDb((prev) => ({
          ...prev,
          isFallback: true,
          dbError: `Server error (${response.status}): ${errText}`
        }));
      }
    } catch (error: any) {
      console.error("Error loading DB data:", error);
      setDb((prev) => ({
        ...prev,
        isFallback: true,
        dbError: error instanceof Error ? error.message : String(error)
      }));
    } finally {
      setLoading(false);
    }
  };

  const loadMediaFiles = async () => {
    setLoadingMedia(true);
    try {
      const res = await fetch("/api/imagekit-files");
      if (res.ok) {
        const data = await res.json();
        setMediaFiles(data);
      }
    } catch (error) {
      console.error("Error loading ImageKit files:", error);
    } finally {
      setLoadingMedia(false);
    }
  };

  useEffect(() => {
    loadData();
    loadMediaFiles();
  }, []);

  // Save DB helper
  const saveDb = async (updatedDb: typeof db) => {
    setSaving(true);
    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDb)
      });
      if (response.ok) {
        const data = await response.json();
        setDb(data);
      } else {
        alert("Failed to save changes onto the server.");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Error occurred while saving modifications.");
    } finally {
      setSaving(false);
    }
  };

  // Delete handlers
  const handleDeleteTeam = (index: number) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      const nextMembers = [...db.teamMembers];
      nextMembers.splice(index, 1);
      const nextDb = { ...db, teamMembers: nextMembers };
      saveDb(nextDb);
    }
  };

  const handleDeleteBlog = (index: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const nextBlogs = [...db.blogPosts];
      nextBlogs.splice(index, 1);
      const nextDb = { ...db, blogPosts: nextBlogs };
      saveDb(nextDb);
    }
  };

  const handleDeleteShowcase = (index: number) => {
    if (confirm("Are you sure you want to remove this showcase piece?")) {
      const nextShowcases = [...db.showcaseItems];
      nextShowcases.splice(index, 1);
      const nextDb = { ...db, showcaseItems: nextShowcases };
      saveDb(nextDb);
    }
  };

  const handleDeleteLead = (index: number) => {
    if (confirm("Are you sure you want to delete this lead history?")) {
      const nextLeads = [...db.leads];
      nextLeads.splice(index, 1);
      const nextDb = { ...db, leads: nextLeads };
      saveDb(nextDb);
    }
  };

  // Open forms
  const openTeamForm = (mode: "add" | "edit", index = -1) => {
    setModalType("team");
    setModalMode(mode);
    setEditIndex(index);
    if (mode === "edit" && index >= 0) {
      setTeamForm({ ...db.teamMembers[index] });
    } else {
      setTeamForm({ name: "", role: "", image: "" });
    }
  };

  const openBlogForm = (mode: "add" | "edit", index = -1) => {
    setModalType("blog");
    setModalMode(mode);
    setEditIndex(index);
    if (mode === "edit" && index >= 0) {
      setBlogForm({ 
        id: db.blogPosts[index].id,
        tag: db.blogPosts[index].tag,
        title: db.blogPosts[index].title,
        snippet: db.blogPosts[index].snippet,
        content: db.blogPosts[index].content || "",
        quote: db.blogPosts[index].quote || "",
        timestamp: db.blogPosts[index].timestamp || new Date().toISOString(),
        image: db.blogPosts[index].image || ""
      });
    } else {
      setBlogForm({ 
        id: "blog-" + (db.blogPosts.length + 1), 
        tag: "", 
        title: "", 
        snippet: "", 
        content: "", 
        quote: "", 
        timestamp: new Date().toISOString(), 
        image: "" 
      });
    }
  };

  const openShowcaseForm = (mode: "add" | "edit", index = -1) => {
    setModalType("showcase");
    setModalMode(mode);
    setEditIndex(index);
    if (mode === "edit" && index >= 0) {
      setShowcaseForm({
        id: db.showcaseItems[index].id,
        tag: db.showcaseItems[index].tag,
        title: db.showcaseItems[index].title,
        image: db.showcaseItems[index].image,
        link: db.showcaseItems[index].link,
        images: db.showcaseItems[index].images || [],
        width: db.showcaseItems[index].width || 800,
        height: db.showcaseItems[index].height || 600
      });
    } else {
      setShowcaseForm({ id: "showcase-" + (db.showcaseItems.length + 1), tag: "", title: "", image: "", link: "#", images: [], width: 800, height: 600 });
    }
  };

  // Submit forms
  const handleTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextMembers = [...db.teamMembers];
    if (modalMode === "edit") {
      nextMembers[editIndex] = teamForm;
    } else {
      nextMembers.push(teamForm);
    }
    saveDb({ ...db, teamMembers: nextMembers });
    setModalType(null);
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextBlogs = [...db.blogPosts];
    const updatedForm = { 
      ...blogForm, 
      timestamp: blogForm.timestamp || new Date().toISOString() 
    };
    if (modalMode === "edit") {
      nextBlogs[editIndex] = updatedForm;
    } else {
      nextBlogs.push(updatedForm);
    }
    saveDb({ ...db, blogPosts: nextBlogs });
    setModalType(null);
  };

  const handleShowcaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextShowcases = [...db.showcaseItems];
    if (modalMode === "edit") {
      nextShowcases[editIndex] = showcaseForm;
    } else {
      nextShowcases.push(showcaseForm);
    }
    saveDb({ ...db, showcaseItems: nextShowcases });
    setModalType(null);
  };

  // ImageKit client-side uploader
  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files);
      setUploadFiles((prev) => [...prev, ...selected]);
      
      const newItems = selected.map((file) => ({
        name: file.name,
        status: "pending" as const,
        progress: 0
      }));
      setUploadQueue((prev) => [...prev, ...newItems]);
    }
  };

  const removeFileFromQueue = (index: number) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadQueue((prev) => prev.filter((_, i) => i !== index));
  };

  const clearQueue = () => {
    setUploadFiles([]);
    setUploadQueue([]);
  };

  const handleMultipleUpload = async () => {
    if (uploadFiles.length === 0) {
      alert("Please select files first");
      return;
    }

    setUploading(true);

    let uploadFn: any;
    try {
      const sdk = await import("@imagekit/react");
      uploadFn = sdk.upload;
    } catch (e) {
      console.error("SDK import error:", e);
      alert("Failed to load ImageKit React SDK");
      setUploading(false);
      return;
    }

    // Process files sequentially
    for (let i = 0; i < uploadFiles.length; i++) {
      const file = uploadFiles[i];
      
      // Update queue state: uploading
      setUploadQueue((prev) => {
        const next = [...prev];
        next[i].status = "uploading";
        next[i].progress = 10;
        return next;
      });

      try {
        const authRes = await fetch("/api/imagekit-auth", { cache: "no-store" });
        if (!authRes.ok) {
          throw new Error("Failed to authenticate with ImageKit");
        }
        const auth = await authRes.json();

        setUploadQueue((prev) => {
          const next = [...prev];
          next[i].progress = 30;
          return next;
        });

        // Parse tags
        const tagsArr = uploadTags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t.length > 0);
        
        if (uploadCollection.trim()) {
          const collections = uploadCollection
            .split(",")
            .map((c) => c.trim())
            .filter((c) => c.length > 0);
          collections.forEach((c) => {
            tagsArr.push(`collection:${c}`);
          });
        }

        const result = await uploadFn({
          file: file,
          fileName: file.name,
          publicKey: auth.publicKey,
          signature: auth.signature,
          token: auth.token,
          expire: auth.expire,
          folder: "/ijstories_uploads/",
          tags: tagsArr,
          onProgress: (event: any) => {
            const percentage = Math.round((event.loaded / event.total) * 100);
            setUploadQueue((prev) => {
              const next = [...prev];
              next[i].progress = 30 + percentage * 0.7;
              return next;
            });
          }
        });

        setUploadQueue((prev) => {
          const next = [...prev];
          next[i].status = "success";
          next[i].progress = 100;
          return next;
        });
      } catch (err: any) {
        console.error(`Failed to upload ${file.name}:`, err);
        setUploadQueue((prev) => {
          const next = [...prev];
          next[i].status = "error";
          next[i].error = err.message || "Unknown error";
          return next;
        });
      }
    }

    setUploading(false);
    setUploadFiles([]); // clear successfully completed files from selection list
    loadMediaFiles(); // reload
    alert("Media assets upload transmission finished!");
  };

  const handleDeleteMediaFile = async (fileId: string) => {
    if (confirm("Are you sure you want to delete this asset from ImageKit? This cannot be undone.")) {
      try {
        const res = await fetch(`/api/imagekit-files?fileId=${fileId}`, {
          method: "DELETE"
        });
        if (res.ok) {
          alert("File deleted successfully!");
          loadMediaFiles();
        } else {
          const data = await res.json();
          alert(`Delete failed: ${data.error || "Unknown error"}`);
        }
      } catch (e: any) {
        alert(`Delete error: ${e.message}`);
      }
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0b0a0a] text-[#d9bb97] font-sans selection:bg-[#b34a26] selection:text-white pb-12">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#b34a26] rounded-full blur-[160px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#b34a26] rounded-full blur-[200px] opacity-5 pointer-events-none" />

      {/* Glassmorphic Top Nav */}
      <header className="border-b border-[rgba(217,187,151,0.08)] bg-[rgba(11,10,10,0.85)] sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[rgba(217,187,151,0.15)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(217,187,151,0.05)] transition-all">
              <ArrowLeft size={14} /> Back to Studio
            </Link>
            <div className="h-6 w-[1px] bg-[rgba(217,187,151,0.15)]" />
            <h1 className="text-xl font-bold tracking-tight text-white font-syne flex items-center gap-2">
              <Sparkles size={16} className="text-[#b34a26]" /> Studio Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadData} className="p-2 rounded-lg hover:bg-[rgba(217,187,151,0.05)] transition-all text-[rgba(217,187,151,0.6)] hover:text-[#d9bb97]" title="Reload data">
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[rgba(179,74,38,0.1)] border border-[rgba(179,74,38,0.2)] text-[#b34a26] font-semibold">
              Admin Portal
            </span>
          </div>
        </div>
      </header>

      {/* Fallback Mode / MongoDB Connection Warning */}
      {db.isFallback && (
        <div className="max-w-7xl mx-auto px-6 mt-6">
          <div className="p-4 rounded-xl border border-amber-900/30 bg-amber-950/10 text-amber-300 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <h4 className="text-sm font-bold font-syne">Database Connection Failed — Operating in Offline Mode</h4>
            </div>
            <p className="text-xs leading-relaxed text-amber-200/80">
              The application could not establish a connection to your MongoDB Atlas cluster. We have gracefully fallen back to local default data. Any changes you make here will <strong>not</strong> save to the production database.
            </p>
            {db.dbError && (
              <div className="mt-2 text-[11px] bg-black/40 p-3 rounded-lg border border-amber-900/20 font-mono text-amber-100/90 break-all select-text">
                <span className="font-semibold text-amber-300">Technical Details:</span> {db.dbError}
              </div>
            )}
            <p className="text-xs text-amber-300/90">
              💡 <strong>Common Cause:</strong> Your current IP address might not be whitelisted on MongoDB Atlas. Please log in to your <a href="https://www.mongodb.com/docs/atlas/security-whitelist/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">MongoDB Atlas Security Whitelist</a> panel and authorize your current IP address.
            </p>
          </div>
        </div>
      )}

      {/* Main Dashboard Layout */}
      <main className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Nav */}
        <aside className="lg:col-span-1 space-y-2">
          {[
            { id: "overview", label: "Overview", icon: Layers },
            { id: "leads", label: "Form Leads", icon: Mail, count: db.leads.length },
            { id: "team", label: "Team Members", icon: Users, count: db.teamMembers.length },
            { id: "blog", label: "Blog Posts", icon: BookOpen, count: db.blogPosts.length },
            { id: "showcase", label: "Showcase Grid", icon: ImageIcon, count: db.showcaseItems.length },
            { id: "imagekit", label: "ImageKit Lab", icon: UploadCloud }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#b34a26] text-white border-[#b34a26] shadow-[0_8px_20px_rgba(179,74,38,0.25)]"
                    : "bg-[rgba(255,255,255,0.01)] text-[rgba(217,187,151,0.7)] border-[rgba(217,187,151,0.06)] hover:bg-[rgba(217,187,151,0.04)] hover:text-[#d9bb97]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? "bg-white text-[#b34a26]" : "bg-[rgba(217,187,151,0.15)] text-[#d9bb97]"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Dynamic Display Panel */}
        <section className="lg:col-span-3 min-h-[500px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[400px] border border-[rgba(217,187,151,0.08)] bg-[rgba(255,255,255,0.01)] rounded-2xl">
              <RefreshCw className="animate-spin text-[#b34a26] mb-4" size={32} />
              <p className="text-sm text-[rgba(217,187,151,0.5)]">Synchronizing dynamic content data...</p>
            </div>
          ) : (
            <div className="border border-[rgba(217,187,151,0.08)] bg-[rgba(18,17,17,0.7)] backdrop-blur-sm p-6 rounded-2xl shadow-xl">
              
              {/* Tab 1: Overview */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold font-syne text-white">System Status</h2>
                    <p className="text-sm text-[rgba(217,187,151,0.6)] mt-1">Quick operational indicators for I.J_Stories website resources.</p>
                  </div>

                  {/* Config Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-[rgba(217,187,151,0.08)] bg-[rgba(255,255,255,0.02)] flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[rgba(217,187,151,0.5)] uppercase tracking-wider font-semibold">ImageKit URL Endpoint</p>
                        <p className="text-sm font-mono text-white mt-1 select-all truncate max-w-[220px]" title={urlEndpoint}>
                          {urlEndpoint ? urlEndpoint : "Not Configured (.env)"}
                        </p>
                      </div>
                      <span className={`w-2.5 h-2.5 rounded-full ${urlEndpoint ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`} />
                    </div>

                    <div className="p-4 rounded-xl border border-[rgba(217,187,151,0.08)] bg-[rgba(255,255,255,0.02)] flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[rgba(217,187,151,0.5)] uppercase tracking-wider font-semibold">ImageKit Public Key</p>
                        <p className="text-sm font-mono text-white mt-1 select-all truncate max-w-[220px]" title={publicKey}>
                          {publicKey ? publicKey : "Not Configured (.env)"}
                        </p>
                      </div>
                      <span className={`w-2.5 h-2.5 rounded-full ${publicKey ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`} />
                    </div>
                  </div>

                  {/* Dynamic Counters */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Leads", val: db.leads.length, color: "text-[#b34a26]", icon: Mail },
                      { label: "Team Size", val: db.teamMembers.length, color: "text-white", icon: Users },
                      { label: "Blog Posts", val: db.blogPosts.length, color: "text-white", icon: BookOpen },
                      { label: "Showcase items", val: db.showcaseItems.length, color: "text-white", icon: ImageIcon }
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div key={i} className="p-4 rounded-xl border border-[rgba(217,187,151,0.08)] bg-[rgba(255,255,255,0.01)] space-y-3">
                          <div className="flex justify-between items-center text-[rgba(217,187,151,0.5)]">
                            <span className="text-xs uppercase tracking-wider font-semibold">{item.label}</span>
                            <Icon size={14} />
                          </div>
                          <p className={`text-3xl font-extrabold ${item.color} font-syne`}>{item.val}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Activity overview */}
                  <div className="p-4 rounded-xl border border-[rgba(217,187,151,0.08)] bg-[rgba(255,255,255,0.015)]">
                    <h3 className="text-sm font-bold text-white mb-3">Recent Transmission</h3>
                    {db.leads.length === 0 ? (
                      <p className="text-xs text-[rgba(217,187,151,0.4)]">No submissions recorded yet.</p>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between items-start text-xs border-b border-[rgba(217,187,151,0.05)] pb-2 mb-2">
                          <span className="font-semibold text-white">{db.leads[0].name} ({db.leads[0].email})</span>
                          <span className="text-[10px] text-[rgba(217,187,151,0.4)]">{new Date(db.leads[0].timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-xs italic text-[rgba(217,187,151,0.7)] truncate">{db.leads[0].message}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: Leads Manager */}
              {activeTab === "leads" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold font-syne text-white">Inquiry Transmissions</h2>
                      <p className="text-sm text-[rgba(217,187,151,0.6)] mt-1">View messages received via the landing contact form.</p>
                    </div>
                  </div>

                  {db.leads.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-[rgba(217,187,151,0.15)] rounded-xl">
                      <Mail size={32} className="mx-auto text-[rgba(217,187,151,0.3)] mb-3" />
                      <p className="text-sm text-[rgba(217,187,151,0.4)]">No transmissions logged.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {db.leads.map((lead, idx) => (
                        <div key={lead.id} className="p-4 rounded-xl border border-[rgba(217,187,151,0.08)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(217,187,151,0.15)] transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-sm font-bold text-white truncate">{lead.name}</h4>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(179,74,38,0.1)] text-[#b34a26] font-semibold">
                                {lead.interest}
                              </span>
                              <span className="text-[10px] text-[rgba(217,187,151,0.4)]">
                                {new Date(lead.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-xs text-[rgba(217,187,151,0.6)] truncate">{lead.email}</p>
                            <p className="text-xs italic text-[rgba(217,187,151,0.85)] mt-1 bg-[rgba(0,0,0,0.15)] p-2 rounded-lg border border-[rgba(217,187,151,0.03)] font-sans whitespace-pre-line leading-relaxed max-h-[100px] overflow-y-auto">
                              {lead.message}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedLead(lead);
                                setModalType("leadView");
                              }}
                              className="p-2 rounded-lg bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(217,187,151,0.1)] border border-[rgba(217,187,151,0.1)] transition-all text-xs"
                            >
                              Expand
                            </button>
                            <button
                              onClick={() => handleDeleteLead(idx)}
                              className="p-2 rounded-lg border border-red-950/20 bg-red-950/10 hover:bg-red-950/30 text-red-400 hover:text-red-300 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Team Manager */}
              {activeTab === "team" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold font-syne text-white">Ecosystem Roster</h2>
                      <p className="text-sm text-[rgba(217,187,151,0.6)] mt-1">Manage core team members displayed on the landing page.</p>
                    </div>
                    <button
                      onClick={() => openTeamForm("add")}
                      className="flex items-center gap-2 px-3 py-2 bg-[#b34a26] text-white hover:bg-[#9a3d1f] font-semibold text-xs rounded-xl shadow-lg shadow-[#b34a26]/20 transition-all"
                    >
                      <Plus size={14} /> Add Member
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {db.teamMembers.map((member, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-[rgba(217,187,151,0.08)] bg-[rgba(255,255,255,0.015)] flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[rgba(0,0,0,0.2)] border border-[rgba(217,187,151,0.1)] shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" onError={(e) => {
                              (e.target as HTMLImageElement).src = "/logo.jpg";
                            }} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-white truncate">{member.name}</h4>
                            <p className="text-xs text-[#b34a26] font-medium tracking-wide uppercase truncate">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openTeamForm("edit", idx)}
                            className="p-2 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(217,187,151,0.06)] hover:bg-[rgba(217,187,151,0.08)] transition-all"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteTeam(idx)}
                            className="p-2 rounded-lg bg-red-950/10 border border-red-950/20 text-red-400 hover:bg-red-950/30 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Blog Editor */}
              {activeTab === "blog" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold font-syne text-white">Blog Manager</h2>
                      <p className="text-sm text-[rgba(217,187,151,0.6)] mt-1">Write and manage premium blog posts & stories.</p>
                    </div>
                    <button
                      onClick={() => openBlogForm("add")}
                      className="flex items-center gap-2 px-3 py-2 bg-[#b34a26] text-white hover:bg-[#9a3d1f] font-semibold text-xs rounded-xl shadow-lg shadow-[#b34a26]/20 transition-all"
                    >
                      <Plus size={14} /> Add Blog Post
                    </button>
                  </div>

                  <div className="space-y-3">
                    {db.blogPosts.map((post, idx) => (
                      <div key={post.id || idx} className="p-4 rounded-xl border border-[rgba(217,187,151,0.08)] bg-[rgba(255,255,255,0.015)] space-y-2">
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] px-2 py-0.5 rounded bg-[rgba(179,74,38,0.1)] text-[#b34a26] font-bold uppercase tracking-wider">
                                {post.tag}
                              </span>
                              <span className="text-[9px] text-[rgba(217,187,151,0.4)] font-mono">
                                {new Date(post.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-white mt-1">{post.title}</h4>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openBlogForm("edit", idx)}
                              className="p-2 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(217,187,151,0.06)] hover:bg-[rgba(217,187,151,0.08)] transition-all"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(idx)}
                              className="p-2 rounded-lg bg-red-950/10 border border-red-950/20 text-red-400 hover:bg-red-950/30 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-[rgba(217,187,151,0.7)] leading-relaxed max-w-3xl">{post.snippet}</p>
                        {post.quote && (
                          <p className="text-[11px] italic text-[#b34a26] border-l-2 border-[#b34a26]/40 pl-2.5 mt-2">{post.quote}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: Showcase Editor */}
              {activeTab === "showcase" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold font-syne text-white">Showcase Portfolio</h2>
                      <p className="text-sm text-[rgba(217,187,151,0.6)] mt-1">Manage grid showcase projects displayed in dynamic gallery.</p>
                    </div>
                    <button
                      onClick={() => openShowcaseForm("add")}
                      className="flex items-center gap-2 px-3 py-2 bg-[#b34a26] text-white hover:bg-[#9a3d1f] font-semibold text-xs rounded-xl shadow-lg shadow-[#b34a26]/20 transition-all"
                    >
                      <Plus size={14} /> Add Showcase
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {db.showcaseItems.map((item, idx) => (
                      <div key={item.id || idx} className="p-4 rounded-xl border border-[rgba(217,187,151,0.08)] bg-[rgba(255,255,255,0.015)] flex gap-4 justify-between items-center">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-[rgba(0,0,0,0.2)] border border-[rgba(217,187,151,0.15)] shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={(e) => {
                              (e.target as HTMLImageElement).src = "/brand_identity_mockup.png";
                            }} />
                          </div>
                          <div className="min-w-0 space-y-1">
                            <span className="text-[9px] px-2 py-0.5 rounded bg-[rgba(179,74,38,0.1)] text-[#b34a26] font-bold uppercase tracking-wider">
                              {item.tag}
                            </span>
                            <h4 className="text-sm font-bold text-white truncate max-w-[200px]" title={item.title}>{item.title}</h4>
                            <p className="text-[10px] text-[rgba(217,187,151,0.4)] truncate" title={item.image}>{item.image}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openShowcaseForm("edit", idx)}
                            className="p-2 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(217,187,151,0.06)] hover:bg-[rgba(217,187,151,0.08)] transition-all"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteShowcase(idx)}
                            className="p-2 rounded-lg bg-red-950/10 border border-red-950/20 text-red-400 hover:bg-red-950/30 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 6: ImageKit Media Lab */}
              {activeTab === "imagekit" && (
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold font-syne text-white">ImageKit Media Lab</h2>
                      <p className="text-sm text-[rgba(217,187,151,0.6)] mt-1">Manage and sync dynamic website portfolios directly with your ImageKit library.</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIkSubTab("uploader")}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                          ikSubTab === "uploader"
                            ? "bg-[#b34a26] text-white border-[#b34a26]"
                            : "bg-[rgba(255,255,255,0.02)] text-[rgba(217,187,151,0.7)] border-[rgba(217,187,151,0.08)] hover:bg-[rgba(217,187,151,0.05)]"
                        }`}
                      >
                        <UploadCloud size={14} /> Upload Assets
                      </button>
                      <button
                        onClick={() => setIkSubTab("library")}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                          ikSubTab === "library"
                            ? "bg-[#b34a26] text-white border-[#b34a26]"
                            : "bg-[rgba(255,255,255,0.02)] text-[rgba(217,187,151,0.7)] border-[rgba(217,187,151,0.08)] hover:bg-[rgba(217,187,151,0.05)]"
                        }`}
                      >
                        <ImageIcon size={14} /> Media Library ({mediaFiles.length})
                      </button>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  {!urlEndpoint ? (
                    <div className="p-4 rounded-xl border border-amber-900/30 bg-amber-950/10 text-amber-300 space-y-2">
                      <h4 className="text-sm font-bold">ImageKit credentials missing</h4>
                      <p className="text-xs leading-relaxed">
                        To activate media streaming, configure environment variables in your local environment (`.env.local`):
                      </p>
                      <pre className="text-[10px] bg-black/40 p-3 rounded-lg border border-amber-900/20 font-mono text-amber-200/90 leading-normal">
                        IMAGEKIT_PRIVATE_KEY=your_private_key<br />
                        NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key<br />
                        NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id/
                      </pre>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl border border-emerald-950 bg-emerald-950/10 text-emerald-400 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle size={16} /> 
                        <span>ImageKit integration is active. Connected folder: <code className="font-mono bg-black/30 px-1.5 py-0.5 rounded text-emerald-300">/ijstories_uploads/</code></span>
                      </div>
                      <button
                        onClick={loadMediaFiles}
                        className="text-[10px] text-emerald-400 hover:text-emerald-300 underline font-semibold flex items-center gap-1"
                        disabled={loadingMedia}
                      >
                        <RefreshCw size={10} className={loadingMedia ? "animate-spin" : ""} /> Refresh
                      </button>
                    </div>
                  )}

                  {/* Sub-tab 1: Uploader */}
                  {ikSubTab === "uploader" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Control Forms */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-white border-b border-[rgba(217,187,151,0.08)] pb-2 flex items-center gap-2">
                            <Sparkles size={14} className="text-[#b34a26]" /> Collection Metadata Configuration
                          </h3>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Collection / Project Name</label>
                              <input
                                type="text"
                                value={uploadCollection}
                                onChange={(e) => setUploadCollection(e.target.value)}
                                placeholder="e.g. Ogilvy Campaign"
                                className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Comma-separated tags</label>
                              <input
                                type="text"
                                value={uploadTags}
                                onChange={(e) => setUploadTags(e.target.value)}
                                placeholder="e.g. photography, corporate"
                                className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Select Portfolio Assets</label>
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              className="border-2 border-dashed border-[rgba(217,187,151,0.15)] bg-black/25 hover:bg-black/35 hover:border-[#b34a26]/40 cursor-pointer rounded-xl p-8 text-center transition-all space-y-2"
                            >
                              <UploadCloud size={36} className="mx-auto text-[rgba(217,187,151,0.4)]" />
                              <p className="text-xs text-[rgba(217,187,151,0.7)] font-medium">Drag & drop files or click to browse</p>
                              <p className="text-[10px] text-[rgba(217,187,151,0.4)]">Supports JPEG, PNG, WebP, SVG, and GIF</p>
                            </div>
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleMultipleFileChange}
                              className="hidden"
                              accept="image/*"
                              multiple
                            />
                          </div>

                          {uploadFiles.length > 0 && (
                            <div className="flex gap-2">
                              <button
                                onClick={handleMultipleUpload}
                                disabled={uploading}
                                className="flex-1 py-3 bg-[#b34a26] hover:bg-[#9a3d1f] disabled:opacity-40 disabled:hover:bg-[#b34a26] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#b34a26]/20"
                              >
                                {uploading ? "Transmitting Media..." : `Transmit ${uploadFiles.length} Assets to ImageKit`}
                              </button>
                              <button
                                onClick={clearQueue}
                                disabled={uploading}
                                className="px-4 py-3 border border-[rgba(217,187,151,0.15)] hover:bg-white/5 disabled:opacity-40 rounded-xl transition-all text-xs font-bold uppercase text-[rgba(217,187,151,0.7)]"
                              >
                                Clear
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Files and Progress Queue Visualization */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-white border-b border-[rgba(217,187,151,0.08)] pb-2">Transmission Queue</h3>
                          
                          {uploadQueue.length === 0 ? (
                            <div className="h-60 border border-[rgba(217,187,151,0.06)] bg-black/10 rounded-xl flex flex-col items-center justify-center text-center p-4">
                              <FolderOpen size={24} className="text-[rgba(217,187,151,0.2)] mb-2" />
                              <p className="text-xs text-[rgba(217,187,151,0.4)]">Your transmission queue is empty. Choose files to populate the staging library.</p>
                            </div>
                          ) : (
                            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                              {uploadQueue.map((item, idx) => (
                                <div key={idx} className="p-3 bg-black/30 rounded-xl border border-[rgba(217,187,151,0.06)] flex items-center justify-between gap-3 text-xs">
                                  <div className="min-w-0 flex-1 space-y-1">
                                    <div className="flex justify-between items-center gap-2">
                                      <p className="font-semibold text-white truncate max-w-[180px]" title={item.name}>{item.name}</p>
                                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                        item.status === "success" ? "bg-emerald-950 text-emerald-400" :
                                        item.status === "error" ? "bg-red-950 text-red-400" :
                                        item.status === "uploading" ? "bg-amber-950 text-amber-400" :
                                        "bg-neutral-900 text-neutral-400"
                                      }`}>
                                        {item.status}
                                      </span>
                                    </div>

                                    {/* Progress Bar */}
                                    {(item.status === "uploading" || item.status === "success") && (
                                      <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden">
                                        <div 
                                          className={`h-full transition-all duration-300 ${item.status === "success" ? "bg-emerald-500" : "bg-[#b34a26]"}`}
                                          style={{ width: `${item.progress}%` }}
                                        />
                                      </div>
                                    )}
                                    {item.status === "error" && (
                                      <p className="text-[10px] text-red-400 truncate">{item.error || "Upload failed"}</p>
                                    )}
                                  </div>
                                  
                                  {item.status === "pending" && (
                                    <button
                                      onClick={() => removeFileFromQueue(idx)}
                                      className="p-1 rounded text-red-400 hover:bg-red-950/20 transition-all shrink-0"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sub-tab 2: Media Library */}
                  {ikSubTab === "library" && (
                    <div className="space-y-6">
                      {/* Filter Controls */}
                      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-black/25 p-3 rounded-xl border border-[rgba(217,187,151,0.06)]">
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto flex-1">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by asset name or tags..."
                            className="p-2 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-xs focus:border-[#b34a26] focus:outline-none flex-1 max-w-sm"
                          />
                          
                          {/* Collection Select */}
                          <select
                            value={collectionFilter}
                            onChange={(e) => setCollectionFilter(e.target.value)}
                            className="p-2 rounded-lg border border-[rgba(217,187,151,0.1)] bg-[#121111] text-white text-xs focus:border-[#b34a26] focus:outline-none"
                          >
                            <option value="all">All Collections</option>
                            {Array.from(
                              new Set(
                                mediaFiles
                                  .flatMap((file: any) => file.tags || [])
                                  .filter((tag: string) => tag.startsWith("collection:"))
                                  .map((tag: string) => tag.replace("collection:", ""))
                              )
                            ).map((coll: any) => (
                              <option key={coll} value={coll}>{coll}</option>
                            ))}
                          </select>
                        </div>
                        <button
                          onClick={loadMediaFiles}
                          disabled={loadingMedia}
                          className="w-full sm:w-auto px-4 py-2 border border-[rgba(217,187,151,0.15)] bg-[#121111] hover:bg-white/5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                          <RefreshCw size={12} className={loadingMedia ? "animate-spin" : ""} /> Sync Library
                        </button>
                      </div>

                      {loadingMedia ? (
                        <div className="flex flex-col items-center justify-center h-60 border border-[rgba(217,187,151,0.06)] bg-black/10 rounded-xl">
                          <RefreshCw className="animate-spin text-[#b34a26] mb-3" size={24} />
                          <p className="text-xs text-[rgba(217,187,151,0.5)]">Syncing library files with ImageKit Atlas...</p>
                        </div>
                      ) : (
                        <>
                          {/* Library Grid */}
                          {mediaFiles.length === 0 ? (
                            <div className="text-center py-16 border border-dashed border-[rgba(217,187,151,0.15)] rounded-xl">
                              <ImageIcon size={32} className="mx-auto text-[rgba(217,187,151,0.3)] mb-3" />
                              <p className="text-sm text-[rgba(217,187,151,0.4)]">No files available in ImageKit Library.</p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {mediaFiles
                                .filter((file: any) => {
                                  // Search query filter
                                  const nameMatch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
                                  const tagsMatch = file.tags?.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
                                  const matchesSearch = searchQuery === "" || nameMatch || tagsMatch;

                                  // Collection filter
                                  const hasCollectionTag = file.tags?.some((t: string) => t === `collection:${collectionFilter}`);
                                  const matchesCollection = collectionFilter === "all" || hasCollectionTag;

                                  return matchesSearch && matchesCollection;
                                })
                                .map((file: any) => (
                                  <div
                                    key={file.fileId}
                                    className="group relative border border-[rgba(217,187,151,0.08)] bg-black/20 hover:border-[#b34a26]/40 p-2.5 rounded-xl transition-all space-y-2 flex flex-col justify-between"
                                  >
                                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-neutral-900 flex items-center justify-center border border-[rgba(217,187,151,0.04)]">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={file.thumbnailUrl || file.url}
                                        alt={file.name}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                      />
                                      
                                      {/* Floating Quick Action Overlay */}
                                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button
                                          onClick={() => copyToClipboard(file.url, file.fileId)}
                                          className="p-2 rounded bg-black/70 text-white hover:text-[#d9bb97] transition-all text-xs font-semibold flex items-center gap-1.5"
                                        >
                                          {copiedId === file.fileId ? "Copied!" : "Copy Link"}
                                        </button>
                                        <button
                                          onClick={() => handleDeleteMediaFile(file.fileId)}
                                          className="p-2 rounded bg-red-950/80 text-red-300 hover:text-red-200 transition-all"
                                          title="Delete asset"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Asset Details */}
                                    <div className="space-y-1">
                                      <p className="text-[11px] font-bold text-white truncate max-w-full" title={file.name}>
                                        {file.name}
                                      </p>
                                      <div className="flex justify-between items-center text-[9px] text-[rgba(217,187,151,0.4)]">
                                        <span>{(file.size / 1024).toFixed(0)} KB</span>
                                        {file.width && file.height && (
                                          <span>{file.width}x{file.height}</span>
                                        )}
                                      </div>
                                      
                                      {/* Tags Badges */}
                                      {file.tags && file.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 pt-1.5">
                                          {file.tags.map((tag: string) => {
                                            const isColl = tag.startsWith("collection:");
                                            const displayTag = isColl ? tag.replace("collection:", "📦 ") : tag;
                                            return (
                                              <span
                                                key={tag}
                                                className={`text-[8px] px-1.5 py-0.5 rounded font-medium ${
                                                  isColl 
                                                    ? "bg-[rgba(179,74,38,0.15)] text-[#b34a26] border border-[rgba(179,74,38,0.2)]" 
                                                    : "bg-neutral-800 text-neutral-300"
                                                }`}
                                              >
                                                {displayTag}
                                              </span>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}
        </section>
      </main>

        {/* Global Modals for Forms */}
        {modalType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="relative border border-[rgba(217,187,151,0.15)] bg-[#121111] p-6 rounded-2xl w-full max-w-lg shadow-2xl my-8">
              
              {/* Team Form Modal */}
              {modalType === "team" && (
                <form onSubmit={handleTeamSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold font-syne text-white border-b border-[rgba(217,187,151,0.08)] pb-2">
                    {modalMode === "edit" ? "Edit Team Member" : "Add Team Member"}
                  </h3>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Full Name</label>
                    <input
                      type="text"
                      required
                      value={teamForm.name}
                      onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Designation / Role</label>
                    <input
                      type="text"
                      required
                      value={teamForm.role}
                      onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                      placeholder="Creative Director"
                      className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Image Resource Path</label>
                    <input
                      type="text"
                      required
                      value={teamForm.image}
                      onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })}
                      placeholder="/team/jane-doe.jpg or ImageKit URL"
                      className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none font-mono"
                    />
                  </div>

                  <div className="flex gap-3 justify-end pt-4 border-t border-[rgba(217,187,151,0.08)]">
                    <button
                      type="button"
                      onClick={() => setModalType(null)}
                      className="px-4 py-2 rounded-lg border border-[rgba(217,187,151,0.15)] bg-transparent text-sm hover:bg-white/5"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#b34a26] text-white text-sm hover:bg-[#9a3d1f] font-semibold"
                    >
                      {saving ? "Saving..." : "Save Member"}
                    </button>
                  </div>
                </form>
              )}

              {/* Blog Form Modal */}
              {modalType === "blog" && (
                <form onSubmit={handleBlogSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold font-syne text-white border-b border-[rgba(217,187,151,0.08)] pb-2">
                    {modalMode === "edit" ? "Edit Blog Post" : "Add Blog Post"}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Category Tag</label>
                      <input
                        type="text"
                        required
                        value={blogForm.tag}
                        onChange={(e) => setBlogForm({ ...blogForm, tag: e.target.value.toUpperCase() })}
                        placeholder="e.g. PHILOSOPHY"
                        className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Cover Image URL</label>
                      <input
                        type="text"
                        value={blogForm.image}
                        onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                        placeholder="https://ik.imagekit.io/... or /brand_identity_mockup.png"
                        className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Blog Title</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      placeholder="Why Storytelling Matters"
                      className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Snippet (Short Summary)</label>
                    <textarea
                      required
                      rows={2}
                      value={blogForm.snippet}
                      onChange={(e) => setBlogForm({ ...blogForm, snippet: e.target.value })}
                      placeholder="A short abstract paragraph summarizing the blog post..."
                      className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Full Content (Markdown or HTML)</label>
                    <textarea
                      required
                      rows={8}
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      placeholder="Write your main article content here. Supports markdown syntax..."
                      className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Highlight Quote (Optional)</label>
                    <input
                      type="text"
                      value={blogForm.quote}
                      onChange={(e) => setBlogForm({ ...blogForm, quote: e.target.value })}
                      placeholder="“Creativity is the greatest rebellion.”"
                      className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3 justify-end pt-4 border-t border-[rgba(217,187,151,0.08)]">
                    <button
                      type="button"
                      onClick={() => setModalType(null)}
                      className="px-4 py-2 rounded-lg border border-[rgba(217,187,151,0.15)] bg-transparent text-sm hover:bg-white/5"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#b34a26] text-white text-sm hover:bg-[#9a3d1f] font-semibold"
                    >
                      {saving ? "Saving..." : "Save Blog Post"}
                    </button>
                  </div>
                </form>
              )}

              {/* Showcase Form Modal */}
              {modalType === "showcase" && (
                <form onSubmit={handleShowcaseSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold font-syne text-white border-b border-[rgba(217,187,151,0.08)] pb-2">
                    {modalMode === "edit" ? "Edit Showcase Item" : "Add Showcase Item"}
                  </h3>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Tag</label>
                    <input
                      type="text"
                      required
                      value={showcaseForm.tag}
                      onChange={(e) => setShowcaseForm({ ...showcaseForm, tag: e.target.value })}
                      placeholder="Visual Identity"
                      className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Title</label>
                    <input
                      type="text"
                      required
                      value={showcaseForm.title}
                      onChange={(e) => setShowcaseForm({ ...showcaseForm, title: e.target.value })}
                      placeholder="Minimalist brand book"
                      className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Cover Image Path or URL</label>
                    <input
                      type="text"
                      required
                      value={showcaseForm.image}
                      onChange={(e) => setShowcaseForm({ ...showcaseForm, image: e.target.value })}
                      placeholder="/brand_identity_mockup.png or ImageKit URL"
                      className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none font-mono"
                    />
                    {mediaFiles.length > 0 && (
                      <div className="mt-1.5">
                        <span className="text-[9px] text-[rgba(217,187,151,0.5)] font-semibold block mb-1">Quick Select Cover (Applies Metadata Dimensions):</span>
                        <div className="flex gap-1.5 overflow-x-auto py-1 max-w-full no-scrollbar">
                          {mediaFiles.slice(0, 10).map((file) => (
                            <button
                              key={file.fileId}
                              type="button"
                              onClick={() => setShowcaseForm({
                                ...showcaseForm,
                                image: file.url,
                                width: file.width || 800,
                                height: file.height || 600
                              })}
                              className={`w-9 h-9 rounded-md overflow-hidden border transition-all shrink-0 ${
                                showcaseForm.image === file.url ? "border-[#b34a26] ring-1 ring-[#b34a26]" : "border-[rgba(217,187,151,0.15)] hover:border-[rgba(217,187,151,0.3)]"
                              }`}
                              title={`${file.name} (${file.width}x${file.height})`}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={file.thumbnailUrl || file.url} alt={file.name} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Cover Width (px)</label>
                      <input
                        type="number"
                        required
                        value={showcaseForm.width}
                        onChange={(e) => setShowcaseForm({ ...showcaseForm, width: parseInt(e.target.value) || 800 })}
                        placeholder="800"
                        className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Cover Height (px)</label>
                      <input
                        type="number"
                        required
                        value={showcaseForm.height}
                        onChange={(e) => setShowcaseForm({ ...showcaseForm, height: parseInt(e.target.value) || 600 })}
                        placeholder="600"
                        className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)]">Redirect Link</label>
                    <input
                      type="text"
                      required
                      value={showcaseForm.link}
                      onChange={(e) => setShowcaseForm({ ...showcaseForm, link: e.target.value })}
                      placeholder="#"
                      className="w-full p-2.5 rounded-lg border border-[rgba(217,187,151,0.1)] bg-black/40 text-white text-sm focus:border-[#b34a26] focus:outline-none font-mono"
                    />
                  </div>

                  {/* Grouped Images Selection */}
                  <div className="space-y-2 border-t border-[rgba(217,187,151,0.08)] pt-4">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(217,187,151,0.6)] block">
                      Grouped Portfolio Images (ImageKit Library)
                    </label>
                    <p className="text-[10px] text-[rgba(217,187,151,0.4)] mb-1">
                      Check which uploaded assets belong to this project's carousel gallery.
                    </p>
                    {mediaFiles.length === 0 ? (
                      <p className="text-xs italic text-[rgba(217,187,151,0.4)] py-2">No assets found. Upload files in the ImageKit Lab first.</p>
                    ) : (
                      <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1.5 bg-black/40 rounded-xl border border-[rgba(217,187,151,0.08)]">
                        {mediaFiles.map((file) => {
                          const isChecked = showcaseForm.images?.includes(file.url);
                          return (
                            <div
                              key={file.fileId}
                              onClick={() => {
                                const currentImages = showcaseForm.images || [];
                                const nextImages = isChecked
                                  ? currentImages.filter((url) => url !== file.url)
                                  : [...currentImages, file.url];
                                setShowcaseForm({ ...showcaseForm, images: nextImages });
                              }}
                              className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border transition-all ${
                                isChecked
                                  ? "border-[#b34a26] ring-2 ring-[#b34a26]/20 bg-[#b34a26]/5"
                                  : "border-[rgba(217,187,151,0.08)] hover:border-[rgba(217,187,151,0.18)] bg-black/25"
                              }`}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={file.thumbnailUrl || file.url} alt={file.name} className="w-full h-full object-cover" />
                              <div className="absolute inset-x-0 bottom-0 bg-black/60 p-0.5 text-center text-[7px] text-[rgba(217,187,151,0.8)] truncate">
                                {file.name}
                              </div>
                              {isChecked && (
                                <div className="absolute top-1 right-1 bg-[#b34a26] text-white rounded-full p-0.5 shadow-sm">
                                  <CheckCircle size={8} className="text-white fill-white" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 justify-end pt-4 border-t border-[rgba(217,187,151,0.08)]">
                    <button
                      type="button"
                      onClick={() => setModalType(null)}
                      className="px-4 py-2 rounded-lg border border-[rgba(217,187,151,0.15)] bg-transparent text-sm hover:bg-white/5"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#b34a26] text-white text-sm hover:bg-[#9a3d1f] font-semibold"
                    >
                      {saving ? "Saving..." : "Save Item"}
                    </button>
                  </div>
                </form>
              )}

              {/* Lead Expand Modal */}
              {modalType === "leadView" && selectedLead && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-syne text-white border-b border-[rgba(217,187,151,0.08)] pb-2 flex items-center justify-between">
                    <span>Transmission Details</span>
                    <span className="text-[10px] px-2.5 py-1 rounded bg-[rgba(179,74,38,0.1)] border border-[rgba(179,74,38,0.2)] text-[#b34a26]">
                      {selectedLead.interest}
                    </span>
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[rgba(217,187,151,0.5)]">Sender Name</span>
                      <p className="text-white font-semibold mt-0.5">{selectedLead.name}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[rgba(217,187,151,0.5)]">Email Address</span>
                      <p className="text-white font-mono mt-0.5 select-all">{selectedLead.email}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[rgba(217,187,151,0.5)]">Received At</span>
                      <p className="text-[rgba(217,187,151,0.8)] mt-0.5">{new Date(selectedLead.timestamp).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[rgba(217,187,151,0.5)]">Transmission Body</span>
                      <p className="text-[#cream] bg-black/50 p-4 rounded-xl border border-[rgba(217,187,151,0.06)] mt-1 whitespace-pre-line leading-relaxed font-sans select-text">
                        {selectedLead.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end pt-4 border-t border-[rgba(217,187,151,0.08)]">
                    <button
                      onClick={() => setModalType(null)}
                      className="px-5 py-2.5 rounded-xl border border-[rgba(217,187,151,0.15)] bg-white/5 text-xs font-semibold hover:bg-white/10 transition-all text-white"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    );
  }
