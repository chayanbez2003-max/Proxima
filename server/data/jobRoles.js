/**
 * jobRoles.js
 *
 * Seed data for 30 modern industry job roles.
 * Each role contains realistic required skills mirroring SKILLS_CATALOG categories.
 *
 * Imported by: server/database/seedJobRoles.js
 */

export const JOB_ROLES_SEED = [
  // ── Web Development ─────────────────────────────────────────────────────────
  {
    role:     "Frontend Developer",
    category: "Web Development",
    requiredSkills: {
      programmingLanguages: ["JavaScript", "TypeScript"],
      frontend: [
        "HTML", "HTML5", "CSS", "CSS3", "React", "Next.js",
        "Tailwind CSS", "Bootstrap", "Redux", "Webpack", "Vite",
      ],
      versionControl: ["Git"],
      testing:        ["Jest", "React Testing Library"],
      tools:          ["VS Code", "npm", "Postman"],
      concepts:       ["Responsive Design", "Accessibility", "SEO"],
    },
  },
  {
    role:     "React Developer",
    category: "Web Development",
    requiredSkills: {
      programmingLanguages: ["JavaScript", "TypeScript"],
      frontend: [
        "React", "Next.js", "Redux", "React Query",
        "Tailwind CSS", "Styled Components", "Framer Motion",
        "HTML5", "CSS3", "Vite", "Webpack",
      ],
      versionControl: ["Git"],
      testing:        ["Jest", "React Testing Library", "Cypress"],
      tools:          ["npm", "Postman", "VS Code"],
    },
  },
  {
    role:     "Angular Developer",
    category: "Web Development",
    requiredSkills: {
      programmingLanguages: ["TypeScript", "JavaScript"],
      frontend: [
        "Angular", "HTML5", "CSS3", "SCSS",
        "RxJS", "NgRx", "Bootstrap",
      ],
      versionControl: ["Git"],
      testing:        ["Jasmine", "Karma", "Cypress"],
      tools:          ["npm", "VS Code"],
    },
  },
  {
    role:     "Vue Developer",
    category: "Web Development",
    requiredSkills: {
      programmingLanguages: ["JavaScript", "TypeScript"],
      frontend: [
        "Vue.js", "Nuxt.js", "Pinia", "Vuex",
        "HTML5", "CSS3", "Tailwind CSS",
      ],
      versionControl: ["Git"],
      testing:        ["Vitest", "Cypress"],
    },
  },

  // ── Backend Development ────────────────────────────────────────────────────
  {
    role:     "Backend Developer",
    category: "Backend Development",
    requiredSkills: {
      programmingLanguages: ["JavaScript", "TypeScript", "Python"],
      backend: [
        "Node.js", "Express.js", "RESTful API", "GraphQL",
        "JWT", "Microservices",
      ],
      databases:      ["PostgreSQL", "MongoDB", "Redis"],
      versionControl: ["Git"],
      testing:        ["Jest", "Mocha"],
      tools:          ["Postman", "Docker", "npm"],
      concepts:       ["API Design", "Caching", "Authentication"],
    },
  },
  {
    role:     "Node.js Developer",
    category: "Backend Development",
    requiredSkills: {
      programmingLanguages: ["JavaScript", "TypeScript"],
      backend: [
        "Node.js", "Express.js", "NestJS", "RESTful API",
        "GraphQL", "WebSockets", "JWT", "Kafka",
      ],
      databases:      ["MongoDB", "PostgreSQL", "Redis"],
      versionControl: ["Git"],
      testing:        ["Jest", "Mocha"],
      tools:          ["Docker", "Postman", "npm"],
    },
  },
  {
    role:     "MERN Developer",
    category: "Backend Development",
    requiredSkills: {
      programmingLanguages: ["JavaScript", "TypeScript"],
      frontend:       ["React", "Next.js", "Redux", "Tailwind CSS", "HTML5", "CSS3"],
      backend:        ["Node.js", "Express.js", "RESTful API", "JWT"],
      databases:      ["MongoDB", "Redis"],
      versionControl: ["Git"],
      testing:        ["Jest", "React Testing Library"],
      tools:          ["Docker", "Postman", "npm"],
    },
  },
  {
    role:     "Full Stack Developer",
    category: "Backend Development",
    requiredSkills: {
      programmingLanguages: ["JavaScript", "TypeScript"],
      frontend:       ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
      backend:        ["Node.js", "Express.js", "RESTful API", "GraphQL"],
      databases:      ["PostgreSQL", "MongoDB", "Redis"],
      versionControl: ["Git", "GitHub"],
      testing:        ["Jest", "Cypress"],
      tools:          ["Docker", "Postman", "Jira"],
      concepts:       ["System Design", "API Design"],
    },
  },
  {
    role:     "Python Developer",
    category: "Backend Development",
    requiredSkills: {
      programmingLanguages: ["Python"],
      backend:        ["Django", "Flask", "FastAPI", "RESTful API", "Celery"],
      databases:      ["PostgreSQL", "MySQL", "Redis"],
      versionControl: ["Git"],
      testing:        ["PyTest", "unittest"],
      tools:          ["Docker", "VS Code", "pip"],
      concepts:       ["OOP", "Design Patterns", "Caching"],
    },
  },
  {
    role:     "Django Developer",
    category: "Backend Development",
    requiredSkills: {
      programmingLanguages: ["Python"],
      backend:        ["Django", "Django REST Framework", "Celery", "RESTful API"],
      databases:      ["PostgreSQL", "Redis"],
      versionControl: ["Git"],
      testing:        ["PyTest"],
      tools:          ["Docker", "pip"],
    },
  },
  {
    role:     "Java Developer",
    category: "Backend Development",
    requiredSkills: {
      programmingLanguages: ["Java"],
      backend:        ["Spring Boot", "Spring MVC", "Spring Security", "Hibernate", "RESTful API", "Microservices"],
      databases:      ["PostgreSQL", "MySQL", "Redis"],
      versionControl: ["Git"],
      testing:        ["JUnit", "Mockito"],
      tools:          ["Maven", "Gradle", "IntelliJ IDEA", "Docker"],
      concepts:       ["OOP", "Design Patterns", "SOLID Principles"],
    },
  },
  {
    role:     "Spring Boot Developer",
    category: "Backend Development",
    requiredSkills: {
      programmingLanguages: ["Java"],
      backend:        ["Spring Boot", "Spring Security", "Hibernate", "RESTful API", "Kafka", "Microservices"],
      databases:      ["PostgreSQL", "MySQL", "Redis"],
      versionControl: ["Git"],
      testing:        ["JUnit", "Mockito"],
      tools:          ["Maven", "Docker", "IntelliJ IDEA"],
    },
  },

  // ── Mobile Development ─────────────────────────────────────────────────────
  {
    role:     "Android Developer",
    category: "Mobile Development",
    requiredSkills: {
      programmingLanguages: ["Kotlin", "Java"],
      mobile:         ["Android", "Android Studio", "Firebase", "Push Notifications", "Play Store"],
      databases:      ["SQLite", "Firebase Realtime Database"],
      versionControl: ["Git"],
      testing:        ["JUnit"],
      concepts:       ["OOP", "Design Patterns"],
    },
  },
  {
    role:     "Flutter Developer",
    category: "Mobile Development",
    requiredSkills: {
      programmingLanguages: ["Dart"],
      mobile:         ["Flutter", "React Native", "Firebase", "App Store", "Play Store"],
      versionControl: ["Git"],
      testing:        ["Unit Testing"],
    },
  },

  // ── Data & AI ──────────────────────────────────────────────────────────────
  {
    role:     "Data Analyst",
    category: "Data & AI",
    requiredSkills: {
      programmingLanguages: ["Python", "R", "SQL"],
      aiMl:           ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Data Analysis"],
      databases:      ["PostgreSQL", "MySQL", "SQL"],
      tools:          ["Jupyter Notebook", "Tableau", "Power BI"],
      concepts:       ["Data Structures", "Algorithms"],
    },
  },
  {
    role:     "Data Scientist",
    category: "Data & AI",
    requiredSkills: {
      programmingLanguages: ["Python", "R"],
      aiMl: [
        "Machine Learning", "Deep Learning", "Scikit-learn",
        "TensorFlow", "PyTorch", "Pandas", "NumPy", "Matplotlib",
        "Data Science", "Feature Engineering", "NLP",
      ],
      databases:      ["PostgreSQL", "SQL"],
      tools:          ["Jupyter Notebook", "Google Colab", "MLflow"],
    },
  },
  {
    role:     "Machine Learning Engineer",
    category: "Data & AI",
    requiredSkills: {
      programmingLanguages: ["Python"],
      aiMl: [
        "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch",
        "Scikit-learn", "Hugging Face", "MLflow", "Feature Engineering",
        "NLP", "Computer Vision",
      ],
      backend:        ["RESTful API", "FastAPI"],
      cloud:          ["AWS", "GCP"],
      tools:          ["Docker", "Kubernetes", "Jupyter Notebook"],
    },
  },
  {
    role:     "AI Engineer",
    category: "Data & AI",
    requiredSkills: {
      programmingLanguages: ["Python"],
      aiMl: [
        "Machine Learning", "Deep Learning", "LangChain", "LlamaIndex",
        "OpenAI API", "Gemini API", "Hugging Face", "RAG",
        "Prompt Engineering", "Fine-tuning", "NLP",
      ],
      backend:        ["FastAPI", "Node.js", "RESTful API"],
      databases:      ["PostgreSQL", "MongoDB"],
      tools:          ["Docker", "Jupyter Notebook"],
    },
  },

  // ── DevOps & Cloud ─────────────────────────────────────────────────────────
  {
    role:     "DevOps Engineer",
    category: "DevOps & Cloud",
    requiredSkills: {
      programmingLanguages: ["Python", "Bash"],
      devops: [
        "Docker", "Kubernetes", "Helm", "Jenkins", "GitHub Actions",
        "Terraform", "Ansible", "Prometheus", "Grafana", "ELK Stack",
        "CI/CD", "Infrastructure as Code", "GitOps",
      ],
      cloud:          ["AWS", "Azure", "GCP"],
      operatingSystems: ["Linux"],
      versionControl: ["Git"],
      tools:          ["Postman"],
    },
  },
  {
    role:     "Cloud Engineer",
    category: "DevOps & Cloud",
    requiredSkills: {
      programmingLanguages: ["Python", "Bash"],
      cloud: [
        "AWS", "Azure", "GCP", "EC2", "S3", "Lambda",
        "CDN", "Load Balancing", "VPC",
      ],
      devops:         ["Terraform", "Docker", "Kubernetes", "CI/CD"],
      operatingSystems: ["Linux"],
      versionControl: ["Git"],
    },
  },

  // ── Security ───────────────────────────────────────────────────────────────
  {
    role:     "Cybersecurity Analyst",
    category: "Security",
    requiredSkills: {
      programmingLanguages: ["Python", "Bash"],
      others:         ["Cybersecurity", "Penetration Testing", "SIEM", "SOAR"],
      operatingSystems: ["Linux", "Windows"],
      concepts:       ["Security", "OWASP", "Authentication", "Authorization"],
      versionControl: ["Git"],
      tools:          ["Docker"],
    },
  },

  // ── QA & Testing ──────────────────────────────────────────────────────────
  {
    role:     "QA Engineer",
    category: "QA & Testing",
    requiredSkills: {
      testing: [
        "Selenium", "Cypress", "Playwright", "Jest", "JUnit",
        "Postman", "k6", "TDD", "BDD",
        "Unit Testing", "Integration Testing", "E2E Testing",
      ],
      programmingLanguages: ["JavaScript", "Python", "Java"],
      versionControl: ["Git"],
      tools:          ["Jira", "Postman"],
      concepts:       ["API Design"],
    },
  },
  {
    role:     "SDET",
    category: "QA & Testing",
    requiredSkills: {
      testing: [
        "Selenium", "Playwright", "Cypress", "Jest", "JUnit", "PyTest",
        "TDD", "BDD", "Performance Testing", "Load Testing",
      ],
      programmingLanguages: ["Java", "Python", "JavaScript"],
      versionControl: ["Git"],
      tools:          ["Jira", "Docker"],
    },
  },

  // ── Management ────────────────────────────────────────────────────────────
  {
    role:     "Business Analyst",
    category: "Management",
    requiredSkills: {
      concepts:   ["Agile Methodology", "Stakeholder Management", "Project Management"],
      softSkills: ["Communication", "Leadership", "Problem Solving", "Collaboration"],
      tools:      ["Jira", "Confluence", "Notion", "Figma"],
    },
  },

  // ── General Engineering ────────────────────────────────────────────────────
  {
    role:     "Software Engineer",
    category: "Backend Development",
    requiredSkills: {
      programmingLanguages: ["JavaScript", "TypeScript", "Python", "Java"],
      backend:        ["Node.js", "Express.js", "RESTful API"],
      databases:      ["PostgreSQL", "MongoDB"],
      versionControl: ["Git"],
      testing:        ["Jest", "Unit Testing"],
      tools:          ["Docker", "Postman"],
      concepts:       ["OOP", "Design Patterns", "SOLID Principles", "Data Structures", "Algorithms"],
    },
  },
  {
    role:     "Software Development Engineer",
    category: "Backend Development",
    requiredSkills: {
      programmingLanguages: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
      backend:        ["RESTful API", "Microservices", "GraphQL"],
      databases:      ["PostgreSQL", "MongoDB", "Redis"],
      versionControl: ["Git"],
      testing:        ["Jest", "JUnit", "TDD"],
      tools:          ["Docker", "Kubernetes"],
      concepts:       ["System Design", "OOP", "Data Structures", "Algorithms"],
    },
  },

  // ── Blockchain & Other ─────────────────────────────────────────────────────
  {
    role:     "Blockchain Developer",
    category: "Blockchain & Other",
    requiredSkills: {
      programmingLanguages: ["Solidity", "JavaScript", "TypeScript"],
      others:         ["Blockchain", "Smart Contracts", "Web3", "Ethereum"],
      backend:        ["Node.js", "RESTful API"],
      databases:      ["MongoDB"],
      versionControl: ["Git"],
    },
  },
  {
    role:     "Embedded Engineer",
    category: "Blockchain & Other",
    requiredSkills: {
      programmingLanguages: ["C", "C++", "Assembly"],
      others:         ["Embedded Systems", "RTOS", "IoT", "Arduino", "Raspberry Pi"],
      operatingSystems: ["Linux"],
      versionControl: ["Git"],
    },
  },
  {
    role:     "Game Developer",
    category: "Blockchain & Other",
    requiredSkills: {
      programmingLanguages: ["C#", "C++"],
      others:         ["Unity", "Unreal Engine", "Game Development"],
      versionControl: ["Git"],
      concepts:       ["OOP", "Design Patterns"],
    },
  },

  // ── Design ─────────────────────────────────────────────────────────────────
  {
    role:     "UI/UX Designer",
    category: "Design",
    requiredSkills: {
      tools:      ["Figma", "Adobe XD", "Sketch", "Zeplin"],
      frontend:   ["HTML5", "CSS3", "Framer Motion"],
      softSkills: ["Communication", "Collaboration", "Problem Solving"],
      concepts:   ["Responsive Design", "Accessibility"],
    },
  },
];
