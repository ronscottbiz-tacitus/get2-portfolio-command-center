import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { SYSTEM_INSTRUCTION } from "./src/data/grounding";
import { getFallbackAnswer } from "./src/data/fallbackAnswers";

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

      // System instruction is derived from src/data/profile.ts and src/data/projects.ts —
      // see src/data/grounding.ts. Update those data files, not this string, to change
      // what the chatbot knows.
      const systemInstruction = SYSTEM_INSTRUCTION;

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

startServer();
