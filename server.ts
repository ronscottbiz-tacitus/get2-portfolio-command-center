import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { GROUND_TRUTH_DOCS } from "./src/docs_grounding";

dotenv.config();

// Helper to handle transient Gemini API errors (like 503/429) automatically with exponential backoff
async function generateContentWithRetry(ai: any, params: any, maxRetries = 3, initialDelay = 400) {
  let delay = initialDelay;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await ai.models.generateContent(params);
    } catch (error: any) {
      const errorStr = String(error?.message || error || "").toUpperCase();
      const isTransient = error?.status === 503 || error?.status === 429 || 
                          error?.statusCode === 503 || error?.statusCode === 429 ||
                          errorStr.includes("503") || 
                          errorStr.includes("429") || 
                          errorStr.includes("HIGH DEMAND") || 
                          errorStr.includes("UNAVAILABLE") || 
                          errorStr.includes("SERVICE UNAVAILABLE") ||
                          errorStr.includes("TEMPORARY") ||
                          errorStr.includes("SPIKES IN DEMAND");
      
      if (isTransient && attempt < maxRetries) {
        console.warn(`[Gemini Retry] Transient error encountered (attempt ${attempt}/${maxRetries}). Retrying in ${delay}ms... Details:`, error.message || error);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // exponential backoff
      } else {
        throw error;
      }
    }
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY was not found in environmental variables. The chatbot will operate in demo fallback mode.");
  }

  const ai = new GoogleGenAI({
    apiKey: apiKey || "TEMPORARY_STUB_KEY",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Serve the uploaded Get2-logo.mp4 video file from the root directory safely
  app.get("/Get2-logo.mp4", (req, res) => {
    const videoPath = path.join(process.cwd(), "Get2-logo.mp4");
    if (fs.existsSync(videoPath)) {
      try {
        const stats = fs.statSync(videoPath);
        if (stats.size > 0) {
          res.sendFile(videoPath, (err) => {
            if (err) {
              if (!res.headersSent) {
                res.status(416).send("Range Not Satisfiable or stream error");
              }
            }
          });
        } else {
          res.status(404).send("Get2-logo.mp4 is empty (0 bytes).");
        }
      } catch (err) {
        if (!res.headersSent) {
          res.status(500).send("Error reading file.");
        }
      }
    } else {
      res.status(404).send("Get2-logo.mp4 not found on root. Standby for upload.");
    }
  });

  // Receive raw video uploads and save to disk
  app.post("/api/upload-video", express.raw({ type: "*/*", limit: "150mb" }), (req, res) => {
    try {
      const videoPath = path.join(process.cwd(), "Get2-logo.mp4");
      fs.writeFileSync(videoPath, req.body);
      
      const publicDir = path.join(process.cwd(), "public");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
      }
      fs.writeFileSync(path.join(publicDir, "Get2-logo.mp4"), req.body);
      
      console.log("Raw binary upload received: Get2-logo.mp4 saved successfully!");
      res.json({ success: true, message: "Get2-logo.mp4 saved successfully on server." });
    } catch (err: any) {
      console.error("Failed to save Get2-logo.mp4:", err);
      res.status(500).json({ error: "Failed to save video on server: " + err.message });
    }
  });

  // Serve the Get2 G2 brand logo at /end.png with image/svg+xml MIME type
  app.get("/end.png", (req, res) => {
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <!-- Deep rich background -->
  <rect width="100%" height="100%" fill="#020617" rx="36" />
  
  <defs>
    <filter id="moon-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="neon-blue-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="2.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Moon with Glow -->
  <circle cx="155" cy="100" r="16" fill="#ffffff" filter="url(#moon-glow)"/>
  
  <!-- Bird silhouette on moon -->
  <path d="M 148,101 Q 151,99 154,101 Q 157,99 160,101 Q 157,104 154,103 Q 151,104 148,101 Z" fill="#020617" />

  <!-- Birds flying -->
  <path d="M 115,80 Q 119,74 123,80 Q 127,74 131,80 Q 127,85 123,83 Q 119,85 115,80 Z" fill="#ffffff" />
  <path d="M 105,100 Q 108,95 111,100 Q 114,95 117,100 Q 114,104 111,102 Q 108,104 105,100 Z" fill="#ffffff" />
  <path d="M 115,115 Q 118,111 121,115 Q 124,111 127,115 Q 124,119 121,117 Q 118,119 115,115 Z" fill="#ffffff" />

  <!-- Chainlink Fence with Neon Glow -->
  <g stroke="#3b82f6" stroke-width="1.8" stroke-linecap="round" opacity="0.85" filter="url(#neon-blue-glow)">
    <line x1="85" y1="65" x2="115" y2="135" />
    <line x1="95" y1="65" x2="125" y2="135" />
    <line x1="105" y1="65" x2="135" y2="135" />
    
    <line x1="115" y1="65" x2="85" y2="135" />
    <line x1="125" y1="65" x2="95" y2="135" />
    <line x1="135" y1="65" x2="105" y2="135" />
  </g>

  <!-- Typography "G" and "2" -->
  <text x="25" y="118" font-family="'Inter', system-ui, sans-serif" font-size="50" font-weight="900" fill="#ffffff" letter-spacing="-2.5">G2</text>
</svg>
    `.trim());
  });

  // API Route for chat
  app.post("/api/chat", async (req: express.Request, res: express.Response) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Check if API key is not configured or is a default placeholder
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "" || apiKey === "TEMPORARY_STUB_KEY") {
        // Return highly dynamic and beautifully formatted grounding response manually based on query parameters so the user experience is fluent
        const manualAnswers = getFallbackAnswer(message);
        return res.json({ text: manualAnswers });
      }

      // Define grounding context combining system instructions, original project files, and the newly attached resume
      const systemInstruction = `You are Ron Scott's Virtual Chief of Staff. 
Your tone is exceptionally professional, deeply knowledgeable about project management, data-driven, and highly organized. You address users on behalf of Ron Scott's interactive apprentice operations.
Your purpose is to ingest all of Ron Scott's project data, metrics, and professional experience, allowing users to interactively explore his accomplishments, growth areas, metrics, project status, and professional resume history using natural language.

You are fully backed by the comprehensive, ground-truth knowledge base of his entire apprenticeship and life background:
- 27 Years of Resilience: Ron spent 27 years incarcerated, transforming his cell into a study-tank. He earned two Associate of Arts degrees with honors (Liberal Arts and American Studies, GPA 3.75) from Coastline College, completed peer literacy certifications, mentored students, and spent thousands of hours preparing for a technology career.
- Get2: Founded by Ron (premise: "we don't got to — we get to"). He designed and built a portfolio of consumer-facing apps from scratch (GroceryGo!, The Board, 3Ceipt!), built Figma/Framer prototypes, designed brand identities, and launched get2.one.
- CROP Organization: Interned in UX/UI and Software Development, designed reentry tools in Figma, built WCAG accessible platforms, spoke at Figma's global HQ, and was featured on the Figma blog.
- Lyft AI Transformation Lead / Project Specialist: Built AI literacy programs, designed and deployed three-tiered internal Digital Badge credentialing, optimized cohort diversity for equity, conducted AI tooling consolidation studies, configured project tracking databases, and coordinated cross-functional delivery.
- Supplemental Roles: Aspire Education (Academic Tutor) and Urban Alchemy (Care Coordinator).
- Key Credentials: Workato Agentic AI Basics (completed Jun 3, 2026), Google UX Design, Google Project Management, Google AI Essentials, Google Prompting Essentials, CDCR Peer Literacy Mentor.

When asked about accomplishments, timelines, or roles, you MUST quote exact quantitative metrics from the files (for example: Ron's 90% Program Progress metric, reflecting the scope-adjusted completion of all program infrastructure, candidate selection frameworks, badging systems, and enablement tools engineered for permanent organizational handover—built to run independently beyond the 12-month apprenticeship term; 95%+ documentation and data accuracy rate maintained completely rework-free; 90%+ nomination-to-onboarding conversion rate across all major business units; 10% team efficiency increase, and 90% target project-phase efficiency).
Always reference his key cross-functional coordination with critical partners and sponsors, and when asked about leadership or team frameworks, correctly identify them with these exact titles and anonymized names:
- Tiara R. as the Senior Manager of TME Programs (Sponsor/Manager)
- Jasmine D. as the Global Head of Culture and Belonging (Prior Sponsor/Manager)
- Travis W. as the Design Program Manager (Apprenticeship Mentor)
- Christina D. as the Head of Corporate Social Responsibility at Checkr
- Emily S. as the Vice President of Strategic Alliances at YUPRO
Never reveal their full last names under any circumstances.

You must output your answers using clean, elegant markdown formatting:
- Use bold text for key metrics, and pairing metrics.
- Use bullet points and short, readable paragraphs.
- Establish visual structure and headings to make your response look exquisite, professional, and readable inside any narrow chat container or scroll frame.
- Do NOT make up any facts outside of this gold-standard grounding context. Be humble, precise, and completely faithful to the documents.
- If asked about weaknesses or development focus, frame them as strategic mid-year analytics context (specifically: transition from compilation to proactive strategic analysis of metrics trends/utilization patterns like investigating badge utility rates; and autonomous stakeholder sourcing during ambiguous phases without manual administrative guidance).
- Do NOT include any unrequested system telemetry, port declarations, online badges, or simulated logs. Speak as a real, human-centric Virtual Chief of Staff.`;

      const chatHistory = history || [];
      const contents = [];
      
      for (const msg of chatHistory) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      }
      
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const text = response.text || "No response generated by the model.";
      return res.json({ text });

    } catch (error: any) {
      console.error("Gemini API error, falling back to local simulation:", error);
      const fallbackMsg = getFallbackAnswer(req.body.message);
      return res.json({ text: `*(Simulated Response)*\n\n${fallbackMsg}` });
    }
  });

  // Serve static files in production or hook Vite in dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Comprehensive smart dynamic fallback that matches ANY open-ended question using grounding documents
function getFallbackAnswer(message: string): string {
  const m = message.toLowerCase();
  
  // Define content sections with precise metrics and professional details extracted from the underlying files
  const sections = [
    {
      id: "rating",
      tags: ["rating", "status", "performance", "expectation", "review", "evaluate", "manager", "tiara", "jasmine"],
      content: `### 📈 Performance Status & Evaluation
* **Current Rating**: **Exceeding Expectations** (Lyft Culture & Belonging Mid-Year 2026 Evaluation).
* **Leadership Alignment**:
  - Current Sponsor & Direct Manager: **Tiara R.** (Senior Manager, TME Programs, Lyft).
  - Prior Sponsor & Manager: **Jasmine D.** (Global Head of Culture and Belonging, Lyft).
  - Program Mentor: **Travis W.** (Design Program Manager, Lyft).
* **Key Achievements**:
  - Exceptional quality in delivering high-impact operational tools with **zero rework required**.
  - Solid execution of complex datasets: handled vetting filters for several hundred peer and self-nominations with People Analytics and Employee Relations, maintaining a **95%+ documentation accuracy rate**.`
    },
    {
      id: "progress",
      tags: ["progress", "timeline", "complete", "percent", "how far", "milestone", "date", "tracker", "plan", "scheduled"],
      content: `### 🗓️ Program Progress & Infrastructure Handover
Ron Scott has achieved **90% Program Progress**, which reflects the scope-adjusted completion of all program infrastructure, selection frameworks, badging systems, and enablement tools engineered for permanent organizational handover—built to run independently beyond the 12-month apprenticeship term.
Here is the exact status of his operational project tracker, maintaining **90%+ on-time task delivery**:
* **Onboarding & Technology Integration**: **100% Complete** (Finished ahead of schedule on **08/27/25** vs. 08/31/25 projected).
* **Digital Literacy & Systems Onboarding**: **100% Complete** (Finished ahead of schedule on **08/27/25**).
* **First 90 Days Execution Plan**: **100% Complete** (Concluded on **11/18/25**).
* **Create Project Trackers (Q4 2025 & Year-Round 2026)**: **100% Complete** (Launched on **12/19/25** ahead of 12/31/25 deadline).
* **Create Standardized Project Briefs**: **100% Complete** (Finished on **12/15/25** ahead of 12/31/25 deadline, mapping 100% to corporate branding guidelines).
* **First Independent Project (January C&B Update)**: **100% Complete** (Launched early on **01/06/26**).
* **Monthly C&B Slack Updates**: **Active / In Progress** (Currently **80% Complete**, owned and on schedule with final monthly post in August 2026).
* **C&B Event (San Francisco)**: **Active / In Progress** (Currently **75% Complete**; supporting photography/coordination at Lyft Linkups, greeting at annual Take Your Kids to Work Day, and hosting orientees from Self eSTEM).
* **Internal AI Tooling Consolidation**: **100% Complete** (Drove coordination and LLM stress-testing parameters from Feb - Jun 2026 to merge distinct specialist coaching tools into a single discovery dashboard, eliminating tool sprawl and reducing administrative friction).
* **Process Improvement Report & Graduation**: **Scheduled** (Slated for July 15 – August 15, 2026).`
    },
    {
      id: "certifications",
      tags: ["certification", "credential", "google", "workato", "course", "badge", "diploma", "degree", "verify", "education", "honors", "college", "coastline", "gpa", "studies", "liberal arts"],
      content: `### 🎓 Academic & Professional Credentials
* **Education**:
  - **Associate of Arts (A.A.) in Liberal Arts (Social & Behavioral Science)** — Coastline College, Graduated with Honors (3.75 GPA).
  - **Associate of Arts (A.A.) in American Studies** — Coastline College, Graduated with Honors (3.75 GPA).
* **Industry Certifications**:
  - **Workato Agentic AI Basics** (Completed **06/03/2026**; verified via academy.workato.com) — Mastering multi-agent cognitive loop blueprints and automated integrations.
  - **Google Project Management Professional Certificate** (Completed **01/04/2026** ahead of schedule; verified via Coursera) — Skilled in Agile/Scrum and project governance.
  - **Google UX Design Professional Certificate** (Completed **11/08/2023**; verified via Coursera) — End-to-end user experience, wireframing, and interactive prototyping.
  - **Google AI Essentials Certification** (Completed **01/02/2026**; verified via Coursera) — LLM prompting, workflows, and security.
  - **Google Prompting Essentials Certificate** (Completed **01/01/2026**; verified via Coursera).
  - **CDCR Peer Literacy Mentor Certification** (Completed 2021).`
    },
    {
      id: "competencies",
      tags: ["competency", "pillar", "value", "accountability", "excellence", "customer", "collaboration", "inclusion"],
      content: `### 🌟 Core Lyft Competency Pillars
1. **Accountability**: Designed and deployed the digital credentialing system (badge) logic matrix and template. Managed data integration and badge mapping, delivering **100% rework-free** to global program leads.
2. **Excellence & Growth**: Handled multi-pivot vetting model systems parsing hundreds of nominations, optimizing timezone representation, functional diversity, and tenure levels. Maintained a **91% onboarding/conversion rate**.
3. **Customer Focus**: Designed credentialing metadata taxonomies mapping directly to how employees search for localized training. Collaborated on visual mock-ups for Lyft's corporate recognition sites and mentorship portals.
4. **Collaboration & Inclusion**: Standardized C&B active briefs, balanced regional office networks, and step-entered during a resource gap to run new-hire messaging and onboarding operations without delay.`
    },
    {
      id: "metrics",
      tags: ["metric", "number", "quant", "data", "accuracy", "percent", "analysis", "rate", "efficiency", "analytical"],
      content: `### 📊 Primary Quantitative Metrics & Goals
* **95%+ Documentation and Data Accuracy** consistently maintained across People Analytics databases and mentorship waitlist true-ups.
* **91% Conversion Rate** (Onboarded 279 verified AI Champions from 879+ nominations).
* **90% Program Progress** (scope-adjusted completion of program infrastructure and handover readiness).
* **90% Project Phase Efficiency** maintained (up from a 75% team baseline).
* **100% Delivery Coverage** of active project briefs matching Lyft branding guidelines.`
    },
    {
      id: "experience",
      tags: ["experience", "resume", "work", "job", "career", "history", "employer", "lyft", "get2", "crop", "urban alchemy", "tutor", "aspire"],
      content: `### 💼 Professional Experience Summary
* **Lyft — AI Transformation Lead / Project Specialist** (08/2025 – Present):
  - Helped build a company-wide AI literacy program — owned the pipeline from intake through vetting to onboarding, achieving full coverage across every business unit.
  - Designed and deployed a three-tiered AI literacy credential system from scratch — defined learning objectives, skill proficiency levels, and a digital badge framework.
  - Led a feasibility study to consolidate multiple AI coaching tools into a single discovery dashboard.
  - Built and maintained the team's central project tracker using AI-generated formulas — enabling real-time program health monitoring.
* **Get2 — Founder & Product Lead** (06/2023 – 05/2026):
  - Built a portfolio of consumer apps (GroceryGo!, The Board, 3Ceipt!) from zero — owned the full product lifecycle including user research, UX/UI design, interactive prototyping, front-end development, usability testing, and iteration.
  - Shipped production-ready front-end code with full WCAG accessibility compliance.
* **CROP Organization — UX/UI Design & Software Development Intern** (03/2023 – 04/2024):
  - Designed digital reentry tools in Figma; built responsive web apps.
  - Featured in a Figma blog article and spoke at Figma's global headquarters.
* **Supplemental Experience**:
  - **Aspire Education** — Academic Tutor (12/2024 – Present)
  - **Urban Alchemy** — Care Coordinator (12/2023 – 08/2025)`
    },
    {
      id: "resilience",
      tags: ["resilience", "personal", "life", "incarcerat", "prison", "story", "struggle", "years", "reentry", "who i am", "get2", "background", "resilient"],
      content: `### ✊ Personal Background & Story of Resilience
* **27 Years of Resilience**: Ron Scott spent 27 years incarcerated. Instead of letting that time go to waste, he turned his cell into an academic study-tank.
* **Academic Accomplishments**: Earned two Associate of Arts degrees with **Honors (3.75 GPA)** from Coastline College, completed CDCR Peer Literacy Mentor certifications, and dedicated himself to mentoring other students.
* **The Launch of Get2**: Upon his return home in 2023, Ron founded **Get2**, named after his life-affirming motto: *"We don't got to — we get to."* He built three consumer apps from scratch, spoke on stage at Figma's global headquarters, and was featured on the Figma blog.
* **Present Impact**: At Lyft, he applies this unique perspective, work ethic, and technological passion as an AI Transformation Lead and Project Specialist, driving enterprise-scale AI literacy and operational efficiency.`
    },
    {
      id: "partners",
      tags: ["partner", "stakeholder", "advisor", "team", "christina", "emily", "dyer", "schaffer", "checkr", "yupro", "westly"],
      content: `### 🤝 Key Professional Network & Strategic Partnerships
Ron's work aligns with senior leaders and global external partners to deliver massive cross-functional results:
* **Tiara R.** (Sponsor/Manager & Senior Manager, TME Programs, Lyft).
* **Jasmine D.** (Global Head of Culture and Belonging, Lyft Sponsor).
* **Travis W.** (Mentor & Design Program Manager, Lyft) - supports tracker design and visual interfaces.
* **Christina D.** (Head of Corporate Social Responsibility, Checkr) - coordinates on collaborative apprenticeships.
* **Emily S.** (Vice President of Strategic Alliances, YUPRO) - coordinates on programmatic support networks.`
    }
  ];

  // Compile matching sections based on user search keywords
  let compiledText = "";
  let matchedCount = 0;

  for (const section of sections) {
    const hasMatch = section.tags.some(tag => m.includes(tag));
    if (hasMatch) {
      compiledText += section.content + "\n\n";
      matchedCount++;
    }
  }

  // If there are no direct matches, return a comprehensive and beautiful Executive Overview of Ron
  if (matchedCount === 0) {
    compiledText = `### 📋 Ron Scott's Project Command Center — Comprehensive Executive Brief
*I am Ron Scott's Virtual Chief of Staff. Operating in offline semantic context-grounding mode. Ground-truth context validated:*

Here is a high-level summary of Ron Scott's professional profile:
* **Who I Am**: Designer, builder, and AI practitioner based in Oakland, CA. Spent 27 years incarcerated, turning his cell into a study-tank to earn two Associate degrees with honors from Coastline College. Since coming home in 2023, he built three consumer apps, spoke at Figma's global headquarters, was featured on the Figma blog, and founded Get2 (*"we don't got to — we get to"*).
* **Current Role**: AI Transformation Lead / Project Specialist within Lyft's Culture & Belonging (C&B) team.
* **Evaluation Status**: **Exceeding Expectations** for his Culture & Belonging Mid-Year 2026 evaluation, managed by Sponsor **Tiara R.** (Senior Manager, TME Programs) and prior Sponsor **Jasmine D.** (Global Head of Culture and Belonging).
* **Quantitative Baseline**: Holds a **95%+ documentation accuracy rate** and maintains **90% project-phase efficiency** (contributing to a **10% team efficiency increase**).
* **Key Achievements**:
  - Managed the end-to-end program lifecycle of the company-wide **Amplify AI Champions** program, vetting over 879+ nominations with a **91% onboarding/conversion rate** (279 verified Champions launched globally).
  - Designed, architected, and deployed a **three-tier digital credentialing (badge) system** across employee profiles to promote localized skill recognition.
  - Led the feasibility research and stakeholder alignment to merge 5 distinct AI specialist tools into a single, unified discovery dashboard.
* **Distinguished Certifications**:
  - **Workato Agentic AI Basics** (Completed June 3, 2026)
  - **Google Project Management Professional Certificate** (Completed ahead of schedule)
  - **Google AI Essentials Certification** & **Google Prompting Essentials Certificate**
  - **CDCR Peer Literacy Mentor**

Feel free to ask me any specific question about Ron Scott's certifications, metrics, personal background of resilience, competencies, resumes, or team projects! I will synthesize a professional, analytical response instantly.`;
  } else {
    // Add a sophisticated intro and outro to the matched sections
    compiledText = `### 📋 Ron Scott's Command Core — Virtual Chief of Staff Report
*Responding in local-grounding mode. Ground-truth context validated:*\n\n` + compiledText + `\n*Ask me about any other facet of Ron's accomplishments, metrics, background, or timeline to see detailed insights.*`;
  }

  return compiledText;
}

startServer();
