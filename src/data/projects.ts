export interface ProjectSection {
  type: "text" | "quote" | "stats" | "images" | "image-text" | "video";
  heading?: string;
  sectionNumber?: string;
  sectionLabel?: string;
  body?: string[];
  quote?: string;
  stats?: { number: number; suffix: string; label: string }[];
  images?: { label: string; dark?: boolean; height?: number; src?: string; objectPosition?: string }[];
  imagePosition?: "left" | "right";
  layout?: "phone-gallery" | "desktop-showcase" | "photo-grid";
  videoSrc?: string;
  videoLabel?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  featured?: boolean;
  thumbnail?: string;
  thumbnailVideo?: string;
  heroImage?: string;
  heroObjectPosition?: string;
  meta: { label: string; value: string }[];
  sections: ProjectSection[];
  outcome: {
    heading: string;
    body: string[];
    contributions: string[];
    collaborators: string[];
    tools: string[];
  };
  nextProject: { slug: string; title: string; subtitle: string };
}

export const PROJECTS: Project[] = [
  {
    slug: "clarvos",
    title: "Clarvos",
    subtitle: "Agentic AI Ad Platform",
    description:
      "Designing an autonomous system that creates, launches, and optimizes ad campaigns across social platforms — from trend discovery to creative generation to performance monitoring.",
    tags: ["AI / Agents", "SaaS", "Video Editor", "Campaign Management"],
    color: "#6366f1",
    featured: true,
    thumbnail: "/images/clarvos/Homepage-AI-Optimized-Agentic.png",
    thumbnailVideo: "/images/clarvos/full-flow-no-cursor.mp4",
    heroImage: "/images/clarvos/Clarvos hero Image.png",
    heroObjectPosition: "top",
    meta: [
      { label: "Client", value: "Clarvos" },
      { label: "Role", value: "Lead Product Designer" },
      { label: "Duration", value: "2024 – Present" },
      { label: "Platform", value: "Web SaaS" },
    ],
    sections: [
      {
        type: "video",
        videoSrc: "/images/clarvos/clarvos-core-flow.mp4",
        videoLabel: "Clarvos — Full Flow",
      },
      {
        type: "text",
        sectionNumber: "01",
        sectionLabel: "Overview",
        heading:
          "The advertising industry runs on manual workflows. What if an AI could handle the entire pipeline?",
        body: [
          "Clarvos is an agentic AI platform that autonomously manages advertising campaigns end-to-end. It discovers trending topics, generates on-brand creative assets (images and video), launches campaigns across social media platforms, monitors performance in real-time, and optimizes spend — all with minimal human intervention.",
          "My role as Lead Product Designer was to make an extraordinarily complex system feel approachable. The challenge wasn’t just designing screens — it was designing trust. Users needed to understand what the AI was doing, why, and feel confident handing over creative and financial decisions to an autonomous agent.",
        ],
      },
      {
        type: "video",
        videoSrc: "/images/clarvos/clarvos-feed-hd-wide.mp4",
        videoLabel: "Clarvos — Feed",
      },
      {
        type: "quote",
        quote:
          "The hardest design problem in agentic AI isn’t the interface — it’s designing the right level of human oversight without killing the autonomy.",
      },
      {
        type: "text",
        body: [
          "I led product discovery, interaction design, prototyping, and design system creation. Working closely with product managers, engineers, and the AI/ML team, I shaped both the user experience and the product strategy — defining not just how the system looks, but how it thinks and communicates its decisions.",
        ],
      },
      {
        type: "stats",
        stats: [
          {
            number: 6,
            suffix: "+",
            label: "Autonomous agent steps in the pipeline",
          },
          {
            number: 3,
            suffix: "",
            label: "Social platforms managed simultaneously",
          },
          {
            number: 80,
            suffix: "%",
            label: "Reduction in campaign setup time",
          },
          {
            number: 12,
            suffix: "x",
            label: "More creative variants tested per cycle",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "02",
        sectionLabel: "Creative Intelligence",
        heading: "AI-generated creatives that actually look good",
        body: [
          "The platform generates on-brand ad creatives — images and video — by understanding a brand’s visual identity, tone, and audience. Rather than outputting generic AI slop, the system produces polished, production-quality assets that feel intentionally designed.",
          "I designed the creative library as a command center where marketers can organize, review, and curate AI-generated variants. Assets are grouped into sets by campaign, with contextual actions for comparing, downloading, and reassigning creatives across platforms.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Creative Library — Organizing AI-Generated Assets",
            src: "/images/clarvos/Creatives-Library.png",
          },
        ],
      },
      {
        type: "text",
        body: [
          "Every creative asset surfaces a hybrid quality score that combines AI analysis with human judgment. The scoring system evaluates intent, style, composition, and emotional valence — giving marketers data-driven confidence in which variants to promote, remix, or retire.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Hybrid Scoring — AI Quality Analysis & Style Controls",
            src: "/images/clarvos/Hybrid Score + Insights.png",
          },
          {
            label: "AI Image Editor — Prompt-Driven Variant Generation",
            src: "/images/clarvos/AI Edit Image.png",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Trend Discovery",
        heading: "Campaigns that start with what’s already working",
        body: [
          "Rather than guessing what content will resonate, Clarvos surfaces trending topics across social platforms in real time. The discover view ranks trends by volume, velocity, and audience alignment — then lets marketers launch a campaign directly from any trend with one click.",
          "I designed two complementary views: a data-driven rankings table for analytical users, and a visual mood board for creatives who think in imagery. Both paths lead to the same outcome — a pre-populated campaign brief built on real audience signals.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Trend Rankings — Topic Analysis & Campaign Actions",
            src: "/images/clarvos/tiktok-trends.png",
          },
          {
            label: "Visual Trends — Social Content Mood Board",
            src: "/images/clarvos/Homepage-Trends@2x.png",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "04",
        sectionLabel: "Campaign Builder",
        heading: "From blank slate to live campaign in minutes",
        body: [
          "The campaign builder surfaces an AI-generated plan with budget allocation, ROAS predictions, and audience targeting already filled in. Marketers can accept the defaults, adjust any parameter, or override the AI entirely. The system explains why it made each recommendation, building trust through transparency.",
          "Before anything goes live, every placement runs through a review and approval flow. Creatives are shown in their actual platform context — Instagram feed, TikTok story, Reddit post — so marketers approve what their audience will actually see, not an abstracted preview.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Campaign Plan — AI-Generated Strategy & Budget",
            src: "/images/clarvos/Clarvos-Campaign-Plan.png",
          },
          {
            label: "Review & Approve — Platform-Specific Placements",
            src: "/images/clarvos/Review-Approve-Placements.png",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "05",
        sectionLabel: "Video Editor",
        heading: "Prompt-driven video editing for non-editors",
        body: [
          "One of the most technically ambitious features: a scene-based video editor that lets marketers describe what they want in natural language. The AI generates video scenes from text prompts, complete with start frames, end frames, and transitions.",
          "I designed the editor around a timeline metaphor familiar to anyone who’s used iMovie or Premiere, but replaced the complexity with AI-powered controls. Users compose scenes by describing them, preview variations, and assemble final videos with drag-and-drop — no editing skills required.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Canvas Studio — Scene Timeline & Media Tracks",
            src: "/images/clarvos/Canvas-Studio-Editor.png",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "06",
        sectionLabel: "Performance",
        heading: "Closing the loop from spend to insight",
        body: [
          "The performance dashboard aggregates metrics across every connected platform — Facebook, TikTok, Google, Instagram, Pinterest, Snapchat — into a single view. Marketers see real spend, real results, and real trends without switching between six different ad managers.",
          "I designed the dashboard around progressive disclosure: top-level KPIs surface the headline numbers, the trend graph reveals patterns over time, and the campaign table lets users drill into individual ad performance. Every row is actionable — one click to pause, boost, or duplicate a campaign.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Performance Dashboard — Cross-Platform Campaign Analytics",
            src: "/images/clarvos/Performance-Dashboard.png",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "07",
        sectionLabel: "Design Decisions",
        heading: "Three principles that shaped everything",
        body: [
          "Progressive Autonomy: Rather than presenting the AI as a black box, I designed a transparency model where users can see exactly what the agent is doing at each step. Users start with full manual control and gradually allow more autonomy as they gain confidence.",
          "Familiar Metaphors for Unfamiliar Technology: The video editor uses a timeline. The creative gallery uses a card grid. The campaign builder uses a wizard. Every complex AI interaction is wrapped in a pattern users already understand.",
          "Designed for Iteration, Not Perfection: AI outputs aren’t always right on the first try. I designed every creative surface with inline editing, quick regeneration, and A/B variant comparison built in.",
        ],
      },
    ],
    outcome: {
      heading: "From concept to production",
      body: [
        "Clarvos is actively in production and evolving. The platform manages real ad spend across multiple social platforms, generating and optimizing campaigns autonomously. The design work established the interaction patterns and trust framework that make it possible for marketers to confidently delegate complex decisions to an AI agent.",
        "This project reinforced a conviction I carry into every engagement: the best AI products don’t replace human judgment — they amplify it. Design is the bridge that makes that amplification feel natural.",
      ],
      contributions: [
        "Product Discovery",
        "Interaction Design",
        "Design System",
        "Prototyping",
        "User Research",
        "Product Strategy",
      ],
      collaborators: [
        "Product Managers",
        "AI/ML Engineers",
        "Full-Stack Engineers",
        "Marketing Team",
      ],
      tools: ["Figma", "Figjam", "Miro", "Notion", "Claude", "Cursor"],
    },
    nextProject: {
      slug: "ai-training",
      title: "AI Model Training",
      subtitle: "Evaluating Frontier LLMs for Google, OpenAI & More",
    },
  },
  {
    slug: "ai-training",
    title: "AI Model Training",
    subtitle: "Evaluating Frontier LLMs for Google, OpenAI & More",
    description:
      "Contract work contributing to the development of OpenAI’s ChatGPT, Google’s Gemini, and other leading AI models through multi-axis evaluation, SFT rating, and RLHF — assessing groundedness, truthfulness, instruction-following, safety, and factual accuracy.",
    tags: ["AI / LLMs", "RLHF", "SFT", "Evaluation"],
    color: "#10b981",
    featured: true,
    thumbnail: "/images/prompt-evals/mountains-oai.png",
    heroImage: "/images/prompt-evals/mountains-oai.png",
    meta: [
      { label: "Client", value: "Google, OpenAI & Others (via DataAnnotation)" },
      { label: "Role", value: "AI Training Specialist / Evaluator" },
      { label: "Duration", value: "2024" },
      { label: "Platform", value: "Web-based evaluation tools" },
    ],
    sections: [
      {
        type: "text",
        sectionNumber: "01",
        sectionLabel: "Overview",
        heading: "Shaping the next generation of AI models",
        body: [
          "Contributed to the training and evaluation of frontier large language models through structured human feedback. The work involved multi-axis rating systems used for supervised fine-tuning (SFT) and reinforcement learning from human feedback (RLHF).",
          "Each response was evaluated across dimensions including groundedness, truthfulness, instruction-following, safety, and factual accuracy. This work directly shaped model behavior for products used by hundreds of millions of people.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            src: "/images/prompt-evals/prompt evals.png",
            label: "Multi-turn evaluation interface — conversation rating workflow",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "02",
        sectionLabel: "OpenAI — ChatGPT",
        heading: "Contributing to the next version of ChatGPT",
        body: [
          "Evaluated and rated outputs for a new version of ChatGPT, applying a rigorous multi-axis assessment framework. The work focused on improving the model’s conversational quality, factual reliability, and alignment with user intent.",
        ],
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Additional Annotations",
        heading: "Evaluation work for Google, Anthropic, and other frontier model providers",
        body: [
          "Worked on evaluation tasks for Google’s Gemini Copilot, rating model outputs across multiple quality axes. The project involved assessing the model’s ability to follow complex instructions, provide grounded and factually accurate responses, and maintain safety guardrails.",
          "Beyond direct evaluation, also served in a quality assurance capacity — reviewing other evaluators’ ratings for consistency, accuracy, and adherence to rubric standards. This meta-review role helped maintain the integrity of the training data pipeline.",
        ],
      },
    ],
    outcome: {
      heading: "Contributing to models used by billions",
      body: [
        "This work sits at the intersection of AI development and human judgment — a critical but often invisible layer in how frontier models learn to be helpful, harmless, and honest. The evaluations contributed directly to model versions that shipped to hundreds of millions of users worldwide.",
      ],
      contributions: [
        "Multi-axis LLM Evaluation",
        "SFT & RLHF Rating",
        "Quality Assurance",
        "Rubric Interpretation",
        "Cross-model Evaluation",
      ],
      collaborators: [
        "DataAnnotation",
        "Google AI",
        "OpenAI",
      ],
      tools: ["DataAnnotation Platform", "Custom Evaluation Tools"],
    },
    nextProject: {
      slug: "gator",
      title: "Gator",
      subtitle: "AI Tech Support Chatbot",
    },
  },
  {
    slug: "gator",
    title: "Gator",
    subtitle: "AI Tech Support Chatbot",
    description:
      "Agentic diagnostic tool for technical workers. Multimodal scanning builds case context, then an LLM guides step-by-step actions with product-aware responses. Native iOS app.",
    tags: ["Mobile", "Conversational AI", "QR/Vision", "Field Service"],
    color: "#2d5a3d",
    thumbnail: "/images/gator/Gator cover.png",
    heroImage: "/images/gator/Gator First Image.png",
    meta: [
      { label: "Client", value: "Gator Tech Support" },
      { label: "Role", value: "UI Designer" },
      { label: "Scope", value: "Full App Design" },
      { label: "Platform", value: "iOS Native" },
    ],
    sections: [
      {
        type: "text",
        sectionNumber: "01",
        sectionLabel: "The Problem",
        heading:
          "A technician is standing in front of a broken air conditioner. They need an answer in 30 seconds, not 30 minutes.",
        body: [
          "HVAC technicians work alone, often in unfamiliar buildings, diagnosing equipment they may have never seen before. When they get stuck, the current options are bad: call a senior tech (who might not answer), dig through a 400-page PDF manual on a phone screen, or guess and risk making it worse.",
          "Gator reimagines field support as a conversation. Point your phone at the unit, scan the barcode, and start talking. The AI knows the specific model, its common failure modes, and the exact steps to fix them — delivered in plain language, one step at a time.",
        ],
      },
      {
        type: "quote",
        quote:
          "The best interface for a technician with greasy hands and a flashlight in their mouth is a conversation.",
      },
      {
        type: "text",
        sectionNumber: "02",
        sectionLabel: "Onboarding",
        heading: "Get technicians in, not through a tutorial",
        body: [
          "I designed the complete mobile experience — from onboarding through diagnosis to guided repair flows. The design challenge was creating an interface that feels as simple as texting a knowledgeable friend, while handling the complexity of thousands of equipment models and diagnostic pathways underneath.",
          "The onboarding is ruthlessly minimal: phone number verification, one permission prompt for the camera, and they’re in. No account creation form. No feature tour. The first thing they see is Gator introducing itself and asking what they need help with.",
        ],
      },
      {
        type: "images",
        layout: "phone-gallery",
        images: [
          { label: "Gator Splash Screen", src: "/images/gator/Gator-Splash.png" },
          { label: "Welcome — Hey, it’s Gator", src: "/images/gator/Diagnose-0.png" },
        ],
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Equipment Recognition",
        heading: "The camera is the search bar",
        body: [
          "Every HVAC unit has a barcode or serial number plate. Gator’s scanner reads it instantly, pulling the exact make, model, and specs from its product database. No scrolling through menus, no typing model numbers on a tiny keyboard with cold fingers.",
          "For units where the label is damaged or missing, there’s a manual fallback: type the serial number or describe the unit. The AI can often identify equipment from a description of its appearance and the symptoms alone.",
        ],
      },
      {
        type: "images",
        layout: "phone-gallery",
        images: [
          { label: "QR Scanner — Camera View", src: "/images/gator/QR-scan.png" },
          { label: "Searching Database", src: "/images/gator/Diagnose-4.png" },
          { label: "Product Identified", src: "/images/gator/Diagnose-2.png" },
        ],
      },
      {
        type: "text",
        sectionNumber: "04",
        sectionLabel: "The Conversation",
        heading:
          "Designing a chat that feels like talking to a senior tech",
        body: [
          "The diagnostic conversation is Gator’s core experience. The AI doesn’t just answer questions — it asks the right ones. Each question narrows down the problem, just like an experienced technician would think through it.",
          "I designed the chat to feel warm and confident without being patronizing. Gator has a personality — it’s knowledgeable but approachable, like a coworker who’s been doing this for 20 years and genuinely wants to help. The tone was as important as the UI.",
        ],
      },
      {
        type: "images",
        layout: "phone-gallery",
        images: [
          { label: "AI Diagnostic Conversation", src: "/images/gator/Diagnose-1.png" },
          { label: "Follow-up Question", src: "/images/gator/Diagnose-3.png" },
          { label: "Conversation History", src: "/images/gator/Diagnose.png" },
        ],
      },
      {
        type: "text",
        sectionNumber: "05",
        sectionLabel: "Guided Repair",
        heading: "One step at a time, never lost",
        body: [
          "When the AI has enough information, the conversation mode shifts to a structured repair flow. Each step is a discrete card with clear instructions, the ability to ask follow-up questions, and two options: \"Problem solved\" or \"Next step.\"",
          "This transition from open conversation to guided steps was a critical design decision. Diagnosis is exploratory — it needs the flexibility of chat. But repair is procedural — it needs structure and confidence. The interface adapts its personality to match.",
        ],
      },
      {
        type: "images",
        layout: "phone-gallery",
        images: [
          { label: "Step 1 — Check the Thermostat", src: "/images/gator/Repair.png" },
          { label: "Step 2 — Check Compressor", src: "/images/gator/Repair-1.png" },
          { label: "Problem Solved", src: "/images/gator/Repair-2.png" },
        ],
      },
      {
        type: "quote",
        quote:
          "Diagnosis needs the freedom of conversation. Repair needs the structure of a checklist. The trick is knowing when to shift between them.",
      },
      {
        type: "text",
        sectionNumber: "06",
        sectionLabel: "Voice Mode",
        heading: "Hands free when it matters",
        body: [
          "Technicians often can’t hold a phone while working. Voice mode lets them speak naturally to Gator while keeping both hands on the equipment. The interface strips away to just the mascot, a mic button, and a camera option for sending photos mid-repair.",
          "The voice interaction needed to feel like a real conversation, not a voice command interface. Gator listens, confirms understanding, and responds in the same warm tone as the text chat — just spoken aloud.",
        ],
      },
      {
        type: "images",
        layout: "phone-gallery",
        images: [
          { label: "Voice Repair — Listening", src: "/images/gator/Gator speaks.png" },
          { label: "Voice Chat Ended", src: "/images/gator/Voice ended.png" },
        ],
      },
    ],
    outcome: {
      heading: "Ready for development",
      body: [
        "The Gator prototype is fully designed in Figma with a wired click-through demo that covers the complete user journey from sign-in to completed repair. The design is ready for iOS development, with detailed specs, component documentation, and interaction annotations.",
        "Designing Gator reinforced something I believe deeply: the most sophisticated AI is useless if the interface doesn’t meet people where they are. A technician doesn’t care about the model architecture — they care about fixing the AC before the customer gets home.",
      ],
      contributions: [
        "UI Design",
        "Interaction Design",
        "Prototyping",
        "User Flow Mapping",
        "Design System",
      ],
      collaborators: [
        "30+ unique screens",
        "Full click-through prototype",
        "All states documented",
      ],
      tools: ["Figma", "Figma Prototyping", "FigJam"],
    },
    nextProject: {
      slug: "respond-ai",
      title: "Respond AI",
      subtitle: "LLM for Logistics",
    },
  },
  {
    slug: "respond-ai",
    title: "Respond AI",
    subtitle: "LLM for Logistics",
    description:
      "Integrating an LLM into a dispatch platform to pre-draft carrier responses. Human-in-the-loop design keeps operators in control while cutting response time dramatically.",
    tags: ["AI / LLM", "Enterprise", "Human-in-the-Loop"],
    color: "#7c3aed",
    thumbnail: "/images/respond-ai/Respond Cover.png",
    heroImage: "/images/respond-ai/Respond-new-hero.png",
    heroObjectPosition: "top",
    meta: [
      { label: "Client", value: "McLeod Software" },
      { label: "Role", value: "Lead Product Designer" },
      { label: "Scope", value: "Product Design & Discovery" },
      { label: "Platform", value: "Web / Desktop" },
    ],
    sections: [
      {
        type: "text",
        sectionNumber: "01",
        sectionLabel: "Overview",
        heading:
          "Respond AI helps specialists guide long-distance carriers to their next pick-up and drop-off locations.",
        body: [
          "With an onboard LLM accessing data in nearly real-time, operators now begin with responses pre-populated. They perform a review check, and can focus on adding the human contact that drivers value for the long haul.",
          "Shipping is decentralized, with many different companies running call centers to keep drivers up to date. It takes people time to query data tables and provide the most up to date information. Meanwhile, more messages from drivers keep coming in, leading to costly delays.",
        ],
      },
      {
        type: "text",
        sectionNumber: "02",
        sectionLabel: "The Business Case",
        heading: "Every 30 minutes a fleet is delayed translates to $1.37 million in lost revenue.",
        body: [
          "Call centers route drivers dynamically to keep everything rolling. But it takes time for human operators to figure it out. What if an LLM could minimize delays?",
          "In designing Respond AI, I created an agnostic solution that can integrate with existing data streams to pre-draft helpful responses. Making this human-in-the-loop keeps operators in the center, with the ability to make edits and add their human insight.",
          "Doing so also provides a runway for operators to rate and annotate model outputs, improving the quality and accuracy of responses.",
        ],
      },
      {
        type: "quote",
        quote:
          "Human-in-the-loop isn’t a compromise — it’s a feature. Operators stay in control while the AI handles the heavy lifting.",
      },
      {
        type: "video",
        layout: "desktop-showcase",
        videoSrc: "/images/respond-ai/Email.mov",
        videoLabel: "Email Interface — AI-assisted Carrier Communication",
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Command Center",
        heading: "A central dashboard that helps operators get oriented for the day\u2019s work",
        body: [
          "Each operator begins their day with a prioritized action list, real-time message and email queues, and a quality score tracking AI response accuracy. The command center surfaces what matters most so operators can focus on high-value conversations.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Respond AI — Operator Command Center",
            src: "/images/respond-ai/Refined Navigation Home.png",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "04",
        sectionLabel: "Reporting",
        heading: "Measuring progress against daily and quarterly goals",
        body: [
          "The reporting dashboard gives team leads visibility into emails per day, response times, and quote volumes across teams. Operators set daily goals and track trends over time, creating a feedback loop that drives continuous improvement.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Respond AI — Reporting Dashboard",
            src: "/images/respond-ai/reporting.png",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "05",
        sectionLabel: "Messaging",
        heading: "AI pre-drafts responses so operators can review, edit, and send",
        body: [
          "The messaging interface gives operators a queue of driver conversations on the left and a threaded view on the right. The LLM pre-drafts each response using real-time data \u2014 operators simply review, make edits if needed, and accept. This same pattern extends to mobile follow-ups, where drivers get quick, contextual answers on the road.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Messaging Interface — AI Pre-drafted Responses",
            src: "/images/respond-ai/respond-messaging-2x.png",
          },
        ],
      },
      {
        type: "images",
        layout: "photo-grid",
        images: [
          {
            label: "Driver Follow-up — Mobile Conversation View",
            src: "/images/respond-ai/driver-followup-2.png",
            height: 600,
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "06",
        sectionLabel: "Templates",
        heading: "Templates that steer model outputs and ensure quality",
        body: [
          "To guide the AI\u2019s responses, I designed a template system built around variables. Operators create reusable templates with dynamic fields \u2014 shipper, date, route, weather \u2014 that inform the mega-prompts and multi-shot prompting behind each response, ensuring consistency and accuracy.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Template Builder — Variable-based Response Templates",
            src: "/images/respond-ai/templates.png",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "07",
        sectionLabel: "Testing & Feedback",
        heading: "Overwhelmingly positive response from active customers",
        body: [
          "Using click-through prototypes, several rounds of tests were run with active customers who use the current product. I wrote a conversation guide to structure the interviews, as well as set up a hypothesis board. I educated the team about research methods.",
          "The feedback was overwhelmingly positive, so much so that the company president asked me to look at their other software applications and find opportunities.",
        ],
      },
    ],
    outcome: {
      heading: "From prototype to production",
      body: [
        "Respond AI moved from concept through user testing to development handoff. The human-in-the-loop design pattern established a framework for integrating AI into existing operator workflows without disrupting the trust and personal touch that drivers rely on.",
        "The project demonstrated that AI in logistics doesn’t need to replace human operators — it needs to give them superpowers.",
      ],
      contributions: [
        "Product Design",
        "Product Discovery",
        "Prototyping",
        "Design Systems",
        "User Research",
      ],
      collaborators: [
        "Van Carlisle (Product Manager)",
        "Sujit Kunwor (Data Scientist)",
        "Engineering Team",
      ],
      tools: ["Figma", "FigJam", "Miro", "Notion"],
    },
    nextProject: {
      slug: "astrazeneca",
      title: "AstraZeneca Care",
      subtitle: "Digital Health Platform",
    },
  },
  {
    slug: "astrazeneca",
    title: "AstraZeneca Care",
    subtitle: "Remote Patient Monitoring",
    description:
      "Leading design for a clinical research platform used in oncology R&D. Apps and tools for running trials, engaging patients and doctors, and managing health data.",
    tags: ["Health Tech", "Clinical Trials", "Design Leadership"],
    color: "#0ea5e9",
    thumbnail: "/images/astrazeneca/CARE-patient-reported-outcomes.png",
    heroImage: "/images/astrazeneca/CARE-patient-reported-outcomes.png",
    meta: [
      { label: "Client", value: "AstraZeneca" },
      { label: "Role", value: "Product Discovery & Design Lead" },
      { label: "Duration", value: "3 Months" },
      { label: "Platform", value: "Mobile & Web" },
    ],
    sections: [
      {
        type: "text",
        sectionNumber: "01",
        sectionLabel: "Overview",
        heading:
          "A digital platform to enable remote patient monitoring in the context of clinical research.",
        body: [
          "As a product design and discovery lead at AstraZeneca, I worked on cancer research platforms in the digital health oncology division. I designed a digital platform to enable remote patient monitoring in the context of patient-reported outcomes (PRO) clinical measures.",
          "In addition to regular doctor visits, patients used the platform to keep track of their symptoms and treatment side effects on a daily basis. Studies have shown that doing so tends to have a very significant benefit to long-term health outcomes, as well as longevity and patient quality of life.",
          "I interviewed dozens of patients, doctors, RNs, and research staff to inform this work. As a team lead, I directed bi-weekly design sprints, each of which had specific hypotheses under consideration, always with user testing via prototype.",
        ],
      },
      {
        type: "text",
        sectionNumber: "02",
        sectionLabel: "Voice Symptom Tracking",
        heading:
          "Patients can track their symptoms just by speaking in plain language.",
        body: [
          "The system uses an LLM to extract and normalize keywords from a one-minute voice recording. PPG technology is also used to gather health metrics by reading the bloodflow through the patient’s skin while they speak.",
        ],
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Quick Check-in",
        heading: "Two core user journeys for different moments",
        body: [
          "Some patients would want to do an ad-hoc check in to capture a health update. This needed to take less than one minute. At other key points, patients would need to sit down and do a guided check-in, more comprehensively, which would take up to 10 minutes.",
          "Designing for both ensured rich data capture while giving patients a mechanism for low-impact participation during little pockets of time, fitting with their actual lived experience.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Patient-Reported Outcomes — Weekly Insight & Pain Tracking",
            src: "/images/astrazeneca/CARE-patient-reported-outcomes.png",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "04",
        sectionLabel: "Concept Exploration",
        heading: "Iterating on data visualization through rapid concept testing",
        body: [
          "Based on research insights, I led ideation through sketching and collaborative workshops with stakeholders. Multiple concept variations were developed to explore how patients could best understand their symptom data — from weekly insights and community comparisons to actionable pain management articles.",
          "Each concept was tested with real patients to understand which data presentations felt most useful and least overwhelming. This iterative process helped us converge on a design that balanced clinical rigor with genuine patient empathy.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Concept Testing — Symptom Data Visualization Explorations",
            src: "/images/astrazeneca/Concepts-Testing.png",
          },
          {
            label: "Design Variations — Pain Tracking Interface Iterations",
            src: "/images/astrazeneca/Variations.png",
          },
        ],
      },
    ],
    outcome: {
      heading: "Impact on clinical research",
      body: [
        "Through the iterative process, I led the team in designing an experience that patients loved, and that delivered rich data for the cancer research team. The platform demonstrated that thoughtful design can make clinical research more humane while simultaneously producing better data.",
      ],
      contributions: [
        "Product Discovery",
        "Design Leadership",
        "Interaction Design",
        "User Research",
        "Design Sprints",
      ],
      collaborators: [
        "Clinical Research Team",
        "Patients & Oncologists",
        "Engineering",
        "Product Management",
      ],
      tools: ["Figma", "FigJam", "Miro", "Sketch"],
    },
    nextProject: {
      slug: "miami",
      title: "University of Miami",
      subtitle: "Health Research App",
    },
  },
  {
    slug: "miami",
    title: "University of Miami",
    subtitle: "Clinical Cancer Research Platform",
    description:
      "Designing research tools at the intersection of clinical practice and patient engagement for one of the country’s leading academic medical centers.",
    tags: ["Health Tech", "Research", "Mobile"],
    color: "#f97316",
    thumbnail: "/images/miami/University-Miami-cover.png",
    heroImage: "/images/miami/University-Miami-cover.png",
    meta: [
      { label: "Client", value: "University of Miami" },
      { label: "Role", value: "Lead Product Designer" },
      { label: "Duration", value: "9 Months" },
      { label: "Platform", value: "Mobile & Web" },
    ],
    sections: [
      {
        type: "text",
        sectionNumber: "01",
        sectionLabel: "Overview",
        heading:
          "A patient & doctor platform for clinical cancer research at the Sylvester Cancer Research Center.",
        body: [
          "The Sylvester Cancer Research Center at the University of Miami was conducting clinical trials for new cancer treatments but faced challenges in efficiently monitoring patient symptoms and correlating treatments with health outcomes.",
          "They needed a platform that would allow patients to easily track their symptoms and enable doctors to remotely monitor health and make data-driven decisions. The study design used randomized controlled trials — participants assigned to either intervention or control groups — to prove causal impact, not just correlation.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Randomized Controlled Trial Design — Intervention vs. Control",
            src: "/images/miami/miami-average-treatment-effect.png",
          },
        ],
      },
      {
        type: "video",
        layout: "desktop-showcase",
        videoSrc: "/images/miami/Reflect-Demo.mov",
        videoLabel: "Reflect — Patient Video Check-in Demo",
      },
      {
        type: "text",
        sectionNumber: "02",
        sectionLabel: "Discovery",
        heading:
          "From patient interviews to storyboards and wireframes",
        body: [
          "Interviews with 8 cancer patients and 5 oncologists revealed that patients struggled to remember symptoms during clinic visits, and doctors needed real-time data for timely interventions. Both wanted a system that wouldn’t add burden.",
          "I developed storyboards to map the patient journey — from daily check-ins to doctor reviews — and translated those into wireframes exploring video-based symptom capture, biometric data collection, and caregiver sharing flows.",
        ],
      },
      {
        type: "images",
        layout: "photo-grid",
        images: [
          {
            label: "Storyboard — Patient Journey from Check-in to Doctor Review",
            src: "/images/miami/Storyboard.jpg",
          },
          {
            label: "Wireframes — Video Recording & Symptom Capture Flows",
            src: "/images/miami/Wireframes.jpg",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Design & Prototyping",
        heading: "Mapping complex user flows into clear, testable interactions",
        body: [
          "I created detailed user flows for both patient and clinician personas, mapping every interaction from app onboarding through daily symptom logging, video reflections, and data review. Each screen was annotated with functional specifications to guide development.",
          "Key features included a mobile app for patients to log symptoms daily, a dashboard for doctors to view trends and receive alerts, and integration with wearable devices to automatically track health metrics.",
        ],
      },
      {
        type: "images",
        layout: "photo-grid",
        images: [
          {
            label: "User Flow — Patient & Clinician Interaction Paths",
            src: "/images/miami/User-Flow.png",
          },
          {
            label: "Annotated Screens — Video Check-in Functional Specifications",
            src: "/images/miami/Annotations.png",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "04",
        sectionLabel: "The Platform",
        heading: "MyWellness — patient coaching with unprecedented precision",
        body: [
          "The myWellness platform gives clinicians a comprehensive dashboard with food intake tracking, symptom severity trends, and real-time actigraphy data. Video coaching sessions allow face-to-face check-ins with patients while viewing their health data side by side.",
          "An integrated messaging system supports ongoing communication between coaching sessions, with file sharing for photos and documents. The platform supports patient coaching with a level of precision that has not been possible before.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "MyWellness Dashboard — Patient Health Data & Symptom Trends",
            src: "/images/miami/my-wellness-dashboard.png",
          },
          {
            label: "Video Coaching — Face-to-Face Patient Check-in",
            src: "/images/miami/Patient-coaching.png",
          },
          {
            label: "Messaging — Ongoing Patient-Clinician Communication",
            src: "/images/miami/Messaging.png",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "05",
        sectionLabel: "Study Configuration",
        heading: "Configurable study modules that adapt to each trial’s needs",
        body: [
          "The platform’s library system allows researchers to create and reuse questionnaire modules across studies. Each module supports configurable automation rules — if a patient misses a response or reports a severe symptom, the system can automatically notify the research team. This flexibility enabled new studies launched in partnership with Yale University.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Study Module Editor — Configurable Questionnaires & Automation",
            src: "/images/miami/my-wellness-study-design-control.png",
          },
        ],
      },
      {
        type: "stats",
        stats: [
          { number: 200, suffix: "+", label: "Patients across 3 clinical trials" },
          {
            number: 17000,
            suffix: "+",
            label: "Hours of support call transcripts analyzed",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "06",
        sectionLabel: "Publications",
        heading: "Results written up in peer-reviewed journals",
        body: [
          "The Remote Patient Monitoring System was successfully implemented in three clinical trials, involving over 200 patients. Research teams were able to analyze over 17,000 hours of support call transcripts captured via the MyWellness platform.",
        ],
      },
    ],
    outcome: {
      heading: "Published research, real patient impact",
      body: [
        "The MyWellness platform proved that thoughtful product design can directly impact clinical research outcomes. By making symptom tracking effortless for patients and data access immediate for doctors, the platform enabled a new paradigm in patient-centered cancer research.",
      ],
      contributions: [
        "Lead Product Design",
        "User Research",
        "Prototyping",
        "Information Architecture",
        "Visual Design",
      ],
      collaborators: [
        "Sylvester Cancer Center",
        "Yale University",
        "Patients & Oncologists",
        "Engineering Team",
      ],
      tools: ["Figma", "Sketch", "InVision", "Miro"],
    },
    nextProject: {
      slug: "content-studio",
      title: "Content Studio",
      subtitle: "Cyber Security Training",
    },
  },
  {
    slug: "content-studio",
    title: "Content Studio",
    subtitle: "Cyber Security Training Environment",
    description:
      "Designing a modular content authoring environment for cybersecurity educators to create competency-based assessments and hands-on training labs.",
    tags: ["Defense", "Enterprise", "Canvas UI", "Design Systems"],
    color: "#06b6d4",
    thumbnail: "/images/content-studio/content-studio-cyber-training.png",
    heroImage: "/images/content-studio/content-studio-cyber-training.png",
    meta: [
      { label: "Client", value: "Ultimate Knowledge Inst. / CYBERCOM" },
      { label: "Role", value: "Lead Product Designer" },
      { label: "Duration", value: "2 Months" },
      { label: "Platform", value: "Web / Windows" },
    ],
    sections: [
      {
        type: "text",
        sectionNumber: "01",
        sectionLabel: "Background",
        heading:
          "An enterprise LMS with an integrated, highly configurable virtual lab environment.",
        body: [
          "As cyber threats continue to evolve, there is an increasing need for hands-on, realistic training environments for cybersecurity professionals. Traditional learning methods often fall short in providing practical experience with complex network topologies and diverse operating systems.",
          "The challenge was to design and implement an enterprise-level Learning Management System with an integrated, highly configurable virtual lab environment for cybersecurity staff to test and enhance their competencies.",
        ],
      },
      {
        type: "text",
        sectionNumber: "02",
        sectionLabel: "Canvas Environment",
        heading:
          "A modular Miro-style canvas for content authors to create training labs.",
        body: [
          "I designed a content authoring environment for educators and trainers to create competency-based assessments, as well as to design hands-on exercises. These tools serve the purpose of teaching new skills to existing staff (upskilling), as well as verifying competencies for new joiners.",
          "Users needed the ability to create custom palettes of containers and virtual machines, define network topology maps using subnet masks, routers, and connections, and inspect details like CPU cores and memory management. Crucially, the canvas supports creating intentionally broken scenarios — since diagnosing and fixing network issues is part of the skillset being taught.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Network Topology Canvas — Virtual Lab Designer",
            src: "/images/content-studio/content-studio-cyber-training.png",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Content Authoring",
        heading: "A page workbench for building courses and interactive exercises",
        body: [
          "Beyond the virtual lab canvas, Content Studio includes a rich page editor for authoring course content. Educators can build structured curricula with rich text, embedded media, and interactive exercise blocks — including multiple-choice questions with automated grading and detailed explanations.",
          "The workbench supports courses ranging from introductory social engineering awareness to hands-on router configuration, all within a consistent authoring experience.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Page Workbench — Course Content Editor",
            src: "/images/content-studio/Page-Workbench-1.png",
          },
          {
            label: "Exercise Builder — Interactive Assessment Creation",
            src: "/images/content-studio/Create-New-Block.png",
          },
        ],
      },
    ],
    outcome: {
      heading: "Shipped within Sprint Zero",
      body: [
        "The Content Studio design was completed within the Sprint Zero phase and handed off for development. The design system and canvas-based authoring environment established a scalable foundation for the training platform.",
      ],
      contributions: [
        "Lead Product Design",
        "Design System Creation",
        "Canvas UI Design",
        "Enterprise UX",
      ],
      collaborators: [
        "Development Team",
        "Cybersecurity SMEs",
        "Training Specialists",
      ],
      tools: ["Figma", "FigJam", "Miro"],
    },
    nextProject: {
      slug: "t-rowe-price",
      title: "T. Rowe Price",
      subtitle: "401(k) Platform",
    },
  },
  {
    slug: "t-rowe-price",
    title: "T. Rowe Price",
    subtitle: "Retail Investment 401(k) Platform",
    description:
      "Creating a self-service platform that empowered retail investors to manage their 401(k) accounts with guidance, reducing support calls by 40%.",
    tags: ["Finance", "Enterprise", "Design Leadership"],
    color: "#0891b2",
    thumbnail: "/images/trowe-price/Landing-page-401k-overview.jpg",
    heroImage: "/images/trowe-price/Landing-page-401k-overview.jpg",
    meta: [
      { label: "Client", value: "T. Rowe Price" },
      { label: "Role", value: "Senior Manager, UX Design Lead" },
      { label: "Scope", value: "Product Design & Strategy" },
      { label: "Platform", value: "Web & Mobile" },
    ],
    sections: [
      {
        type: "text",
        sectionNumber: "01",
        sectionLabel: "Overview",
        heading:
          "Empowering retail investors to manage their 401(k) with confidence.",
        body: [
          "T. Rowe Price’s 401(k) service for retail investors relied heavily on support calls for account management, including distributions. Investors often felt guilty or discouraged when making withdrawals, and the process lacked financial wellness support.",
          "The goal was to create a self-service platform that empowered investors to manage their 401(k) accounts while providing guidance and support to minimize the negative impact of withdrawals.",
        ],
      },
      {
        type: "text",
        sectionNumber: "02",
        sectionLabel: "Design Sprint",
        heading: "A two-day product design workshop bringing together customers and stakeholders",
        body: [
          "I led a comprehensive two-day product design workshop, based on a modified form of the Google Ventures design sprint. We co-created with a diverse range of customers, designers, engineers, stakeholders, SMEs, and product managers.",
          "Teams mapped the end-to-end investor journey — from evaluating options through finalizing a withdrawal — using Jobs-to-be-Done frameworks to uncover the functional, emotional, and social dimensions of each decision point.",
        ],
      },
      {
        type: "images",
        layout: "photo-grid",
        images: [
          {
            label: "Design Sprint — Journey Mapping & Jobs-to-be-Done Workshop",
            src: "/images/trowe-price/Workshop-UXR.jpg",
          },
          {
            label: "Collaborative Workshop — Team Mapping Session",
            src: "/images/trowe-price/workshop-yellow-1.jpeg",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Prototyping",
        heading: "Educational content and tools to understand the impact of withdrawals",
        body: [
          "Key concepts included a self-service platform for managing 401(k) accounts including distributions, educational content and tools to help investors understand the impact of withdrawals and explore alternatives, personalized financial wellness support and goal-setting features, and emotionally supportive language and design elements.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "401(k) Platform — Account Overview & Withdrawal Options",
            src: "/images/trowe-price/Landing-page-401k-overview.jpg",
          },
        ],
      },
      {
        type: "stats",
        stats: [
          {
            number: 40,
            suffix: "%",
            label: "Reduction in support calls related to distributions",
          },
          {
            number: 30,
            suffix: "%",
            label: "Increase in investor engagement with educational content",
          },
          {
            number: 20,
            suffix: "%",
            label: "Reduction in average amount withdrawn per distribution",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "04",
        sectionLabel: "Iterative Testing",
        heading: "Discovering and fixing discoverability issues in real time",
        body: [
          "Regular tests were run to confirm or falsify hypotheses under consideration. In one instance, the team realized that users may not even have known where to look for the starting point of the flow.",
          "Based on that learning, they quickly pivoted to address discoverability issues, restructured some of the IA on the sitewide nav, and changed terminology to be less jargon-laden — such as changing ‘take a distribution’ to ‘take a withdrawal.’",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            label: "Usability Testing — Task Success Rates & Navigation Analysis",
            src: "/images/trowe-price/03-Testing-UXR.png",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "05",
        sectionLabel: "Design System",
        heading:
          "Contributing to the company-wide enterprise design system",
        body: [
          "Because I served as both a UX design lead and a Senior Manager, I played an active role in contributing to the company-wide enterprise design system. My team met with several of the other design chapters across the innovation lab on a weekly basis, coordinating to ensure that every innovation could benefit the whole group.",
        ],
      },
    ],
    outcome: {
      heading: "Measurable business impact",
      body: [
        "The 401(k) self-service platform and financial wellness support features were launched to retail investors, resulting in a 40% reduction in support calls, 30% increase in educational engagement, and 20% reduction in withdrawal amounts. The project demonstrated that empathetic, well-researched design can directly improve both business metrics and human outcomes.",
      ],
      contributions: [
        "UX Design Lead",
        "Design Sprint Facilitation",
        "User Research",
        "Design System",
        "Product Strategy",
      ],
      collaborators: [
        "Product Managers",
        "Engineers",
        "Customer Support",
        "Subject Matter Experts",
      ],
      tools: ["Sketch", "InVision", "Miro", "Jira"],
    },
    nextProject: {
      slug: "collab-match",
      title: "CollabMatch",
      subtitle: "Doctor–Pharmacist Collaboration Platform",
    },
  },
  {
    slug: "collab-match",
    title: "CollabMatch",
    subtitle: "Doctor–Pharmacist Collaboration Platform",
    description:
      "A platform that matches doctors and pharmacists to facilitate collaboration, improving patient outcomes through better coordination between prescribers and dispensers.",
    tags: ["Healthcare", "Platform", "Matching", "Collaboration"],
    color: "#0ea5e9",
    thumbnail: "/images/collabmatch/Collab Match Cover.png",
    heroImage: "/images/collabmatch/collab-match-illustrative.png",
    meta: [
      { label: "Client", value: "CollabMatch (Startup)" },
      { label: "Role", value: "Product Designer" },
      { label: "Duration", value: "TBD" },
      { label: "Platform", value: "Web + Mobile" },
    ],
    sections: [
      {
        type: "text",
        sectionNumber: "01",
        sectionLabel: "Overview",
        heading: "Connecting doctors and pharmacists for better patient care",
        body: [
          "CollabMatch is a platform designed to bridge the gap between doctors and pharmacists, enabling them to find and collaborate with each other more effectively. The goal was to improve patient outcomes by making it easier for prescribers and dispensers to coordinate on treatment plans.",
          "Worked directly with the founder to understand the problem space — the lack of structured communication channels between doctors and pharmacists leads to medication errors, missed interactions, and suboptimal patient care. The platform needed to make matching intuitive and collaboration frictionless.",
        ],
      },
      {
        type: "text",
        sectionNumber: "02",
        sectionLabel: "Profile & Discovery",
        heading: "Making the right match",
        body: [
          "The core of the platform is a provider profile system — practitioners create detailed profiles with their collaboration preferences, specialties, location, and credentials. A review and rating system helps build trust between potential collaborators. The search and discovery experience lets providers filter by field of practice, location, and availability to find the right match.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            src: "/images/collabmatch/View Profile-desktop.png",
            label: "Provider profile with reviews and active connections",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Messaging",
        heading: "From discovery to collaboration",
        body: [
          "Once matched, providers communicate through a built-in messaging system. The mobile-first messaging experience supports the real-world workflow — physicians and pharmacists coordinating on the go between appointments and consultations. Connection slots and a freemium upgrade path drive the business model.",
        ],
      },
      {
        type: "images",
        layout: "phone-gallery",
        images: [
          {
            src: "/images/collabmatch/Messages-mobile-2.png",
            label: "Search Physicians",
          },
          {
            src: "/images/collabmatch/Profile-mobile.png",
            label: "Provider profile",
          },
          {
            src: "/images/collabmatch/Messages-mobile.png",
            label: "Messages inbox",
          },
          {
            src: "/images/collabmatch/Chat-mobile.png",
            label: "Chat thread",
          },
        ],
      },
    ],
    outcome: {
      heading: "Enabling healthcare collaboration",
      body: [
        "Designed the end-to-end experience from profile creation to active collaboration, working directly with the founder to validate the matching model and messaging flows with practicing healthcare professionals.",
      ],
      contributions: [
        "Product Design",
        "UX Research",
        "Interaction Design",
        "Prototyping",
      ],
      collaborators: ["Founder"],
      tools: ["Figma"],
    },
    nextProject: {
      slug: "wild-brains",
      title: "Wild Brains",
      subtitle: "Brain Wearable & Optimization App",
    },
  },
  {
    slug: "wild-brains",
    title: "Wild Brains",
    subtitle: "Brain Wearable & Optimization App",
    description:
      "A consumer brain wearable companion app that uses EEG biofeedback and behavioral tracking to help users optimize focus, creativity, and mental performance through personalized training programs.",
    tags: ["Consumer Health", "Wearable", "Mobile", "Biofeedback"],
    color: "#a855f7",
    thumbnail: "/images/wb/new exports/Feed Option 1.png",
    heroImage: "/images/wb/new exports/Introduction.png",
    meta: [
      { label: "Client", value: "Wild Brains" },
      { label: "Role", value: "Product Designer" },
      { label: "Stage", value: "Seed Round" },
      { label: "Platform", value: "iOS" },
    ],
    sections: [
      {
        type: "text",
        sectionNumber: "01",
        sectionLabel: "Overview",
        heading:
          "A wearable that reads your brain \u2014 and an app that trains it",
        body: [
          "Wild Brains is a direct-to-consumer brain optimization platform built around a lightweight EEG headband. The device measures neural activity in real time while the companion app translates that data into personalized training programs \u2014 creative exercises, focus sessions, and behavioral tracks designed to improve how users think, feel, and perform.",
          "I joined as the sole product designer during the company\u2019s seed round, working directly with the founder and a small engineering team. The challenge was twofold: make neuroscience accessible to a mainstream consumer audience, and create an experience compelling enough to drive daily engagement with a novel device category.",
        ],
      },
      {
        type: "quote",
        quote:
          "The hardest part wasn\u2019t visualizing brain data \u2014 it was making people feel something when they saw it.",
      },
      {
        type: "stats",
        stats: [
          { number: 33, suffix: "+", label: "Screens designed end-to-end" },
          {
            number: 4,
            suffix: "",
            label: "Brain metric dimensions tracked",
          },
          { number: 12, suffix: "+", label: "Personalization questions" },
          { number: 1, suffix: "", label: "Seed round secured" },
        ],
      },
      {
        type: "text",
        sectionNumber: "02",
        sectionLabel: "Personalization",
        heading: "An adaptive assessment that builds your brain profile",
        body: [
          "Before the headband even turns on, the app builds a behavioral and psychological profile through a carefully sequenced onboarding assessment. Questions move from binary choices to multi-select grids to analog sliders \u2014 each interaction type calibrated to the kind of data we need.",
          "The assessment covers chronotype, personality dimensions, self-perception, goals, and activity preferences. This data seeds the recommendation engine that generates personalized training programs.",
        ],
      },
      {
        type: "images",
        layout: "phone-gallery",
        images: [
          {
            src: "/images/wb/new exports/Initial assessment-4.png",
            label: "Chronotype selection",
          },
          {
            src: "/images/wb/new exports/Initial assessment-10.png",
            label: "Self-description with selections",
          },
          {
            src: "/images/wb/new exports/Initial assessment-9.png",
            label: "Goal selection",
          },
          {
            src: "/images/wb/new exports/Initial assessment-11.png",
            label: "Activity preferences",
          },
        ],
      },
      {
        type: "images",
        layout: "phone-gallery",
        images: [
          {
            src: "/images/wb/new exports/Guidance-1.png",
            label: "Plan generation",
          },
          {
            src: "/images/wb/new exports/Guidance-2.png",
            label: "Goal confirmation",
          },
          {
            src: "/images/wb/new exports/Guidance-3.png",
            label: "Brain data preview",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Daily Experience",
        heading: "A dashboard that makes brain data feel personal",
        body: [
          "The home screen anchors the daily experience. It surfaces the user\u2019s active training track, today\u2019s brain insight score, and a weekly progress summary \u2014 all without overwhelming a consumer audience with raw neuroscience data.",
          "We designed two states: the daily view with current session and brain insights, and the weekly retrospective showing confidence trends and cumulative focus time. Both encourage return visits and reinforce progress.",
        ],
      },
      {
        type: "images",
        layout: "phone-gallery",
        images: [
          {
            src: "/images/wb/new exports/Home.png",
            label: "Daily dashboard",
          },
          {
            src: "/images/wb/new exports/Home-1.png",
            label: "Weekly review",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "04",
        sectionLabel: "Training Programs",
        heading:
          "Structured brain workouts, delivered as 2-week programs",
        body: [
          "Training programs are the core engagement loop. Each program is a structured 2-week curriculum of daily activities \u2014 creative exercises, focus challenges, and mindfulness sessions \u2014 all calibrated to the user\u2019s brain profile and goals.",
          "The detail view breaks each day into specific activities with clear time commitments and difficulty indicators. This structure borrows from fitness app conventions to make brain training feel familiar and achievable.",
        ],
      },
      {
        type: "images",
        layout: "phone-gallery",
        images: [
          {
            src: "/images/wb/new exports/Workout Plan Detail.png",
            label: "Program overview",
          },
          {
            src: "/images/wb/new exports/Workout Plan Detail-1.png",
            label: "Daily activity detail",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "05",
        sectionLabel: "Live Activities",
        heading:
          "Real-time brain monitoring during creative exercises",
        body: [
          "The headband captures EEG data while users complete creative activities \u2014 drawing, writing, problem-solving. The app guides each session with clear instructions and a progress timer, while the device quietly records neural patterns in the background.",
          "After each activity, the app reveals what the brain was doing during the exercise \u2014 creating a feedback loop between conscious effort and measurable neural response.",
        ],
      },
      {
        type: "images",
        layout: "phone-gallery",
        images: [
          {
            src: "/images/wb/new exports/Video.png",
            label: "Drawing activity \u2014 instructions",
          },
          {
            src: "/images/wb/new exports/Video-1.png",
            label: "Drawing activity \u2014 in progress",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "06",
        sectionLabel: "Brain Visualization",
        heading:
          "Turning neural signals into something you can understand",
        body: [
          "This was the core design challenge: how do you make EEG data legible to someone who isn\u2019t a neuroscientist? We explored multiple visualization approaches \u2014 from radar charts mapping four cognitive dimensions, to 3D brain renderings with activity hotspots, to simple bar breakdowns.",
          "Each approach served a different context. The radar chart works for at-a-glance brain profiles, the 3D rendering creates an emotional connection to the data, and the bar charts support comparison across sessions and time periods.",
        ],
      },
      {
        type: "images",
        layout: "phone-gallery",
        images: [
          {
            src: "/images/wb/new exports/Aggregate data-1.png",
            label: "3D brain activity map",
          },
          {
            src: "/images/wb/new exports/Aggregate data-2.png",
            label: "Post-activity brain analysis",
          },
          {
            src: "/images/wb/new exports/Aggregate data.png",
            label: "Session benchmark score",
          },
        ],
      },
      {
        type: "images",
        layout: "phone-gallery",
        images: [
          {
            src: "/images/wb/new exports/Feed Option 1.png",
            label: "Radar chart visualization",
          },
          {
            src: "/images/wb/new exports/Feed Option 2.png",
            label: "Radar with brain insight panel",
          },
          {
            src: "/images/wb/new exports/Feed Option 3.png",
            label: "3D brain with metric breakdown",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "07",
        sectionLabel: "Progress",
        heading:
          "Tracking the long game across multiple cognitive dimensions",
        body: [
          "The progress view maps the user\u2019s journey across four brain dimensions \u2014 Focus, Creativity, Anxiety, and Sleep \u2014 showing how each evolves over time through sustained training. It transforms abstract cognitive improvement into a visible trajectory.",
        ],
      },
      {
        type: "images",
        layout: "phone-gallery",
        images: [
          {
            src: "/images/wb/new exports/User Progress.png",
            label: "Multi-dimension progress tracking",
          },
        ],
      },
    ],
    outcome: {
      heading: "From prototype to funded product",
      body: [
        "The design work I delivered became the foundation of Wild Brains\u2019 product vision during their seed round. The comprehensive screen designs, data visualization system, and personalization framework demonstrated a clear, compelling product experience that helped the company secure continued investment and the opportunity to scale.",
        "By borrowing engagement patterns from fitness and wellness apps, we made brain training feel approachable. By investing in data visualization, we made the science feel real. The combination gave investors confidence that this wasn\u2019t just a device \u2014 it was a daily habit.",
      ],
      contributions: [
        "Product Design",
        "UX Research",
        "Data Visualization",
        "Interaction Design",
      ],
      collaborators: ["Founder", "Engineering Team"],
      tools: ["Figma"],
    },
    nextProject: {
      slug: "vulcan",
      title: "Vulcan",
      subtitle: "DoD Innovation Platform",
    },
  },
  {
    slug: "vulcan",
    title: "Vulcan",
    subtitle: "DoD Innovation Platform",
    description:
      "An innovation management platform where government agencies issue calls for entries and commercial-sector innovators submit proposals and technical demos. Part of the deep tech pipeline modernizing how SOCOM conducts BAAs and acquires new capabilities.",
    tags: ["Defense", "GovTech", "Innovation", "Enterprise"],
    color: "#475569",
    thumbnail: "/images/vulcan/vulcan.png",
    heroImage: "/images/vulcan/vulcan.png",
    heroObjectPosition: "top",
    meta: [
      { label: "Client", value: "Cylitix / DoD (SOCOM)" },
      { label: "Role", value: "Product Designer" },
      { label: "Duration", value: "TBD" },
      { label: "Platform", value: "Web" },
    ],
    sections: [
      {
        type: "text",
        sectionNumber: "01",
        sectionLabel: "Overview",
        heading: "Modernizing how the Department of Defense discovers innovation",
        body: [
          "Vulcan is an innovation platform built for Cylitix with sponsorship from the Department of Defense. It modernizes the Broad Agency Announcement (BAA) process — how agencies like SOCOM issue calls for capabilities and how commercial-sector innovators respond with proposals and technical demonstrations.",
          "The platform sits at the center of the deep tech pipeline, connecting government needs with commercial innovation in a structured, searchable, and evaluable way.",
        ],
      },
      {
        type: "text",
        sectionNumber: "02",
        sectionLabel: "Call Authoring",
        heading: "Building structured calls for innovation",
        body: [
          "Government program managers create calls through a multi-step authoring flow. The form builder supports conditional logic, branching, and custom question types — from technical focus areas to cost estimates and milestone timelines. Skip logic lets authors create adaptive submission forms that route innovators through relevant sections based on their domain.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            src: "/images/vulcan/form-skip-logic.png",
            label: "Form builder with conditional skip logic",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Question Types",
        heading: "Flexible data collection for complex submissions",
        body: [
          "The platform supports a range of question types tailored to defense innovation evaluation — from ROM cost estimates and milestone timelines to technical capability assessments. Each question type is configurable with validation rules, optional fields, and rich text context.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            src: "/images/vulcan/8.png",
            label: "ROM Cost Estimate question type",
          },
          {
            src: "/images/vulcan/11.png",
            label: "Milestone timeline configuration",
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "04",
        sectionLabel: "Access Controls",
        heading: "Managing collaboration across agencies",
        body: [
          "Calls involve multiple stakeholders across different government organizations. The access control system lets program managers invite editors, set visibility permissions, and manage who can view and modify call details — supporting the complex organizational dynamics of defense procurement.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          {
            src: "/images/vulcan/Add an Editor and Set Visibility.png",
            label: "Editor management and visibility controls",
          },
        ],
      },
      {
        type: "quote",
        quote: "Note: project content is illustrative.",
      },
    ],
    outcome: {
      heading: "Enabling the deep tech pipeline",
      body: [
        "The platform supports SOCOM’s modernized approach to capability acquisition, streamlining the path from government need to commercial innovation through structured authoring, evaluation, and collaboration tools.",
      ],
      contributions: [
        "Product Design",
        "Search UX",
        "Information Architecture",
        "Design System",
      ],
      collaborators: ["Cylitix Team", "DoD Stakeholders"],
      tools: ["Figma"],
    },
    nextProject: {
      slug: "uscis",
      title: "USCIS",
      subtitle: "U.S. Citizenship & Immigration Services",
    },
  },
    {
    slug: "uscis",
    title: "USCIS",
    subtitle: "U.S. Citizenship & Immigration Services",
    description:
      "Led the redesign of the main identity system (CIS 2) used by USCIS adjudicators to verify applicant qualifications and check historical encounters — serving 5,000+ users processing ~35k applications per day.",
    tags: ["GovTech", "DHS", "Enterprise", "Identity & Access"],
    color: "#1e3a5f",
    heroImage: "/images/uscis/cis-1.webp",
    thumbnail: "/images/uscis/cis-7.webp",
    meta: [
      { label: "Client", value: "USCIS / DHS" },
      { label: "Role", value: "Craft Lead, Interaction Design" },
      { label: "Duration", value: "2 years" },
      { label: "Scope", value: "Field Research, Identity & Case-Management UX, RBAC/ABAC, Delivery" },
    ],
    sections: [
      {
        type: "text",
        sectionNumber: "01",
        sectionLabel: "Context",
        heading: "Redesigning the backbone of DHS identity services",
        body: [
          "CIS 2 is the main identity system used by USCIS adjudicators to verify applicant qualifications and check historical encounters. Originally designed in the 1970s, it had become the backbone for DHS identity services that downstream platforms like Palantir ontology rely on — but it was showing its age.",
          "How might we drive person-centric identity and case-management UX — A-number search, cross-record timelines, audit/lineage, RBAC/ABAC, and error-handling — at a scale of 5,000+ users processing ~35k applications per day?",
        ],
      },
      {
        type: "text",
        sectionNumber: "02",
        sectionLabel: "My Role",
        heading: "Leading design across four work streams",
        body: [
          "Craft Lead for interaction design, managing a team of 6 designers across 4 work streams. I was hands-on with design while also leading teams as the face of the work to external stakeholders across USCIS, ICE, and CBP.",
        ],
      },
      {
        type: "stats",
        stats: [
          { number: 5, suffix: "k+", label: "Users" },
          { number: 35, suffix: "k", label: "Apps / day" },
          { number: 100, suffix: "+", label: "User interviews" },
          { number: 16, suffix: "", label: "Design sprint weeks" },
        ],
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Field Research",
        heading: "Starting with the people doing the work",
        body: [
          "We conducted contextual research at ports of entry along the U.S.–Mexico border and at service centers across the country — shadowing adjudicators, observing intake processes, and conducting over 100 user interviews to understand how the system was actually being used.",
        ],
      },
      {
        type: "images",
        layout: "photo-grid",
        images: [
          { src: "/images/uscis/cis-2.webp", label: "Field research at the border", height: 640 },
        ],
      },
      {
        type: "text",
        sectionNumber: "04",
        sectionLabel: "Observations",
        heading: "A paper-heavy reality",
        body: [
          "What we found was a heavily paper-based system. Case files were physically bundled, routed, and tracked by hand. Adjudicators toggled between dozens of fragmented digital systems — none of which they fully trusted — to verify a single applicant’s identity.",
        ],
      },
      {
        type: "images",
        layout: "photo-grid",
        images: [
          { src: "/images/uscis/cis-3.webp", label: "Paper-based case files observed during field research", height: 640 },
        ],
      },
      {
        type: "text",
        sectionNumber: "05",
        sectionLabel: "Site Visits",
        heading: "Understanding how systems overlapped",
        body: [
          "We focused on two things: people’s working relationships and the data they need. We visited sites across the country — California, Texas, Florida, Missouri, Vermont, Virginia, and more.",
          "At the end, we understood how systems overlapped. Some were being used for just one data point, presenting a clear opportunity to simplify.",
        ],
      },
      {
        type: "images",
        layout: "photo-grid",
        images: [
          { src: "/images/uscis/cis-4.webp", label: "Site visit locations across the United States", height: 640 },
        ],
      },
      {
        type: "text",
        sectionNumber: "06",
        sectionLabel: "Systems Analysis",
        heading: "Mapping 25+ platforms across four agencies",
        body: [
          "We mapped every system touching the adjudication process — 25+ platforms spanning USCIS, ICE, CBP, and external agencies. The system usage matrix revealed massive overlap: some systems existed solely for a single data point.",
          "We also mapped the human side — the web of relationships around each adjudicator — to understand how information actually flowed between roles.",
        ],
      },
      {
        type: "images",
        layout: "photo-grid",
        images: [
          { src: "/images/uscis/cis-5.webp", label: "System usage matrix by agency", height: 640 },
        ],
      },
      {
        type: "images",
        layout: "photo-grid",
        images: [
          { src: "/images/uscis/cis-6.webp", label: "Stakeholder relationship map", height: 640 },
        ],
      },
      {
        type: "text",
        sectionNumber: "07",
        sectionLabel: "Design Sprints",
        heading: "16 sprint weeks of discovery and testing",
        body: [
          "We ran 16 design sprint weeks, each focused on a theme surfaced during research, to discover and validate product features. We tested with users at least twice per week, iterating rapidly between rounds.",
        ],
      },
      {
        type: "text",
        sectionNumber: "08",
        sectionLabel: "Solution",
        heading: "One cohesive interface — like a Google search",
        body: [
          "The core idea — “make it feel like a Google search” — survived every iteration. CIS 2 became a person-centric interface: a single A-number search surfaces cross-record timelines, biographic data, encounter history, and potential identity matches — all in one view.",
          "Granular RBAC/ABAC controls ensure each role sees exactly what they need, with full audit lineage. The system now serves 5,000+ users processing approximately 35,000 applications per day.",
        ],
      },
      {
        type: "images",
        layout: "desktop-showcase",
        images: [
          { src: "/images/uscis/cis-7.webp", label: "CIS 2 — Identity resolution interface" },
        ],
      },
    ],
    outcome: {
      heading: "The backbone of DHS identity services",
      body: [
        "By consolidating disparate systems into a unified, person-centric platform, adjudicators gained a single source of truth for applicant identity — with cross-record timelines, granular RBAC/ABAC controls, and full audit lineage. CIS 2 now serves as the foundation that downstream platforms like Palantir ontology depend on.",
      ],
      contributions: [
        "Design Leadership",
        "Field Research",
        "Co-creation Workshops",
        "Identity & Case-Management UX",
        "RBAC / ABAC Design",
        "Interaction Design",
        "Iterative Prototyping",
        "Delivery",
      ],
      collaborators: [
        "1 Design Lead",
        "4 IxD",
        "1 VizD",
        "1 Business Designer",
      ],
      tools: ["Figma", "Prototyping"],
    },
    nextProject: {
      slug: "clarvos",
      title: "Clarvos",
      subtitle: "Agentic AI Ad Platform",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
