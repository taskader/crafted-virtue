import olivia from "@/assets/agents/olivia.jpg";
import leo from "@/assets/agents/leo.jpg";
import sam from "@/assets/agents/sam.jpg";
import alex from "@/assets/agents/alex.jpg";
import beatrice from "@/assets/agents/beatrice.jpg";
import konrad from "@/assets/agents/konrad.jpg";
import talia from "@/assets/agents/talia.jpg";
import solomon from "@/assets/agents/solomon.jpg";
import cody from "@/assets/agents/cody.jpg";
import scout from "@/assets/agents/scout.jpg";
import vincent from "@/assets/agents/vincent.jpg";
import chloe from "@/assets/agents/chloe.jpg";

export type AgentId =
  | "olivia" | "leo" | "sam" | "alex" | "beatrice" | "konrad"
  | "talia" | "solomon" | "cody" | "scout" | "vincent" | "chloe";

export type Agent = {
  id: AgentId;
  name: string;
  title: string;
  role: string;
  avatar: string;
  alt: string;
  accent: string; // tailwind-friendly hex/oklch usable inline
};

export const AGENTS: Record<AgentId, Agent> = {
  olivia:   { id: "olivia",   name: "Olivia",   title: "Onboarding & Engagement Specialist", role: "Guides every new operator through the first 90 days.", avatar: olivia,   alt: "Editorial portrait of Olivia, the onboarding specialist", accent: "#C9A84C" },
  leo:      { id: "leo",      name: "Leo",      title: "Creative Content Architect",          role: "Shapes drafts, narratives, and content systems.",        avatar: leo,      alt: "Editorial portrait of Leo, the creative content architect", accent: "#1E3A5F" },
  sam:      { id: "sam",      name: "Sam",      title: "Analytics & Strategy Advisor",        role: "Turns performance into operating strategy.",             avatar: sam,      alt: "Editorial portrait of Sam, the analytics advisor", accent: "#2D8A7E" },
  alex:     { id: "alex",     name: "Alex",     title: "Knowledge Specialist",                role: "Maintains your private documentation and reference graph.", avatar: alex,  alt: "Editorial portrait of Alex, the knowledge specialist", accent: "#5A6B7B" },
  beatrice: { id: "beatrice", name: "Beatrice", title: "Billing & Subscription Success",      role: "Owns subscription health, invoices, and renewals.",      avatar: beatrice, alt: "Editorial portrait of Beatrice, the billing specialist", accent: "#D4842A" },
  konrad:   { id: "konrad",   name: "Konrad",   title: "Concierge",                           role: "Routes support, triages, and protects your time.",       avatar: konrad,   alt: "Editorial portrait of Konrad, the concierge", accent: "#1A3A6B" },
  talia:    { id: "talia",    name: "Talia",    title: "Autonomous Marketing & QA Manager",   role: "Audits brand quality before anything ships.",            avatar: talia,    alt: "Editorial portrait of Talia, the marketing & QA manager", accent: "#C45C7C" },
  solomon:  { id: "solomon",  name: "Solomon",  title: "Strategic Oracle",                    role: "Senior strategist for high-stakes market reads.",        avatar: solomon,  alt: "Editorial portrait of Solomon, the strategic oracle", accent: "#3B3F8C" },
  cody:     { id: "cody",     name: "Cody",     title: "Autonomous Coder",                    role: "Builds and maintains workflow code on demand.",          avatar: cody,     alt: "Editorial portrait of Cody, the autonomous coder", accent: "#3B4252" },
  scout:    { id: "scout",    name: "Scout",    title: "Screen Recorder",                     role: "Captures product walkthroughs and visual documentation.", avatar: scout,   alt: "Editorial portrait of Scout, the screen recorder", accent: "#2D7E7E" },
  vincent:  { id: "vincent",  name: "Vincent",  title: "Video Producer",                      role: "Renders polished video and audio from approved scripts.", avatar: vincent, alt: "Editorial portrait of Vincent, the video producer", accent: "#6B4FBB" },
  chloe:    { id: "chloe",    name: "Chloe",    title: "Chronicler",                          role: "Maintains the changelog, product memory, and timelines.", avatar: chloe,   alt: "Editorial portrait of Chloe, the chronicler", accent: "#B5651D" },
};

export const AGENT_LIST: Agent[] = Object.values(AGENTS);

/** Resolve an agent by name (case-insensitive). Returns null if unknown. */
export function findAgent(name?: string): Agent | null {
  if (!name) return null;
  const key = name.trim().toLowerCase() as AgentId;
  return AGENTS[key] ?? null;
}
