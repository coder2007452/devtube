// StackTube Categories Taxonomy
// Mirrors the HackerTube layout from user reference photo with accurate developer categories

export const CATEGORY_GROUPS = [
  {
    id: "software_engineering",
    title: "Software Engineering & Languages",
    filterType: "group",
    subcategories: [
      { id: "fullstack_arch", name: "Fullstack Architecture & Design", query: "fullstack", count: 21 },
      { id: "js_ts", name: "JavaScript & TypeScript Mastery", query: "JavaScript", count: 18 },
      { id: "python_dev", name: "Python for Web & Automation", query: "Python", count: 14 },
      { id: "systems_prog", name: "C, C++, Rust & Systems Languages", query: "system", count: 8 },
      { id: "functional_prog", name: "Functional Programming & Clean Code", query: "clean", count: 6 },
      { id: "testing_debug", name: "Testing, Debugging & Developer Tools", query: "git", count: 9 },
      { id: "software_career", name: "Open Source, Git & Engineering Careers", query: "career", count: 11 }
    ]
  },
  {
    id: "ai_machine_learning",
    title: "AI, LLMs & Machine Learning",
    filterType: "group",
    subcategories: [
      { id: "gen_ai", name: "Generative AI & Prompt Engineering", query: "Generative AI", count: 13 },
      { id: "langchain_agents", name: "LangChain & Autonomous AI Agents", query: "LangChain", count: 8 },
      { id: "deep_learning", name: "Deep Learning, PyTorch & Neural Nets", query: "deep learning", count: 7 },
      { id: "local_llms", name: "Local LLMs, Ollama & Open Source AI", query: "ollama", count: 5 },
      { id: "rag_vector", name: "Vector Databases & RAG Pipelines", query: "vector", count: 6 },
      { id: "ai_math", name: "Mathematics & Foundations of ML", query: "machine learning", count: 9 }
    ]
  },
  {
    id: "web_development",
    title: "Web Development & Frontend",
    filterType: "group",
    subcategories: [
      { id: "react_ecosystem", name: "React 18 & 19 Core, Hooks & Redux", query: "React", count: 20 },
      { id: "html_css_mastery", name: "HTML5, Modern CSS3 & Responsive UI", query: "CSS", count: 12 },
      { id: "gsap_animations", name: "GSAP, Creative Web & 3D Animations", query: "GSAP", count: 6 },
      { id: "tailwind_ui", name: "Tailwind CSS & Component Libraries", query: "tailwind", count: 10 },
      { id: "frontend_system_design", name: "Frontend Architecture & Performance", query: "architecture", count: 7 }
    ]
  },
  {
    id: "fullstack_backend",
    title: "Full-Stack & Backend Systems",
    filterType: "group",
    subcategories: [
      { id: "nextjs_mastery", name: "Next.js 14 & 15 App Router", query: "Next.js", count: 15 },
      { id: "mern_stack", name: "MERN Stack Production Applications", query: "MERN", count: 14 },
      { id: "nodejs_express", name: "Node.js & Express RESTful APIs", query: "Node.js", count: 16 },
      { id: "websockets_realtime", name: "WebSockets, Socket.io & Realtime", query: "WebSockets", count: 6 },
      { id: "auth_security", name: "JWT, NextAuth & Security Architecture", query: "auth", count: 8 }
    ]
  },
  {
    id: "projects_tutorials",
    title: "Hands-on Project Builds",
    filterType: "group",
    subcategories: [
      { id: "saas_ecommerce", name: "Fullstack SaaS & E-Commerce Clones", query: "ecommerce", count: 14 },
      { id: "ai_apps_build", name: "AI Chatbots & Assistant Applications", query: "ai project", count: 10 },
      { id: "realtime_apps", name: "Realtime Chat & Collaboration Tools", query: "chat", count: 5 },
      { id: "clones_platforms", name: "Social Media & Video Platform Clones", query: "clone", count: 8 },
      { id: "portfolio_sites", name: "Interactive Agency & Portfolio Sites", query: "portfolio", count: 6 }
    ]
  },
  {
    id: "devops_cloud",
    title: "DevOps, Docker & Cloud",
    filterType: "group",
    subcategories: [
      { id: "docker_containers", name: "Docker Containers & Docker Compose", query: "Docker", count: 8 },
      { id: "kubernetes_cluster", name: "Kubernetes & Microservices Clusters", query: "Kubernetes", count: 5 },
      { id: "cicd_pipelines", name: "CI/CD & GitHub Actions Automation", query: "CI/CD", count: 6 },
      { id: "linux_sysadmin", name: "Linux Terminal & Server Administration", query: "Linux", count: 7 },
      { id: "cloud_deployment", name: "Cloud Deployment, AWS & Production", query: "DevOps", count: 9 }
    ]
  },
  {
    id: "databases_storage",
    title: "Databases & Storage Engines",
    filterType: "group",
    subcategories: [
      { id: "postgres_prisma", name: "PostgreSQL & Prisma ORM", query: "PostgreSQL", count: 8 },
      { id: "mongodb_atlas", name: "MongoDB, Mongoose & Aggregations", query: "MongoDB", count: 11 },
      { id: "redis_caching", name: "Redis Caching & Pub/Sub Queues", query: "Redis", count: 6 },
      { id: "mysql_relational", name: "MySQL & Relational Database Design", query: "SQL", count: 7 },
      { id: "vector_embeddings", name: "Vector Search & Pinecone DB", query: "vector", count: 5 }
    ]
  },
  {
    id: "career_interviews",
    title: "Placement Prep & System Design",
    filterType: "group",
    subcategories: [
      { id: "mern_placement", name: "Full Stack Placement Preparation", query: "placement", count: 9 },
      { id: "high_scale_system", name: "System Design for High Scale Services", query: "system design", count: 7 },
      { id: "interview_roadmaps", name: "Full Stack & Web Dev Roadmaps 2025", query: "roadmap", count: 8 },
      { id: "git_collaboration", name: "Git Workflow & Team Collaboration", query: "git", count: 6 }
    ]
  }
];
