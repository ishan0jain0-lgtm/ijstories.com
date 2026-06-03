import mongoose, { Schema, model, models } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface BlogPost {
  id: string;
  tag: string;
  title: string;
  snippet: string;
  content: string;
  quote?: string;
  timestamp: string;
  image?: string;
}

export interface ShowcaseItem {
  id: string;
  tag: string;
  title: string;
  image: string;
  link: string;
  images: string[];
  width?: number;
  height?: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  interest: string;
  message: string;
  timestamp: string;
}

export interface DatabaseSchema {
  teamMembers: TeamMember[];
  blogPosts: BlogPost[];
  showcaseItems: ShowcaseItem[];
  leads: Lead[];
}

const defaultTeamMembers: TeamMember[] = [
  { name: "Ishan Jain", role: "Founder", image: "/team/Ishan Jain - Founder.jpg" },
  { name: "Rahul", role: "Video Editor & Co-Founder", image: "/team/ rahul - video editor and cofounder.jpg" },
  { name: "Jasleen", role: "Manager", image: "/team/Jasleen - Manager.png" },
  { name: "Mohinder", role: "Editor", image: "/team/Mohinder - editor.jpg" },
  { name: "Ramit", role: "D.O.P.", image: "/team/Ramit - D.O.P.jpg" },
  { name: "Archit", role: "Script Writer", image: "/team/archit - script writing.jpg" },
  { name: "Gino", role: "Music Expert", image: "/team/gino-music expert.jpg" },
  { name: "Gaurav", role: "Sound Producer", image: "/team/gaurav-soundproducer.jpg" },
  { name: "Niemisha", role: "Branding Designer", image: "/team/niemisha - branding.jpg" },
  { name: "Omkar", role: "Web Developer", image: "/team/omkar - web dev.jpg" },
  { name: "Raghav", role: "UI/UX Designer", image: "/team/raghav - ui:ux.jpg" }
];

const defaultBlogPosts: BlogPost[] = [
  {
    id: "blog-1",
    tag: "PHILOSOPHY",
    title: "The Human Brand Paradox",
    snippet: "Why do we love some brands and ignore others? Because some feel like sterile corporations, and others feel like human characters. We design for character, not corporations.",
    content: "Why do we love some brands and ignore others? Because some feel like sterile corporations, and others feel like human characters. We design for character, not corporations.\n\n### The Core Connection\n\nIn the digital age, consumers are bombarded with messages. The brands that stand out are those that build an emotional bank account. They don't just speak; they listen, they adapt, and they exhibit human traits.\n\n### Authenticity vs. Manufacture\n\nConsistency creates trust; authenticity creates devotion. If it is manufactured, humans will sense it instantly. We must construct visual and narrative landscapes that resonate on a personal level.",
    quote: "“A brand is a living entity, an emotional bank account. From identity to influence, it must beat like a human heart.”",
    timestamp: new Date().toISOString(),
    image: "/brand_identity_mockup.png"
  },
  {
    id: "blog-2",
    tag: "STRATEGY",
    title: "Identity is More Than a Logo",
    snippet: "A logo is an anchor, but an identity is an entire landscape. It is the texture of the linen paper, the subtle pacing of a film, the spacing of text, the quiet confidence of your brand voice.",
    content: "A logo is an anchor, but an identity is an entire landscape. It is the texture of the linen paper, the subtle pacing of a film, the spacing of text, the quiet confidence of your brand voice.\n\n### Designing the Landscape\n\nWhen we construct a brand identity, we think about the entire sensory experience. How does the paper feel? How does a video transition flow? What is the pace of communication? These details form the silent brand language.",
    quote: "“Consistency creates trust; authenticity creates devotion. If it is manufactured, humans will sense it instantly.”",
    timestamp: new Date().toISOString(),
    image: "/creative_direction_portrait.png"
  },
  {
    id: "blog-3",
    tag: "COLLABORATION",
    title: "The Ecosystem Advantage",
    snippet: "By operating a lean core alongside an international ecosystem of filmmakers, visual artists, and thinkers, we bypass agency bloat and match elite talent directly with our clients.",
    content: "By operating a lean core alongside an international ecosystem of filmmakers, visual artists, and thinkers, we bypass agency bloat and match elite talent directly with our clients.\n\n### Scaling Fluidly\n\nWe don't maintain a massive, stagnant office. Instead, we run a nimble core that orchestrates international talent on demand. This approach matches your project with elite filmmakers, developers, and designers suited precisely for your brand.",
    quote: "“Creativity cannot be mass-produced in silos. We bring the right minds together at the perfect cultural moment.”",
    timestamp: new Date().toISOString(),
    image: "/brand_identity_mockup.png"
  }
];

