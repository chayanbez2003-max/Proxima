import { motion } from "framer-motion";

// ── Skill category colour map ─────────────────────────────────────────────────
const CATEGORY_COLORS = {
  programmingLanguages: "indigo",
  frontend:             "violet",
  backend:              "cyan",
  database:             "emerald",
  cloud:                "sky",
  devops:               "orange",
  tools:                "pink",
  testing:              "amber",
  aiMl:                 "rose",
};

const TAILWIND_BADGES = {
  indigo:  "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  violet:  "bg-violet-500/10 text-violet-300 border-violet-500/20",
  cyan:    "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  sky:     "bg-sky-500/10 text-sky-300 border-sky-500/20",
  orange:  "bg-orange-500/10 text-orange-300 border-orange-500/20",
  pink:    "bg-pink-500/10 text-pink-300 border-pink-500/20",
  amber:   "bg-amber-500/10 text-amber-300 border-amber-500/20",
  rose:    "bg-rose-500/10 text-rose-300 border-rose-500/20",
};

// ── Sub-components ────────────────────────────────────────────────────────────

const InfoRow = ({ icon, label, value, href }) => {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-white/30 w-4 flex-shrink-0">{icon}</span>
      <span className="text-white/40 w-20 flex-shrink-0">{label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 truncate max-w-[220px] transition-colors"
        >
          {value}
        </a>
      ) : (
        <span className="text-white/80 truncate max-w-[220px]">{value}</span>
      )}
    </div>
  );
};

const SectionTitle = ({ children }) => (
  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
    {children}
  </h3>
);

const SkillBadge = ({ skill, color = "indigo" }) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${TAILWIND_BADGES[color] || TAILWIND_BADGES.indigo}`}
  >
    {skill}
  </span>
);

// ── Main component ────────────────────────────────────────────────────────────

/**
 * ResumeCard
 *
 * Displays the parsed resume data returned by the M2 backend.
 * Rendered below the upload card when `result` is non-null.
 *
 * @param {Object} result - The full parsed payload from useResumeUpload
 */
const ResumeCard = ({ result, compact = false }) => {
  if (!result) return null;

  const {
    candidateName, email, phone, github, linkedin, location,
    education, experience, skills,
  } = result;

  // Count populated skill categories
  const populatedCategories = Object.entries(skills || {}).filter(
    ([, arr]) => arr && arr.length > 0
  );

  const totalSkills = populatedCategories.reduce(
    (sum, [, arr]) => sum + arr.length, 0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className={compact ? "w-full space-y-4" : "w-full max-w-lg space-y-4 mt-6"}
    >
      {/* ── Header badge ─────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-emerald-300 uppercase tracking-widest">
            Resume Parsed Successfully
          </span>
        </div>
        {totalSkills > 0 && (
          <span className="text-xs text-white/30">
            {totalSkills} skill{totalSkills !== 1 ? "s" : ""} detected
          </span>
        )}
      </div>

      {/* ── Contact card ─────────────────────────────────────── */}
      <div className="rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-6 space-y-5">

        {/* Candidate name */}
        {candidateName && (
          <div>
            <p className="text-xl font-bold text-white">{candidateName}</p>
            {location && (
              <p className="text-sm text-white/40 mt-0.5">📍 {location}</p>
            )}
          </div>
        )}

        {/* Contact rows */}
        <div className="space-y-2.5">
          <SectionTitle>Contact</SectionTitle>
          <InfoRow icon="✉" label="Email"    value={email}    href={email ? `mailto:${email}` : null} />
          <InfoRow icon="📞" label="Phone"    value={phone} />
          <InfoRow icon="💼" label="LinkedIn" value={linkedin}
            href={linkedin?.startsWith("http") ? linkedin : linkedin ? `https://${linkedin}` : null} />
          <InfoRow icon="🐙" label="GitHub"   value={github}
            href={github?.startsWith("http") ? github : github ? `https://${github}` : null} />
        </div>

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-2">
              {education.slice(0, 3).map((edu, i) => (
                <div key={i} className="rounded-xl bg-white/[0.02] border border-white/5 p-3">
                  <p className="text-sm font-medium text-white/80">{edu.institution}</p>
                  {edu.degree && (
                    <p className="text-xs text-white/40 mt-0.5">{edu.degree}</p>
                  )}
                  <div className="flex gap-3 mt-1">
                    {edu.year && (
                      <span className="text-xs text-white/30">{edu.year}</span>
                    )}
                    {edu.gpa && (
                      <span className="text-xs text-white/30">GPA: {edu.gpa}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-2">
              {experience.slice(0, 3).map((exp, i) => (
                <div key={i} className="rounded-xl bg-white/[0.02] border border-white/5 p-3">
                  <p className="text-sm font-medium text-white/80">{exp.company}</p>
                  {exp.title && (
                    <p className="text-xs text-white/50 mt-0.5">{exp.title}</p>
                  )}
                  {exp.duration && (
                    <p className="text-xs text-white/30 mt-1">{exp.duration}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {populatedCategories.length > 0 && (
          <div>
            <SectionTitle>Detected Skills</SectionTitle>
            <div className="space-y-3">
              {populatedCategories.map(([category, skillList]) => {
                const color = CATEGORY_COLORS[category] || "indigo";
                const label = CATEGORY_LABELS_CLIENT[category] || category;
                return (
                  <div key={category}>
                    <p className="text-xs text-white/30 mb-1.5">{label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skillList.map((skill) => (
                        <SkillBadge key={skill} skill={skill} color={color} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!candidateName && !email && populatedCategories.length === 0 && (
          <p className="text-sm text-white/30 text-center py-2">
            Limited information extracted. The PDF may be image-based or have non-standard formatting.
          </p>
        )}
      </div>
    </motion.div>
  );
};

// ── Category labels (client-side copy — avoids server import) ─────────────────
const CATEGORY_LABELS_CLIENT = {
  programmingLanguages: "Programming Languages",
  frontend:             "Frontend",
  backend:              "Backend",
  database:             "Databases",
  cloud:                "Cloud",
  devops:               "DevOps",
  tools:                "Tools & IDEs",
  testing:              "Testing",
  aiMl:                 "AI / ML",
};

export default ResumeCard;
