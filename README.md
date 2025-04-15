# 🧠 MCP Product Assistant

A full-stack AI-powered product management tool that uses the **Model Context Protocol (MCP)** to generate strategic product artifacts from lightweight product briefs.

Built with:

- 🦜 FastAPI backend
- ⚛️ React + Tailwind frontend (via Bolt + Roo)
- 🤖 OpenAI GPT (via API)
- 📝 Markdown-rendered output

---

## 🚀 What It Does

This tool lets you select a product brief and generate:

- Product Epics
- Roadmaps
- Strategies
- Feature Lists
- User Personas

All responses are generated using structured context blocks and displayed in a beautiful Markdown-rendered interface.

---

## 🛠 Project Structure

mcp-project/
├── backend/
│   ├── main.py                      # FastAPI app with CORS and /generate route
│   ├── prompt_builder.py            # Loads brief, instruction, and role to build prompt
│   ├── openai_client.py             # Sends request to OpenAI and returns response
│   ├── requirements.txt             # Python dependencies
│   └── contexts/
│       ├── product_briefs/          # Brief definitions (smart_calendar.json, etc.)
│       ├── instructions/            # Task-specific prompt instructions (epics.json, etc.)
│       └── system_roles/            # System-level instructions (agile_coach.json, etc.)
├── frontend/
│   ├── App.tsx                      # Main React app UI
│   ├── components/                  # ShadCN UI components (Select, Button, etc.)
│   ├── hooks/                       # Toast/notification hook
│   ├── index.html                   # Vite entry point
│   ├── package.json                 # Frontend dependencies
│   ├── tailwind.config.js           # Tailwind + typography plugin
│   └── vite.config.ts               # Vite dev server config
├── .env                             # Contains OPENAI_API_KEY (not committed)
├── .gitignore                       # Git exclusions for venv, node_modules, etc.
├── README.md                        # Project overview and instructions


---

## 🧪 How to Run It Locally

### 1. Set up Python backend

    cd backend/
    python -m venv venv
    source venv/Scripts/activate  # or source venv/bin/activate on Mac/Linux
    pip install -r requirements.txt
    uvicorn main:app --reload


### 2. Set up frontend

    cd frontend/
    npm install
    npm run dev

### 3. Navigate to the app

    http://localhost:5173

✍️## **Adding New Tasks or Briefs**

➕ **Add a New Task Type**
Add a file to contexts/instructions/:

    {
      "system": "strategy_consultant",
      "content": "Prompt instructions here..."
    }

And create the matching system role in contexts/system_roles/strategy_consultant.json:

    {
      "content": "You are a product strategy consultant who crafts internal strategy docs for digital product teams..."
    }

➕ **Add a New Product Brief**

Add a .json file to contexts/product_briefs/:

    {
      "title": "New Product",
      "problem": "Describe the core problem the product solves.",
      "goals": ["Goal 1", "Goal 2"],
      "target_users": ["Persona 1", "Persona 2"],
      "key_features": ["Feature A", "Feature B"],
      "constraints": ["Constraint A", "Constraint B"]
    }

 ## 🧭 Roadmap

### 🔧 Core Enhancements
- [ ] Add temperature and model selection controls to fine-tune LLM responses
- [ ] Support Markdown and WYSIWYG editing of generated content before committing
- [ ] Enable feedback-driven refinement of LLM outputs before saving (e.g., "make this more concise")

### 🗂 Content Management (CRUD)
- [ ] Add full CRUD UI for Product Briefs (create, edit, delete)
- [ ] Add full CRUD UI for Task Instructions (e.g., epics, roadmap prompts)
- [ ] Add full CRUD UI for System Roles (e.g., agile_coach, strategy_consultant)

### 💾 Output Storage + Approval Workflow
- [ ] Store the most recent **approved** output per task type per product brief
- [ ] Enable users to review, revise, and re-commit generated content
- [ ] Maintain version history of committed outputs for traceability

### 💬 Contextual LLM Q&A
- [ ] Add a prompt window where users can ask questions about a selected Product Brief
- [ ] LLM responses should leverage the Product Brief plus its generated artifacts (epics, strategy, etc.)
- [ ] Support follow-up queries and conversational context for deeper insight into the product

### 🧪 Dev & Deployment
- [ ] Add support for environment-based config (`.env`, `VITE_API_URL`, etc.)
- [ ] Build production-ready deployment (e.g., Fly.io, Render, or Docker Compose)
- [ ] Add basic auth or role-based access for multi-user environments


📜 **License**
MIT — built for learning, sharing, and pushing what's possible with AI + product thinking.

💬 Credits
Developed using:

 - FastAPI 
 - React 
 - OpenAI GPT 
 - Tailwind CSS 
 - Roo Code 
 - Bolt.new
