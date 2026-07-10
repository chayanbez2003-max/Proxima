/**
 * skillAliases.js
 *
 * Alias → Canonical name mapping.
 *
 * Used by the Skill Normalizer so that "ReactJS", "React.js", and "React"
 * all resolve to the single canonical form "React".
 *
 * Keys: lowercase alias (trim applied before lookup).
 * Values: canonical skill name (must exist in SKILLS_CATALOG).
 *
 * Reused by:
 *  - skillNormalizer.js (M3)
 *  - resumeParser (M2 — future pass)
 *  - Gemini skill enrichment (M4)
 */

export const SKILL_ALIASES = {
  // ── JavaScript ecosystem ──────────────────────────────────────────────────
  "js":              "JavaScript",
  "es6":             "JavaScript",
  "es2015":          "JavaScript",
  "ecmascript":      "JavaScript",
  "ts":              "TypeScript",

  // ── React ─────────────────────────────────────────────────────────────────
  "reactjs":         "React",
  "react.js":        "React",
  "react js":        "React",

  // ── Next.js ───────────────────────────────────────────────────────────────
  "next":            "Next.js",
  "nextjs":          "Next.js",
  "next js":         "Next.js",

  // ── Vue ───────────────────────────────────────────────────────────────────
  "vue":             "Vue.js",
  "vuejs":           "Vue.js",
  "vue js":          "Vue.js",
  "vue 3":           "Vue.js",

  // ── Nuxt ─────────────────────────────────────────────────────────────────
  "nuxt":            "Nuxt.js",
  "nuxtjs":          "Nuxt.js",

  // ── Angular ───────────────────────────────────────────────────────────────
  "angular.js":      "Angular",
  "angularjs":       "Angular",
  "angular 2":       "Angular",

  // ── Node.js ───────────────────────────────────────────────────────────────
  "node":            "Node.js",
  "nodejs":          "Node.js",
  "node js":         "Node.js",

  // ── Express ───────────────────────────────────────────────────────────────
  "express":         "Express.js",
  "expressjs":       "Express.js",
  "express js":      "Express.js",
  "express.js":      "Express.js",

  // ── NestJS ────────────────────────────────────────────────────────────────
  "nest":            "NestJS",
  "nest.js":         "NestJS",

  // ── Databases ─────────────────────────────────────────────────────────────
  "mongo":           "MongoDB",
  "mongoose":        "MongoDB",
  "pg":              "PostgreSQL",
  "postgres":        "PostgreSQL",
  "mssql":           "SQL Server",
  "ms sql":          "SQL Server",
  "ms sql server":   "SQL Server",
  "mysql2":          "MySQL",
  "sqlite3":         "SQLite",
  "dynamo":          "DynamoDB",
  "dynamo db":       "DynamoDB",

  // ── Cloud ─────────────────────────────────────────────────────────────────
  "amazon web services": "AWS",
  "aws ec2":         "EC2",
  "aws s3":          "S3",
  "aws lambda":      "Lambda",
  "aws rds":         "RDS",
  "amazon s3":       "S3",
  "gcp":             "GCP",
  "google cloud":    "GCP",
  "google cloud platform": "GCP",
  "microsoft azure": "Azure",
  "azure cloud":     "Azure",

  // ── DevOps ────────────────────────────────────────────────────────────────
  "k8s":             "Kubernetes",
  "kube":            "Kubernetes",
  "gh actions":      "GitHub Actions",
  "gitlab ci":       "GitLab CI/CD",
  "gitlab cicd":     "GitLab CI/CD",
  "circle ci":       "CircleCI",
  "travis":          "Travis CI",
  "tf":              "Terraform",

  // ── Version Control ───────────────────────────────────────────────────────
  "github":          "Git",
  "gitlab":          "Git",
  "bitbucket":       "Git",
  "svn":             "SVN",

  // ── CSS frameworks ────────────────────────────────────────────────────────
  "tailwind":        "Tailwind CSS",
  "tailwindcss":     "Tailwind CSS",
  "bootstrap 5":     "Bootstrap",
  "material ui":     "Material UI",
  "mui":             "Material UI",
  "ant-design":      "Ant Design",
  "antd":            "Ant Design",
  "chakra":          "Chakra UI",

  // ── Build tools ───────────────────────────────────────────────────────────
  "vitejs":          "Vite",
  "webpack 5":       "Webpack",

  // ── State management ──────────────────────────────────────────────────────
  "redux toolkit":   "Redux",
  "rtk":             "Redux",

  // ── Testing ───────────────────────────────────────────────────────────────
  "react testing library": "React Testing Library",
  "rtl":             "React Testing Library",
  "playwright test": "Playwright",
  "webdriver":       "Selenium",

  // ── Python ────────────────────────────────────────────────────────────────
  "py":              "Python",
  "python3":         "Python",
  "django rest framework": "Django",
  "drf":             "Django",
  "fastapi framework": "FastAPI",

  // ── Java ──────────────────────────────────────────────────────────────────
  "spring":          "Spring Boot",
  "springboot":      "Spring Boot",
  "spring framework": "Spring Boot",

  // ── Mobile ────────────────────────────────────────────────────────────────
  "rn":              "React Native",
  "react-native":    "React Native",

  // ── AI / ML ───────────────────────────────────────────────────────────────
  "ml":              "Machine Learning",
  "dl":              "Deep Learning",
  "sklearn":         "Scikit-learn",
  "scikit learn":    "Scikit-learn",
  "tf.js":           "TensorFlow",
  "tensorflow.js":   "TensorFlow",
  "pytorch lightning": "PyTorch",
  "hf":              "Hugging Face",
  "nlp":             "NLP",
  "cv":              "Computer Vision",
  "openai":          "OpenAI API",
  "chatgpt api":     "OpenAI API",
  "gemini":          "Gemini API",
  "langchain":       "LangChain",

  // ── Tools ─────────────────────────────────────────────────────────────────
  "vscode":          "VS Code",
  "visual studio code": "VS Code",
  "intellij":        "IntelliJ IDEA",
  "pycharm":         "PyCharm",
  "postman api":     "Postman",

  // ── Concepts ──────────────────────────────────────────────────────────────
  "oop":             "OOP",
  "object oriented": "OOP",
  "solid":           "SOLID Principles",
  "dsa":             "Data Structures",
  "data structures and algorithms": "Data Structures",
  "rest api":        "RESTful API",
  "restful":         "RESTful API",
  "ci/cd":           "CI/CD",
  "cicd":            "CI/CD",
  "iac":             "Infrastructure as Code",

  // ── Others ────────────────────────────────────────────────────────────────
  "solidity lang":   "Solidity",
  "web 3":           "Web3",
  "web3.js":         "Web3",
};
