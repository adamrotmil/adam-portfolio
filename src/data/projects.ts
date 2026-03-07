export interface ProjectSection {
  type: "text" | "quote" | "stats" | "images" | "image-text";
  heading?: string;
  sectionNumber?: string;
  sectionLabel?: string;
  body?: string[];
  quote?: string;
  stats?: { number: number; suffix: string; label: string }[];
  images?: { label: string; dark?: boolean; height?: number }[];
  imagePosition?: "left" | "right";
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  featured?: boolean;
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
    meta: [
      { label: "Client", value: "Clarvos (Cylitix)" },
      { label: "Role", value: "Lead Product Designer" },
      { label: "Duration", value: "2024 – Present" },
      { label: "Platform", value: "Web SaaS" },
    ],
    sections: [
      {
        type: "text",
        sectionNumber: "01",
        sectionLabel: "Overview",
        heading:
          "The advertising industry runs on manual workflows. What if an AI could handle the entire pipeline?",
        body: [
          "Clarvos is an agentic AI platform that autonomously manages advertising campaigns end-to-end. It discovers trending topics, generates on-brand creative assets (images and video), launches campaigns across social media platforms, monitors performance in real-time, and optimizes spend — all with minimal human intervention.",
          "My role as Lead Product Designer was to make an extraordinarily complex system feel approachable. The challenge wasn't just designing screens — it was designing trust. Users needed to understand what the AI was doing, why, and feel confident handing over creative and financial decisions to an autonomous agent.",
        ],
      },
      {
        type: "quote",
        quote:
          "The hardest design problem in agentic AI isn't the interface — it's designing the right level of human oversight without killing the autonomy.",
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
          "The platform generates on-brand ad creatives — images and video — by understanding a brand's visual identity, tone, and audience. Rather than outputting generic AI slop, the system produces polished, production-quality assets that feel intentionally designed.",
          "I designed the creative gallery as a command center where marketers can review, compare, and curate AI-generated variants. Every asset surfaces metadata, AI-powered quality scores, and performance predictions before a single dollar is spent.",
        ],
      },
      {
        type: "images",
        images: [
          {
            label: "Creative Gallery — AI-Generated Brand Assets",
            dark: true,
            height: 520,
          },
          { label: "Asset Detail — Metadata & AI Insights", height: 360 },
          { label: "Trend Discovery — Topic Analysis", height: 360 },
        ],
      },
      {
        type: "image-text",
        sectionNumber: "03",
        sectionLabel: "Campaign Builder",
        heading: "From blank slate to live campaign in minutes",
        body: [
          "The campaign builder guides users through a structured wizard: define objectives, select audiences, set budgets, choose creatives, and schedule launches. Each step surfaces intelligent defaults from the AI while keeping the human in control of every decision.",
          "I designed the flow to feel progressive rather than overwhelming — each step reveals only what's needed, with the AI pre-filling recommendations that users can accept, modify, or override. The system gets smarter with every campaign, learning from performance data to improve its suggestions.",
        ],
        imagePosition: "left",
        images: [
          { label: "Campaign Wizard — Step-by-Step Flow", height: 480 },
        ],
      },
      {
        type: "text",
        sectionNumber: "04",
        sectionLabel: "Video Editor",
        heading: "Prompt-driven video editing for non-editors",
        body: [
          "One of the most technically ambitious features: a scene-based video editor that lets marketers describe what they want in natural language. The AI generates video scenes from text prompts, complete with start frames, end frames, and transitions.",
          "I designed the editor around a timeline metaphor familiar to anyone who's used iMovie or Premiere, but replaced the complexity with AI-powered controls. Users compose scenes by describing them, preview variations, and assemble final videos with drag-and-drop — no editing skills required.",
        ],
      },
      {
        type: "images",
        images: [
          {
            label: "Video Editor — Scene Timeline with Prompt Controls",
            dark: true,
            height: 540,
          },
          { label: "Scene Prompts", height: 280 },
          { label: "Start & End Frames", height: 280 },
          { label: "Audio & Vocal Tracks", height: 280 },
        ],
      },
      {
        type: "text",
        sectionNumber: "05",
        sectionLabel: "Design Decisions",
        heading: "Three principles that shaped everything",
        body: [
          "Progressive Autonomy: Rather than presenting the AI as a black box, I designed a transparency model where users can see exactly what the agent is doing at each step. Users start with full manual control and gradually allow more autonomy as they gain confidence.",
          "Familiar Metaphors for Unfamiliar Technology: The video editor uses a timeline. The creative gallery uses a card grid. The campaign builder uses a wizard. Every complex AI interaction is wrapped in a pattern users already understand.",
          "Designed for Iteration, Not Perfection: AI outputs aren't always right on the first try. I designed every creative surface with inline editing, quick regeneration, and A/B variant comparison built in.",
        ],
      },
      {
        type: "text",
        sectionNumber: "06",
        sectionLabel: "System & Craft",
        heading: "A design system built for AI-native interfaces",
        body: [
          "AI products need components that traditional design systems don't have: loading states for generative processes, confidence indicators, comparison views, prompt inputs, and progressive disclosure for complex agent outputs. I built a Figma component library that addresses these patterns alongside the standard UI toolkit.",
        ],
      },
      {
        type: "images",
        images: [
          {
            label:
              "Design System — Components, Patterns, AI-Specific Elements",
            height: 420,
          },
          { label: "Component Library — Figma", height: 300 },
          { label: "Interaction Patterns — Agent States", height: 300 },
        ],
      },
    ],
    outcome: {
      heading: "From concept to production",
      body: [
        "Clarvos is actively in production and evolving. The platform manages real ad spend across multiple social platforms, generating and optimizing campaigns autonomously. The design work established the interaction patterns and trust framework that make it possible for marketers to confidently delegate complex decisions to an AI agent.",
        "This project reinforced a conviction I carry into every engagement: the best AI products don't replace human judgment — they amplify it. Design is the bridge that makes that amplification feel natural.",
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
      "A mobile-native diagnostic tool for HVAC technicians. QR scanning identifies equipment, then an LLM guides step-by-step repairs with product-aware responses.",
    tags: ["Mobile", "Conversational AI", "QR/Vision", "Field Service"],
    color: "#2d5a3d",
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
        body: [
          "I designed the complete mobile experience — from onboarding through diagnosis to guided repair flows. The design challenge was creating an interface that feels as simple as texting a knowledgeable friend, while handling the complexity of thousands of equipment models and diagnostic pathways underneath.",
        ],
      },
      {
        type: "text",
        sectionNumber: "02",
        sectionLabel: "Onboarding",
        heading: "Get technicians in, not through a tutorial",
        body: [
          "Technicians are busy. They download Gator because they need help right now, not because they want to learn a new app. The onboarding is ruthlessly minimal: phone number verification, one permission prompt for the camera (needed for scanning), and they're in.",
          "No account creation form. No feature tour. No onboarding carousel. The first thing they see after signing in is Gator introducing itself and asking what they need help with. The product teaches itself through use.",
        ],
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Equipment Recognition",
        heading: "The camera is the search bar",
        body: [
          "Every HVAC unit has a barcode or serial number plate. Gator's scanner reads it instantly, pulling the exact make, model, and specs from its product database. No scrolling through menus, no typing model numbers on a tiny keyboard with cold fingers.",
          "For units where the label is damaged or missing, there's a manual fallback: type the serial number or describe the unit. The AI can often identify equipment from a description of its appearance and the symptoms alone.",
        ],
      },
      {
        type: "images",
        images: [
          {
            label: "QR Scanner — Camera View with Overlay",
            dark: true,
            height: 440,
          },
          {
            label: "Product Identified — Model Card with Specs",
            height: 440,
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "04",
        sectionLabel: "The Conversation",
        heading:
          "Designing a chat that feels like talking to a senior tech",
        body: [
          "The diagnostic conversation is Gator's core experience. The AI doesn't just answer questions — it asks the right ones. Each question narrows down the problem, just like an experienced technician would think through it.",
          "I designed the chat to feel warm and confident without being patronizing. Gator has a personality — it's knowledgeable but approachable, like a coworker who's been doing this for 20 years and genuinely wants to help. The tone was as important as the UI.",
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
        type: "quote",
        quote:
          "Diagnosis needs the freedom of conversation. Repair needs the structure of a checklist. The trick is knowing when to shift between them.",
      },
      {
        type: "text",
        sectionNumber: "06",
        sectionLabel: "Design Language",
        heading: "Green means go",
        body: [
          "Gator's visual language is built on a deep forest green and warm off-whites — colors that feel professional and trustworthy without the cold clinical feel of most enterprise tools. The gator mascot adds personality and approachability to what could otherwise feel like a sterile diagnostic tool.",
        ],
      },
    ],
    outcome: {
      heading: "Ready for development",
      body: [
        "The Gator prototype is fully designed in Figma with a wired click-through demo that covers the complete user journey from sign-in to completed repair. The design is ready for iOS development, with detailed specs, component documentation, and interaction annotations.",
        "Designing Gator reinforced something I believe deeply: the most sophisticated AI is useless if the interface doesn't meet people where they are. A technician doesn't care about the model architecture — they care about fixing the AC before the customer gets home.",
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
      title: "McLeod Respond AI",
      subtitle: "LLM for Logistics",
    },
  },
  {
    slug: "respond-ai",
    title: "McLeod Respond AI",
    subtitle: "LLM for Logistics",
    description:
      "Integrating an LLM into a dispatch platform to pre-draft carrier responses. Human-in-the-loop design keeps operators in control while cutting response time dramatically.",
    tags: ["AI / LLM", "Enterprise", "Human-in-the-Loop"],
    color: "#7c3aed",
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
          "Human-in-the-loop isn't a compromise — it's a feature. Operators stay in control while the AI handles the heavy lifting.",
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Prototyping",
        heading: "A central dashboard that helps operators get oriented for the day's work",
        body: [
          "Initial product and market research helped shape the MVP vision, where users have a central dashboard that helps them get oriented for the day's work. From this view, they can focus on high-priority actions and track progress. The goal was to make it feel manageable, so that operators actually experience less stress while their performance improves.",
          "Users were spending a lot of time managing email requests. So the design included a view for emails that would work with their existing client under the hood, while using the onboard LLM to pre-draft responses.",
        ],
      },
      {
        type: "images",
        images: [
          {
            label: "Respond AI — Dashboard & Messaging Interface",
            dark: true,
            height: 480,
          },
          { label: "Email View — LLM Pre-drafted Responses", height: 360 },
          {
            label: "Driver Follow-up — Contextual AI Suggestions",
            height: 360,
          },
        ],
      },
      {
        type: "text",
        sectionNumber: "04",
        sectionLabel: "Templates",
        heading: "Templates that guide AI responses and ensure quality",
        body: [
          "In order to guide the responses and ensure quality, I designed a way for users to create templates using variables. These templates inform the mega-prompts and multi-shot prompting that ensures consistent, high-quality responses.",
        ],
      },
      {
        type: "text",
        sectionNumber: "05",
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
        "The project demonstrated that AI in logistics doesn't need to replace human operators — it needs to give them superpowers.",
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
          "The system uses an LLM to extract and normalize keywords from a one-minute voice recording. PPG technology is also used to gather health metrics by reading the bloodflow through the patient's skin while they speak.",
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
        images: [
          {
            label: "Patient Check-in — Voice Symptom Tracking",
            dark: true,
            height: 480,
          },
          { label: "Doctor Dashboard — Patient Monitoring", height: 360 },
          { label: "Guided Check-in Flow", height: 360 },
        ],
      },
      {
        type: "text",
        sectionNumber: "04",
        sectionLabel: "Prototyping",
        heading: "Iterative design sprints with real patients and clinicians",
        body: [
          "Based on research insights, I led ideation through sketching and collaborative workshops with stakeholders. Wireframes and interactive prototypes were developed with key features including simple symptom logging using visual scales, customizable tracking based on each patient's treatment plan, real-time alerts for doctors, and data visualization of symptom trends.",
          "Visual design aimed to create a calming, supportive experience for patients while ensuring clarity and professionalism for doctors. Soft, nature-inspired color palette and intuitive icons enhanced usability.",
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
      "Designing research tools at the intersection of clinical practice and patient engagement for one of the country's leading academic medical centers.",
    tags: ["Health Tech", "Research", "Mobile"],
    color: "#f97316",
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
          "They needed a user-friendly system that would allow patients to easily track their symptoms and enable doctors to remotely monitor patient health and make data-driven decisions. The platform had to be designed to prove not only correlations, but causal impact.",
          "Study participants are randomly assigned to either the intervention group or the control group. The app is used to track the intervention group's adherence to a prescribed diet and exercise protocol.",
        ],
      },
      {
        type: "text",
        sectionNumber: "02",
        sectionLabel: "User Research",
        heading:
          "Interviews with 8 cancer patients and 5 oncologists revealed critical insights.",
        body: [
          "Patients often struggled to remember and accurately report symptoms during clinic visits. Doctors needed real-time access to patient symptom data to make timely interventions. Both wanted a simple, intuitive system that would not add to their existing burdens.",
          "Primary value was identified in three areas: a mobile app for patients to log symptoms daily, a dashboard for doctors to view patient symptom trends and receive alerts, and integration with wearable devices to automatically track relevant health metrics.",
        ],
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Prototyping",
        heading: "From wireframes to interactive prototypes",
        body: [
          "Key features included simple symptom logging using visual scales and pre-defined options, customizable symptom tracking based on each patient's condition and treatment plan, real-time alerts for doctors when patient symptoms exceeded predefined thresholds, and data visualization of symptom trends and correlations with treatments.",
          "Visual design aimed to create a calming, supportive experience for patients while ensuring clarity and professionalism for doctors.",
        ],
      },
      {
        type: "images",
        images: [
          {
            label: "MyWellness — Patient Mobile App",
            dark: true,
            height: 480,
          },
          { label: "Doctor Dashboard — Symptom Trends", height: 360 },
          { label: "Real-time Coaching Interface", height: 360 },
        ],
      },
      {
        type: "text",
        sectionNumber: "04",
        sectionLabel: "Real-Time Collaboration",
        heading: "Patient coaching with unprecedented precision",
        body: [
          "The platform supports patient coaching with a level of precision that has not been possible before. New studies have been launched in partnership with Yale University and the University of Miami.",
          "Doctors and research scientists have real-time transparency into new data, giving them the ability to learn and iterate far faster than ever before.",
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
        sectionNumber: "05",
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
          "Users needed the ability to create a custom palette of containers and virtual machines, define network topology maps using subnet masks, routers, and connections, use a properties panel to inspect details like CPU cores and memory management, and crucially, create conflicted scenarios that would fail normal validation checks — since fixing those issues is part of the skillset being taught.",
        ],
      },
      {
        type: "images",
        images: [
          {
            label: "Content Studio — Network Topology Canvas",
            dark: true,
            height: 520,
          },
          { label: "Container Palette — VM Configuration", height: 360 },
          { label: "Properties Panel — System Resources", height: 360 },
        ],
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Design System",
        heading: "Sprint Zero design system for agile delivery",
        body: [
          "In order to work efficiently and collaborate effectively with developers, I created a streamlined design system that reflected the existing aspects of the client's enterprise framework. The design system made effective use of abstraction, nested components, variables, and slots.",
          "All team members found the design system to be a key enabler that ensured their success, both in terms of UX consistency as well as being able to work in an agile manner to distribute work in a modular way and hit deadlines.",
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
          "T. Rowe Price's 401(k) service for retail investors relied heavily on support calls for account management, including distributions. Investors often felt guilty or discouraged when making withdrawals, and the process lacked financial wellness support.",
          "The goal was to create a self-service platform that empowered investors to manage their 401(k) accounts while providing guidance and support to minimize the negative impact of withdrawals.",
          "I led a comprehensive two-day product design workshop, based on a modified form of the Google Ventures design sprint. We co-created with a diverse range of customers, designers, engineers, stakeholders, SMEs, and product managers.",
        ],
      },
      {
        type: "text",
        sectionNumber: "02",
        sectionLabel: "User Research",
        heading:
          "Investors found the distribution process confusing and emotionally taxing.",
        body: [
          "Interviews were conducted with retail investors and support agents. Investors desired more control and transparency. Agents reported that investors often expressed guilt or discouragement when making withdrawals.",
          "There was a lack of guidance and support to help investors make informed decisions and stay on track after a withdrawal.",
        ],
      },
      {
        type: "text",
        sectionNumber: "03",
        sectionLabel: "Prototyping",
        heading: "Educational content and tools to understand the impact of withdrawals",
        body: [
          "Key concepts included a self-service platform for managing 401(k) accounts including distributions, educational content and tools to help investors understand the impact of withdrawals and explore alternatives, personalized financial wellness support and goal-setting features, and emotionally supportive language and design elements.",
          "Research and iterative testing with retail investors using interactive prototypes confirmed the self-service platform was intuitive and empowering.",
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
        type: "images",
        images: [
          {
            label: "401(k) Dashboard — Account Overview",
            dark: true,
            height: 480,
          },
          { label: "Distribution Flow — Step by Step", height: 360 },
          { label: "Financial Wellness — Goal Tracking", height: 360 },
        ],
      },
      {
        type: "text",
        sectionNumber: "04",
        sectionLabel: "Iterative Testing",
        heading: "Discovering and fixing discoverability issues in real time",
        body: [
          "Regular tests were run to confirm or falsify hypotheses under consideration. In one instance, the team realized that users may not even have known where to look for the starting point of the flow.",
          "Based on that learning, they quickly pivoted to address discoverability issues, restructured some of the IA on the sitewide nav, and changed terminology to be less jargon-laden — such as changing 'take a distribution' to 'take a withdrawal.'",
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
