import type { AgentId } from "@/lib/agents";

export type AgentProfileContent = {
  id: AgentId;
  mandate: string;
  specialties: string[];
  specializes: string;
  helpsAuthority: string;
  whenInvolved: string;
  exampleTasks: string[];
  handoffs: string;
  related: AgentId[];
  userSees: string;
  whyMatters: string;
  quote: string;
};

export const AGENT_PROFILES: Record<AgentId, AgentProfileContent> = {
  olivia: {
    id: "olivia",
    mandate: "Olivia guides users from first setup to first confident output.",
    specialties: ["Onboarding", "Goal clarity", "Voice intake", "Guided education", "Activation"],
    specializes:
      "Olivia is responsible for turning a blank workspace into a configured authority engine. She gathers professional context, clarifies goals, guides voice intake, helps define content pillars, and prepares the first content request.",
    helpsAuthority:
      "Olivia reduces the friction between intention and action. Instead of asking users to figure out how to become visible, she guides them through the specific inputs the system needs to start building public authority.",
    whenInvolved:
      "During signup, onboarding, guided setup, new-feature education, and reactivation moments.",
    exampleTasks: [
      "Define the user's first strategic goals.",
      "Guide writing sample collection.",
      "Recommend first content pillars.",
      "Prepare the first content request.",
      "Suggest training modules.",
    ],
    handoffs:
      "Olivia hands content setup to Leo, analytics setup to Sam, support questions to Konrad, and training guidance to Alex.",
    related: ["leo", "sam", "konrad", "alex"],
    userSees:
      "A calm guided onboarding experience, progress rail, \"Your Agent is Learning\" panel, and contextual guidance.",
    whyMatters:
      "Most experts do not fail because they lack insight. They fail because they never get configured into a repeatable system.",
    quote: "Let's make the first step feel clear.",
  },
  leo: {
    id: "leo",
    mandate: "Leo turns expertise into strategically useful content.",
    specialties: ["Content strategy", "Drafting", "Storytelling", "Platform variants", "Content pillars"],
    specializes:
      "Leo develops content angles, drafts, platform variants, and editorial structures that turn a user's expertise into publishable public thought leadership.",
    helpsAuthority:
      "Leo helps users stop staring at a blank page. He transforms professional experience into specific, high-signal posts, articles, threads, and campaigns.",
    whenInvolved:
      "When users request content, need ideas, revise drafts, create campaigns, or repurpose existing material.",
    exampleTasks: [
      "Draft a LinkedIn post.",
      "Create an X thread.",
      "Turn an insight into a newsletter.",
      "Build a 30-day content calendar.",
      "Repurpose a post into a carousel concept.",
    ],
    handoffs:
      "Leo works with Sam for performance context, Alex for research support, Talia for quality review, and Vincent for media adaptation.",
    related: ["sam", "alex", "talia", "vincent"],
    userSees: "Drafts, content options, platform variants, agent notes, and review-ready content.",
    whyMatters: "Authority compounds when insight becomes a consistent publishing rhythm.",
    quote: "Your insight already has the material. I shape the signal.",
  },
  sam: {
    id: "sam",
    mandate: "Sam turns performance data into strategy.",
    specialties: ["Brand Score", "Influence Delta", "Analytics", "Growth briefings", "Recommendations"],
    specializes:
      "Sam reads performance data, identifies trends, calculates Brand Score and Influence Delta, and recommends what to do next.",
    helpsAuthority:
      "Sam prevents users from publishing blindly. He turns each post into feedback for the next strategy cycle.",
    whenInvolved:
      "After publishing, during weekly growth briefings, when content pillars need review, and when the user needs next-best-action recommendations.",
    exampleTasks: [
      "Generate weekly growth briefing.",
      "Identify top-performing content.",
      "Recommend stronger content pillars.",
      "Compare channel performance.",
      "Find underperforming themes.",
    ],
    handoffs:
      "Sam gives insights to Leo for content planning, Olivia for onboarding guidance, Solomon for strategic positioning, and the dashboard for user visibility.",
    related: ["leo", "olivia", "solomon"],
    userSees:
      "Analytics dashboards, Brand Score, Influence Delta, content pillar radar, and weekly recommendations.",
    whyMatters: "Numbers only matter when they improve the next decision.",
    quote: "The numbers are only useful when they change what you do next.",
  },
  talia: {
    id: "talia",
    mandate: "Talia protects quality, brand safety, and evidence.",
    specialties: ["Quality review", "Brand safety", "Fact-check readiness", "Voice alignment", "Approval readiness"],
    specializes:
      "Talia evaluates drafts for clarity, credibility, evidence, voice fit, and risk before they move toward approval.",
    helpsAuthority:
      "Talia helps ensure the user does not publish content that sounds generic, unsupported, risky, or misaligned with their brand.",
    whenInvolved:
      "Before approval, during revision, when a claim needs support, when enterprise rules apply, and when content is flagged.",
    exampleTasks: [
      "Score a draft for quality.",
      "Flag weak claims.",
      "Recommend a clearer angle.",
      "Check voice alignment.",
      "Route risky content for review.",
    ],
    handoffs:
      "Talia sends approved work to the approval queue, sends revision needs back to Leo, asks Alex for support context, and escalates high-risk items when needed.",
    related: ["leo", "alex", "konrad"],
    userSees: "QA notes, risk labels, citation prompts, and \"ready for approval\" signals.",
    whyMatters:
      "Reputation is built slowly and damaged quickly. Quality control is not optional.",
    quote: "Strong content should be clear, credible, and safe to stand behind.",
  },
  vincent: {
    id: "vincent",
    mandate: "Vincent turns written authority into multimedia assets.",
    specialties: ["Video", "Audio", "Scripts", "Media concepts", "Visual storytelling"],
    specializes:
      "Vincent converts approved ideas, posts, and scripts into multimedia concepts: short video ideas, audio-ready scripts, visual treatments, and production-ready media directions.",
    helpsAuthority:
      "Many audiences engage through video and audio. Vincent helps a user's insight travel beyond written posts without forcing them to become a content producer.",
    whenInvolved:
      "When a post can become a video, podcast segment, carousel, voiceover, training asset, or short-form clip.",
    exampleTasks: [
      "Turn a post into a short video script.",
      "Create a podcast segment outline.",
      "Suggest a carousel storyboard.",
      "Generate a visual treatment.",
      "Prepare media variations for channels.",
    ],
    handoffs:
      "Vincent receives core messages from Leo, quality constraints from Talia, performance signals from Sam, and training needs from Alex.",
    related: ["leo", "talia", "sam", "alex"],
    userSees: "Media suggestions, scripts, visual concepts, and optional video/audio assets.",
    whyMatters: "Authority becomes more durable when it appears in multiple formats.",
    quote: "Some ideas deserve to be seen, heard, and remembered.",
  },
  alex: {
    id: "alex",
    mandate: "Alex makes platform knowledge and guidance accessible.",
    specialties: ["Help", "Documentation", "Training", "Knowledge retrieval", "Walkthroughs"],
    specializes:
      "Alex answers product questions, retrieves guidance, explains workflows, and supports training content.",
    helpsAuthority:
      "Users build confidence faster when the platform explains why things happen and what to do next.",
    whenInvolved:
      "During support, training, onboarding questions, feature help, and workflow explanations.",
    exampleTasks: [
      "Explain Brand Score.",
      "Explain why content was flagged.",
      "Guide channel connection.",
      "Recommend a training module.",
      "Create walkthrough content.",
    ],
    handoffs:
      "Alex receives support routing from Konrad, video production requests go to Vincent, and onboarding guidance can return to Olivia.",
    related: ["konrad", "vincent", "olivia"],
    userSees: "Help answers, documentation, training cards, walkthrough recommendations.",
    whyMatters: "A powerful system should still feel understandable.",
    quote: "I'll make the system understandable.",
  },
  konrad: {
    id: "konrad",
    mandate: "Konrad routes users to the right specialist.",
    specialties: ["Support triage", "Routing", "Escalation", "Service quality", "Issue classification"],
    specializes:
      "Konrad listens to support requests, determines intent, and brings in the correct specialist.",
    helpsAuthority: "He keeps users moving by reducing support friction and routing questions quickly.",
    whenInvolved:
      "Whenever a user asks for help, reports a publishing issue, has a billing question, or does not know where to go.",
    exampleTasks: [
      "Route billing to Beatrice.",
      "Route content issues to Talia.",
      "Route product questions to Alex.",
      "Route strategy questions to Leo or Sam.",
      "Escalate unresolved issues.",
    ],
    handoffs: "Konrad hands off to Alex, Beatrice, Leo, Sam, Talia, or enterprise support.",
    related: ["alex", "beatrice", "leo", "sam", "talia"],
    userSees: "A calm support chat and clear specialist handoff.",
    whyMatters: "Premium service feels simple because the routing is invisible.",
    quote: "You should never have to know who to ask.",
  },
  beatrice: {
    id: "beatrice",
    mandate: "Beatrice keeps subscription and billing experience clear.",
    specialties: ["Billing", "Plans", "Trials", "Add-ons", "Subscription support"],
    specializes:
      "Beatrice helps users understand plans, usage, renewal, payment state, enterprise seats, and add-ons.",
    helpsAuthority: "Billing clarity keeps users focused on the work rather than account confusion.",
    whenInvolved:
      "During trial questions, upgrade paths, plan changes, failed payments, refunds, and enterprise billing.",
    exampleTasks: [
      "Explain current plan.",
      "Recommend upgrade path.",
      "Clarify trial status.",
      "Explain add-on access.",
      "Route refund approval.",
    ],
    handoffs:
      "Beatrice can hand subscription-health patterns to Sam, account issues to Konrad, and high-risk refunds to human review.",
    related: ["sam", "konrad"],
    userSees: "Billing guidance, plan clarity, usage summaries, and subscription support.",
    whyMatters: "Trust includes financial clarity.",
    quote: "Clarity matters before commitment.",
  },
  solomon: {
    id: "solomon",
    mandate: "Solomon supports long-term positioning and market strategy.",
    specialties: ["Positioning", "Market intelligence", "Narrative strategy", "Authority lane selection"],
    specializes:
      "Solomon helps identify a user's strongest market position and long-term content thesis.",
    helpsAuthority:
      "He helps prevent scattered content by defining the strategic lane where the user can become most credible.",
    whenInvolved:
      "During advanced strategy, enterprise programs, market positioning, and long-term authority planning.",
    exampleTasks: [
      "Identify strongest niche.",
      "Frame executive narrative.",
      "Recommend long-term themes.",
      "Compare competitor visibility.",
      "Suggest authority expansion path.",
    ],
    handoffs: "Solomon informs Leo's content strategy, Sam's analytics framing, and enterprise brand rules.",
    related: ["leo", "sam"],
    userSees: "Strategic recommendations and positioning insights.",
    whyMatters: "Visibility without positioning becomes noise.",
    quote: "The right niche is where expertise becomes unmistakable.",
  },
  cody: {
    id: "cody",
    mandate: "Cody supports internal product implementation.",
    specialties: ["Development", "Implementation", "Internal operations", "Feature support"],
    specializes:
      "Cody is an internal specialist that helps translate approved product ideas into implementation tasks and improvements.",
    helpsAuthority:
      "Users benefit indirectly when workflows, integrations, and platform features improve faster.",
    whenInvolved:
      "Internal development, feature support, workflow improvements, and technical implementation planning.",
    exampleTasks: [
      "Convert a feature request into implementation steps.",
      "Support internal workflow updates.",
      "Help document technical changes.",
      "Assist with system improvements.",
    ],
    handoffs: "Cody works with Solomon for strategy, Talia for QA, Scout for documentation, and Chloe for release notes.",
    related: ["solomon", "talia", "scout", "chloe"],
    userSees: "Usually nothing directly. Cody works behind the product.",
    whyMatters: "A better platform compounds the user's leverage.",
    quote: "The best systems quietly improve.",
  },
  scout: {
    id: "scout",
    mandate: "Scout captures workflows for documentation and learning.",
    specialties: ["Screen recording", "Walkthroughs", "Training assets", "Documentation support"],
    specializes:
      "Scout records workflows, captures product interactions, and creates raw material for training or support content.",
    helpsAuthority: "Users learn faster when important workflows are clearly demonstrated.",
    whenInvolved: "Training content, feature walkthroughs, support documentation, and product updates.",
    exampleTasks: [
      "Record onboarding walkthrough.",
      "Capture publishing workflow.",
      "Document approval process.",
      "Prepare assets for Vincent.",
    ],
    handoffs: "Scout passes raw footage and workflow captures to Vincent and documentation context to Alex or Chloe.",
    related: ["vincent", "alex", "chloe"],
    userSees: "Training videos, walkthroughs, and support assets.",
    whyMatters: "Good guidance reduces friction.",
    quote: "If a workflow matters, it should be easy to explain.",
  },
  chloe: {
    id: "chloe",
    mandate: "Chloe tracks product memory and change.",
    specialties: ["Changelog", "Release notes", "Product memory", "Updates"],
    specializes:
      "Chloe records what changed, what shipped, and what users or operators need to know.",
    helpsAuthority:
      "For users, product memory creates trust. For the platform, it ensures changes are visible and explainable.",
    whenInvolved: "After feature releases, workflow updates, product improvements, and system changes.",
    exampleTasks: [
      "Draft changelog.",
      "Summarize platform updates.",
      "Record product change history.",
      "Announce new capabilities.",
    ],
    handoffs: "Chloe receives release details from Cody, QA status from Talia, and documentation assets from Scout.",
    related: ["cody", "talia", "scout"],
    userSees: "What's New updates, release notes, and product announcements.",
    whyMatters: "Trust grows when progress is visible.",
    quote: "Progress is easier to trust when it is visible.",
  },
};

export const AGENT_IDS = Object.keys(AGENT_PROFILES) as AgentId[];