const defaultShowcaseItems: ShowcaseItem[] = [
  {
    id: "showcase-1",
    tag: "Visual Identity",
    title: "Minimalist brand book",
    image: "/brand_identity_mockup.png",
    link: "#",
    images: [],
    width: 800,
    height: 600
  },
  {
    id: "showcase-2",
    tag: "Creative Direction",
    title: "Human-centric campaign",
    image: "/creative_direction_portrait.png",
    link: "#",
    images: [],
    width: 600,
    height: 800
  }
];

// Mongoose Schemas
const TeamMemberSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true }
});

const BlogPostSchema = new Schema({
  id: { type: String, required: true },
  tag: { type: String, required: true },
  title: { type: String, required: true },
  snippet: { type: String, required: true },
  content: { type: String, required: true },
  quote: { type: String },
  timestamp: { type: String, required: true },
  image: { type: String }
});

const ShowcaseItemSchema = new Schema({
  id: { type: String, required: true },
  tag: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  images: { type: [String], default: [] },
  width: { type: Number, default: 800 },
  height: { type: Number, default: 600 }
});

const LeadSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  interest: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: String, required: true }
});

export const TeamMemberModel = models.TeamMember || model("TeamMember", TeamMemberSchema);
export const BlogPostModel = models.BlogPost || model("BlogPost", BlogPostSchema);
export const ShowcaseItemModel = models.ShowcaseItem || model("ShowcaseItem", ShowcaseItemSchema);
export const LeadModel = models.Lead || model("Lead", LeadSchema);

export async function getDb(): Promise<DatabaseSchema> {
  try {
    await dbConnect();

    const teamMembers = await TeamMemberModel.find({}).lean();
    const blogPosts = await BlogPostModel.find({}).lean();
    const showcaseItems = await ShowcaseItemModel.find({}).lean();
    const leads = await LeadModel.find({}).sort({ timestamp: -1 }).lean();

    return {
      teamMembers: teamMembers.map((m: any) => ({ name: m.name, role: m.role, image: m.image })),
      blogPosts: blogPosts.map((n: any) => ({
        id: n.id,
        tag: n.tag,
        title: n.title,
        snippet: n.snippet,
        content: n.content || "",
        quote: n.quote || "",
        timestamp: n.timestamp || new Date().toISOString(),
        image: n.image || ""
      })),
      showcaseItems: showcaseItems.map((s: any) => ({ id: s.id, tag: s.tag, title: s.title, image: s.image, link: s.link, images: s.images || [], width: s.width || 800, height: s.height || 600 })),
      leads: leads.map((l: any) => ({ id: l.id, name: l.name, email: l.email, interest: l.interest, message: l.message, timestamp: l.timestamp }))
    };
  } catch (error) {
    console.error("Failed to fetch MongoDB database, using defaults:", error);
    return {
      teamMembers: defaultTeamMembers,
      blogPosts: defaultBlogPosts,
      showcaseItems: defaultShowcaseItems,
      leads: []
    };
  }
}

export async function writeDb(db: Partial<DatabaseSchema>): Promise<boolean> {
  try {
    await dbConnect();

    if (db.teamMembers) {
      await TeamMemberModel.deleteMany({});
      await TeamMemberModel.insertMany(db.teamMembers);
    }
    if (db.blogPosts) {
      await BlogPostModel.deleteMany({});
      await BlogPostModel.insertMany(db.blogPosts);
    }
    if (db.showcaseItems) {
      await ShowcaseItemModel.deleteMany({});
      await ShowcaseItemModel.insertMany(db.showcaseItems);
    }
    if (db.leads) {
      await LeadModel.deleteMany({});
      await LeadModel.insertMany(db.leads);
    }
    return true;
  } catch (error) {
    console.error("Failed to write to MongoDB database", error);
    return false;
  }
}

import { unstable_cache } from "next/cache";

export const getCachedDb = unstable_cache(
  async () => getDb(),
  ["db-content"],
  {
    tags: ["db-content"],
    revalidate: 3600
  }
);
