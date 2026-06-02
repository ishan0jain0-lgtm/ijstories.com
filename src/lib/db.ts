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

export interface NotebookNote {
  id: string;
  tag: string;
  title: string;
  snippet: string;
  quote: string;
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
  notebookNotes: NotebookNote[];
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

const defaultNotebookNotes: NotebookNote[] = [
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

const NotebookNoteSchema = new Schema({
  id: { type: String, required: true },
  tag: { type: String, required: true },
  title: { type: String, required: true },
  snippet: { type: String, required: true },
  quote: { type: String }
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
export const NotebookNoteModel = models.NotebookNote || model("NotebookNote", NotebookNoteSchema);
export const ShowcaseItemModel = models.ShowcaseItem || model("ShowcaseItem", ShowcaseItemSchema);
export const LeadModel = models.Lead || model("Lead", LeadSchema);

export async function getDb(): Promise<DatabaseSchema> {
  try {
    await dbConnect();

    let teamMembers = await TeamMemberModel.find({}).lean();
    let notebookNotes = await NotebookNoteModel.find({}).lean();
    let showcaseItems = await ShowcaseItemModel.find({}).lean();
    let leads = await LeadModel.find({}).sort({ timestamp: -1 }).lean();

    // If empty collections, seed the defaults
    if (teamMembers.length === 0 && notebookNotes.length === 0 && showcaseItems.length === 0) {
      await TeamMemberModel.insertMany(defaultTeamMembers);
      await NotebookNoteModel.insertMany(defaultNotebookNotes);
      await ShowcaseItemModel.insertMany(defaultShowcaseItems);
      
      teamMembers = await TeamMemberModel.find({}).lean();
      notebookNotes = await NotebookNoteModel.find({}).lean();
      showcaseItems = await ShowcaseItemModel.find({}).lean();
    }

    return {
      teamMembers: teamMembers.map((m: any) => ({ name: m.name, role: m.role, image: m.image })),
      notebookNotes: notebookNotes.map((n: any) => ({ id: n.id, tag: n.tag, title: n.title, snippet: n.snippet, quote: n.quote || "" })),
      showcaseItems: showcaseItems.map((s: any) => ({ id: s.id, tag: s.tag, title: s.title, image: s.image, link: s.link, images: s.images || [], width: s.width || 800, height: s.height || 600 })),
      leads: leads.map((l: any) => ({ id: l.id, name: l.name, email: l.email, interest: l.interest, message: l.message, timestamp: l.timestamp }))
    };
  } catch (error) {
    console.error("Failed to fetch MongoDB database", error);
    return {
      teamMembers: defaultTeamMembers,
      notebookNotes: defaultNotebookNotes,
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
    if (db.notebookNotes) {
      await NotebookNoteModel.deleteMany({});
      await NotebookNoteModel.insertMany(db.notebookNotes);
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
