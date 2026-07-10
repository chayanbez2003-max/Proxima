/**
 * skillsCatalog.js
 *
 * Master skills catalogue — single source of truth for the entire platform.
 *
 * Used by:
 *  - resumeParser (M2): detect skills mentioned in resume text
 *  - careerIntelligence (M3): compare against job role requirements
 *  - Gemini prompts (M4): enrich/validate detected skills
 *  - ATS scorer (future): weight skills by relevance
 *
 * Structure: { categoryKey: [canonicalSkillName, ...] }
 * All canonical names use their official casing (e.g. "Node.js", not "nodejs").
 */

export const SKILLS_CATALOG = {
  // ── Programming Languages ──────────────────────────────────────────────────
  programmingLanguages: [
    "JavaScript", "TypeScript", "Python", "Java", "C", "C++", "C#",
    "Go", "Golang", "Rust", "Swift", "Kotlin", "PHP", "Ruby", "Scala",
    "Perl", "R", "MATLAB", "Dart", "Haskell", "Lua", "Elixir", "Erlang",
    "Clojure", "F#", "Objective-C", "Assembly", "Bash", "Shell",
    "PowerShell", "VBA", "Groovy", "Julia", "COBOL", "Fortran", "Solidity",
    "Prolog", "Lisp", "OCaml",
  ],

  // ── Frontend ───────────────────────────────────────────────────────────────
  frontend: [
    "HTML", "HTML5", "CSS", "CSS3", "SCSS", "SASS", "LESS",
    "React", "Next.js", "Vue.js", "Nuxt.js", "Angular", "Svelte", "SvelteKit",
    "Gatsby", "Remix", "Astro",
    "Tailwind CSS", "Bootstrap", "Material UI", "Ant Design", "Chakra UI",
    "Styled Components", "Emotion", "Framer Motion",
    "Redux", "Zustand", "Recoil", "MobX", "Jotai", "Pinia",
    "Webpack", "Vite", "Parcel", "Rollup", "Babel", "esbuild",
    "jQuery", "Handlebars", "EJS", "Pug", "Liquid",
    "Three.js", "D3.js", "Chart.js", "Recharts", "Highcharts",
    "React Query", "SWR", "Apollo Client",
    "WebRTC", "Web Workers", "Service Workers", "PWA",
  ],

  // ── Backend ────────────────────────────────────────────────────────────────
  backend: [
    "Node.js", "Express.js", "NestJS", "Fastify", "Hapi.js", "Koa.js",
    "Django", "Flask", "FastAPI", "Tornado", "Starlette",
    "Spring Boot", "Spring MVC", "Spring Security", "Hibernate",
    "Ruby on Rails", "Sinatra",
    "Laravel", "Symfony", "Lumen",
    "ASP.NET Core", "ASP.NET", ".NET",
    "Gin", "Fiber", "Echo",
    "GraphQL", "REST", "gRPC", "tRPC", "WebSockets", "Socket.io",
    "Kafka", "RabbitMQ", "ActiveMQ", "NATS",
    "Celery", "BullMQ", "Sidekiq",
    "JWT", "OAuth 2.0", "OpenID Connect", "Passport.js",
    "Microservices", "Serverless", "Event-Driven Architecture",
  ],

  // ── Databases ──────────────────────────────────────────────────────────────
  databases: [
    "MongoDB", "PostgreSQL", "MySQL", "SQLite", "MariaDB",
    "SQL Server", "Oracle", "IBM Db2",
    "Redis", "Memcached",
    "Cassandra", "DynamoDB", "Firestore", "Firebase Realtime Database",
    "Elasticsearch", "OpenSearch", "Solr",
    "Neo4j", "ArangoDB",
    "InfluxDB", "TimescaleDB",
    "CockroachDB", "PlanetScale", "Supabase", "Neon",
    "Prisma", "Sequelize", "TypeORM", "Mongoose", "Knex.js",
    "SQL", "NoSQL", "ACID", "CAP Theorem", "Database Sharding",
  ],

  // ── Cloud ──────────────────────────────────────────────────────────────────
  cloud: [
    "AWS", "Azure", "GCP",
    "EC2", "S3", "Lambda", "RDS", "ECS", "EKS", "CloudFront",
    "API Gateway", "SQS", "SNS", "DynamoDB", "CloudWatch", "IAM",
    "Azure Functions", "Azure AKS", "Azure Blob Storage", "Azure DevOps",
    "Cloud Run", "Cloud Functions", "App Engine", "GKE", "BigQuery",
    "Vercel", "Netlify", "Heroku", "Railway", "Render", "Fly.io",
    "DigitalOcean", "Cloudflare", "Cloudflare Workers",
    "CDN", "Load Balancing", "Auto Scaling", "VPC",
  ],

  // ── DevOps ─────────────────────────────────────────────────────────────────
  devops: [
    "Docker", "Kubernetes", "Helm",
    "Jenkins", "GitHub Actions", "GitLab CI/CD", "CircleCI", "Travis CI",
    "ArgoCD", "Flux", "Spinnaker",
    "Terraform", "Ansible", "Chef", "Puppet", "Pulumi",
    "Nginx", "Apache", "Caddy", "HAProxy",
    "Prometheus", "Grafana", "Datadog", "New Relic", "Dynatrace",
    "ELK Stack", "Logstash", "Kibana", "Fluentd",
    "Vagrant", "Packer", "Crossplane",
    "CI/CD", "Infrastructure as Code", "GitOps", "SRE",
    "Service Mesh", "Istio", "Linkerd",
  ],

  // ── Version Control ────────────────────────────────────────────────────────
  versionControl: [
    "Git", "GitHub", "GitLab", "Bitbucket", "Azure Repos",
    "SVN", "Mercurial",
    "Git Flow", "Trunk-Based Development", "Monorepo",
    "Pull Requests", "Code Review",
  ],

  // ── Testing ────────────────────────────────────────────────────────────────
  testing: [
    "Jest", "Vitest", "Mocha", "Chai", "Jasmine", "Karma",
    "React Testing Library", "Enzyme",
    "Cypress", "Playwright", "Puppeteer", "Selenium", "WebdriverIO",
    "JUnit", "TestNG", "Mockito", "AssertJ",
    "PyTest", "unittest", "hypothesis",
    "RSpec", "Capybara",
    "k6", "Artillery", "Locust", "JMeter",
    "Storybook", "Chromatic",
    "TDD", "BDD", "ATDD",
    "Unit Testing", "Integration Testing", "E2E Testing",
    "Load Testing", "Performance Testing", "Security Testing",
  ],

  // ── Mobile ─────────────────────────────────────────────────────────────────
  mobile: [
    "React Native", "Flutter", "Expo",
    "Android", "iOS", "Swift", "Kotlin",
    "Ionic", "Capacitor", "Cordova",
    "Xamarin", "MAUI",
    "Android Studio", "Xcode",
    "Firebase", "Push Notifications", "App Store", "Play Store",
  ],

  // ── AI / ML ────────────────────────────────────────────────────────────────
  aiMl: [
    "Machine Learning", "Deep Learning", "Neural Networks",
    "TensorFlow", "PyTorch", "Keras", "JAX",
    "Scikit-learn", "XGBoost", "LightGBM", "CatBoost",
    "Pandas", "NumPy", "Matplotlib", "Seaborn", "SciPy", "Plotly",
    "OpenCV", "NLTK", "spaCy", "Gensim",
    "Hugging Face", "Transformers", "LangChain", "LlamaIndex",
    "OpenAI API", "Gemini API", "Anthropic Claude",
    "Computer Vision", "NLP", "Reinforcement Learning",
    "Data Science", "Data Analysis", "Feature Engineering",
    "MLflow", "Weights & Biases", "DVC",
    "Jupyter Notebook", "Google Colab",
    "RAG", "Fine-tuning", "Prompt Engineering",
  ],

  // ── Tools ──────────────────────────────────────────────────────────────────
  tools: [
    "VS Code", "IntelliJ IDEA", "WebStorm", "PyCharm", "Rider",
    "Visual Studio", "Eclipse", "NetBeans",
    "Vim", "Neovim", "Emacs",
    "Postman", "Insomnia", "Bruno",
    "Jira", "Confluence", "Trello", "Linear", "Notion", "Asana",
    "Figma", "Adobe XD", "Sketch", "Zeplin", "InVision",
    "npm", "yarn", "pnpm", "pip", "poetry", "cargo", "Maven", "Gradle",
    "Make", "Swagger", "OpenAPI",
    "Slack", "MS Teams", "Zoom",
    "SonarQube", "ESLint", "Prettier", "Husky",
  ],

  // ── Operating Systems ──────────────────────────────────────────────────────
  operatingSystems: [
    "Linux", "Ubuntu", "Debian", "CentOS", "RHEL", "Fedora", "Arch Linux",
    "macOS", "Windows", "Windows Server",
    "Bash scripting", "Shell scripting",
  ],

  // ── Soft Skills ────────────────────────────────────────────────────────────
  softSkills: [
    "Communication", "Teamwork", "Leadership", "Problem Solving",
    "Critical Thinking", "Time Management", "Adaptability",
    "Collaboration", "Mentoring", "Agile", "Scrum", "Kanban",
    "Project Management", "Stakeholder Management",
  ],

  // ── Concepts ───────────────────────────────────────────────────────────────
  concepts: [
    "OOP", "Object-Oriented Programming", "Functional Programming",
    "Design Patterns", "SOLID Principles", "Clean Code",
    "Data Structures", "Algorithms", "Complexity Analysis",
    "System Design", "High Availability", "Distributed Systems",
    "API Design", "RESTful API", "Microservices Architecture",
    "Event-Driven Architecture", "Domain-Driven Design",
    "Security", "OWASP", "Authentication", "Authorization",
    "Caching", "Message Queues", "Rate Limiting",
    "Responsive Design", "Accessibility", "SEO",
    "Agile Methodology", "DevOps Culture",
  ],

  // ── Others ─────────────────────────────────────────────────────────────────
  others: [
    "Blockchain", "Smart Contracts", "Web3", "Ethereum",
    "Unity", "Unreal Engine", "Godot", "Game Development",
    "Embedded Systems", "RTOS", "FPGA", "Arduino", "Raspberry Pi",
    "IoT", "MQTT", "Edge Computing",
    "Cybersecurity", "Penetration Testing", "SIEM", "SOAR",
    "AR/VR", "WebXR",
    "Technical Writing", "Documentation",
  ],
};

/**
 * CATEGORY_LABELS
 * Human-readable display names — used by both backend and shared with frontend.
 */
export const CATEGORY_LABELS = {
  programmingLanguages: "Programming Languages",
  frontend:             "Frontend",
  backend:              "Backend",
  databases:            "Databases",
  cloud:                "Cloud",
  devops:               "DevOps",
  versionControl:       "Version Control",
  testing:              "Testing",
  mobile:               "Mobile",
  aiMl:                 "AI / ML",
  tools:                "Tools",
  operatingSystems:     "Operating Systems",
  softSkills:           "Soft Skills",
  concepts:             "Concepts",
  others:               "Others",
};

/**
 * ALL_SKILLS_FLAT
 * De-duplicated flat array of every canonical skill name.
 * Used for quick full-catalog lookups and alias resolution.
 */
export const ALL_SKILLS_FLAT = [
  ...new Set(Object.values(SKILLS_CATALOG).flat()),
];
