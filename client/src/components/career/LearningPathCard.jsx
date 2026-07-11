// ─── Personalized Learning Path Card ─────────────────────────────────────────
const LearningPathCard = ({ matchResult }) => {
  if (!matchResult) return null;

  const { selectedRole, missingSkills = {} } = matchResult;

  const flattenSkills = (skillsObj) => {
    return Object.values(skillsObj || {}).flat();
  };

  const missingSkillList = flattenSkills(missingSkills).slice(0, 5);

  if (missingSkillList.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] backdrop-blur-sm p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-300 uppercase tracking-widest">
            Personalized Learning Path
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2">
          You are already covering the key skills
        </h3>

        <p className="text-sm text-white/40">
          Keep improving your projects, resume presentation, and interview preparation for the selected role.
        </p>
      </div>
    );
  }

  const learningTemplates = {
  linux: {
    timeline: "5 Days",
    topics: ["Basic commands", "File system", "Permissions", "Processes", "Package management"],
    project: "Deploy a simple backend application on a Linux server",
    resources: [
      {
        title: "Linux Journey",
        type: "Free Tutorial",
        url: "https://linuxjourney.com/",
      },
      {
        title: "Ubuntu Server Documentation",
        type: "Official Docs",
        url: "https://documentation.ubuntu.com/server/",
      },
    ],
  },

  docker: {
    timeline: "7 Days",
    topics: ["Containers", "Images", "Dockerfile", "Docker Compose", "Docker Hub"],
    project: "Containerize a frontend or backend application",
    resources: [
      {
        title: "Docker Get Started",
        type: "Official Docs",
        url: "https://docs.docker.com/get-started/",
      },
      {
        title: "Docker Curriculum",
        type: "Free Tutorial",
        url: "https://docker-curriculum.com/",
      },
    ],
  },

  kubernetes: {
    timeline: "10 Days",
    topics: ["Pods", "Deployments", "Services", "ConfigMaps", "Basic scaling"],
    project: "Deploy a containerized app on a local Kubernetes cluster",
    resources: [
      {
        title: "Kubernetes Tutorials",
        type: "Official Docs",
        url: "https://kubernetes.io/docs/tutorials/",
      },
      {
        title: "Kubernetes Basics",
        type: "Official Tutorial",
        url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
      },
    ],
  },

  aws: {
    timeline: "10 Days",
    topics: ["IAM", "EC2", "S3", "CloudFront", "CloudWatch"],
    project: "Deploy a static website on S3 and CloudFront",
    resources: [
      {
        title: "AWS Skill Builder",
        type: "Official Learning",
        url: "https://skillbuilder.aws/",
      },
      {
        title: "AWS Training and Certification",
        type: "Official Training",
        url: "https://aws.amazon.com/training/",
      },
    ],
  },

  azure: {
    timeline: "10 Days",
    topics: ["Azure basics", "Resource Groups", "Virtual Machines", "Azure Storage", "Azure Monitor"],
    project: "Deploy a simple web application using Azure App Service or Azure Virtual Machine",
    resources: [
      {
        title: "Azure Documentation",
        type: "Official Docs",
        url: "https://learn.microsoft.com/en-us/azure/",
      },
      {
        title: "Microsoft Learn for Azure",
        type: "Official Learning",
        url: "https://learn.microsoft.com/en-us/training/azure/",
      },
    ],
  },

  "ci/cd": {
    timeline: "7 Days",
    topics: ["GitHub Actions", "Build pipeline", "Deployment pipeline", "Secrets", "Rollback basics"],
    project: "Create a CI/CD pipeline for automatic deployment",
    resources: [
      {
        title: "GitHub Actions Quickstart",
        type: "Official Docs",
        url: "https://docs.github.com/actions/get-started/quickstart",
      },
      {
        title: "GitHub Actions Documentation",
        type: "Official Docs",
        url: "https://docs.github.com/actions",
      },
    ],
  },

  terraform: {
    timeline: "8 Days",
    topics: ["Infrastructure as Code", "Providers", "Resources", "Variables", "State file"],
    project: "Provision an EC2 instance using Terraform",
    resources: [
      {
        title: "Terraform Tutorials",
        type: "Official Docs",
        url: "https://developer.hashicorp.com/terraform/tutorials",
      },
      {
        title: "Terraform AWS Provider",
        type: "Official Docs",
        url: "https://registry.terraform.io/providers/hashicorp/aws/latest/docs",
      },
    ],
  },

  python: {
    timeline: "7 Days",
    topics: ["Syntax", "Functions", "OOP basics", "File handling", "APIs"],
    project: "Build a resume text analyzer script",
    resources: [
      {
        title: "Python Official Tutorial",
        type: "Official Docs",
        url: "https://docs.python.org/3/tutorial/",
      },
      {
        title: "Python for Beginners",
        type: "Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/paths/beginner-python/",
      },
    ],
  },

  javascript: {
    timeline: "7 Days",
    topics: ["DOM", "ES6", "Fetch API", "Async/Await", "Modules"],
    project: "Build an interactive dashboard UI",
    resources: [
      {
        title: "MDN JavaScript Guide",
        type: "Official Reference",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
      },
      {
        title: "JavaScript.info",
        type: "Free Tutorial",
        url: "https://javascript.info/",
      },
    ],
  },

  react: {
    timeline: "8 Days",
    topics: ["Components", "Props", "State", "Hooks", "Routing"],
    project: "Build a resume analysis dashboard",
    resources: [
      {
        title: "React Learn",
        type: "Official Docs",
        url: "https://react.dev/learn",
      },
      {
        title: "Vite Guide",
        type: "Official Docs",
        url: "https://vite.dev/guide/",
      },
    ],
  },

  mongodb: {
    timeline: "5 Days",
    topics: ["Collections", "Documents", "CRUD", "Indexes", "Mongoose basics"],
    project: "Build a simple CRUD API using MongoDB",
    resources: [
      {
        title: "MongoDB University",
        type: "Official Learning",
        url: "https://learn.mongodb.com/",
      },
      {
        title: "Mongoose Docs",
        type: "Official Docs",
        url: "https://mongoosejs.com/docs/",
      },
    ],
  },

  node: {
    timeline: "7 Days",
    topics: ["Node.js basics", "npm", "Express.js", "REST APIs", "Middleware"],
    project: "Build a REST API using Node.js and Express",
    resources: [
      {
        title: "Node.js Learn",
        type: "Official Docs",
        url: "https://nodejs.org/en/learn",
      },
      {
        title: "Express Guide",
        type: "Official Docs",
        url: "https://expressjs.com/en/guide/routing.html",
      },
    ],
  },

  sql: {
    timeline: "6 Days",
    topics: ["SELECT queries", "Joins", "Aggregation", "Subqueries", "Indexes"],
    project: "Analyze placement data using SQL queries",
    resources: [
      {
        title: "SQLBolt",
        type: "Free Tutorial",
        url: "https://sqlbolt.com/",
      },
      {
        title: "Mode SQL Tutorial",
        type: "Free Tutorial",
        url: "https://mode.com/sql-tutorial/",
      },
    ],
  },

  git: {
    timeline: "4 Days",
    topics: ["Repositories", "Commits", "Branches", "Merge", "Pull Requests"],
    project: "Manage a project using Git branches and pull requests",
    resources: [
      {
        title: "Git Documentation",
        type: "Official Docs",
        url: "https://git-scm.com/doc",
      },
      {
        title: "GitHub Git Handbook",
        type: "Official Guide",
        url: "https://guides.github.com/introduction/git-handbook/",
      },
    ],
  },
};

  const getLearningPlan = (skill) => {
    const key = skill.toLowerCase();

    return learningTemplates[key] || {
  timeline: "5–7 Days",
  topics: [
    `Core concepts of ${skill}`,
    `Practical use cases of ${skill}`,
    `Beginner-level hands-on practice`,
    `Interview questions on ${skill}`,
  ],
  project: `Build a small project using ${skill}`,
  resources: [
    {
      title: `${skill} Official Documentation`,
      type: "Recommended",
      url: `https://www.google.com/search?q=${encodeURIComponent(skill + " official documentation")}`,
    },
    {
      title: `${skill} Beginner Tutorial`,
      type: "Recommended",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill + " beginner tutorial")}`,
    },
  ],
};
  };

  return (
    <div className="rounded-2xl border border-violet-500/10 bg-violet-500/[0.03] backdrop-blur-sm p-6 space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-xs font-semibold text-violet-300 uppercase tracking-widest">
            Personalized Learning Path
          </span>
        </div>

        <h3 className="text-lg font-bold text-white">
          Roadmap for {selectedRole}
        </h3>

        <p className="text-sm text-white/40 mt-1">
          Based on your missing skills, follow this roadmap to become more placement-ready.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {missingSkillList.map((skill, index) => {
          const plan = getLearningPlan(skill);

          return (
            <div
              key={skill}
              className="rounded-xl border border-white/5 bg-white/[0.03] p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Week {index + 1}: Learn {skill}
                  </p>
                  <p className="text-xs text-white/35 mt-1">
                    Estimated timeline: {plan.timeline}
                  </p>
                </div>

                <span className="px-2.5 py-1 rounded-full text-xs text-violet-200 bg-violet-500/10 border border-violet-500/20">
                  Priority {index + 1}
                </span>
              </div>

              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-2">
                  Topics to Cover
                </p>

                <div className="flex flex-wrap gap-2">
                  {plan.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2.5 py-1 rounded-lg text-xs text-white/60 bg-white/[0.04] border border-white/5"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-black/20 border border-white/5 p-3">
                <p className="text-xs text-white/35 mb-1">Mini Project</p>
                <p className="text-sm text-white/70">{plan.project}</p>
              </div>
              <div className="rounded-lg bg-black/20 border border-white/5 p-3">
                <p className="text-xs text-white/35 mb-2">Recommended Resources</p>

              <div className="space-y-2">
                {(plan.resources || []).map((resource) => (
                  <a
                    key={resource.title}
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-xs text-white/70 hover:text-violet-300 hover:border-violet-500/30 transition-all"
                  >
                    <span>{resource.title}</span>
                    <span className="text-white/30">{resource.type}</span>
                  </a>
                ))}
              </div>
            </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-white/30 leading-relaxed">
        This roadmap is generated from the missing skills found during role-based skill gap analysis.
      </p>
    </div>
  );
};

export default LearningPathCard;