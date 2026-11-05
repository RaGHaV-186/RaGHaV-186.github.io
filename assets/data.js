// =====================================================================
//  ALL content that changes lives here. Edit this file, push, done.
//  Anything written as "[like this]" shows up highlighted on the site
//  as a placeholder, so you can search for "[" and fill them in.
// =====================================================================
window.SITE = {
  // ---------- BOTTOM-UP: first-principles ML path ----------
  currentDay: 9,      // day of my 147-day plan I'm on; update by hand
  totalDays: 147,
  phases: [
    { name: "Math", from: 1, to: 21 },
    { name: "Classical ML", from: 22, to: 49 },
    { name: "Deep learning", from: 50, to: 77 },
    { name: "Transformers", from: 78, to: 98 },
    { name: "LLM engineering", from: 99, to: 119 },
    { name: "Production", from: 120, to: 133 },
    { name: "Interview prep", from: 134, to: 147 },
  ],
  explainers: [
    { day: 1, title: "Finding the centre", about: "Mean, median and mode, and when each one lies", href: "learn/day01-finding-the-centre.html" },
    { day: 2, title: "Measuring spread", about: "Standard deviation, why n − 1, z-scores, percentiles and outliers", href: "learn/day02-measuring-spread.html" },
    { day: 3, title: "Moving together", about: "Covariance, Pearson as a cosine, correlation vs causation, and Spearman", href: "learn/day03-moving-together.html" },
    { day: 4, title: "Counting chances", about: "Permutations vs combinations, at least one, inclusion–exclusion, shrink-the-room conditionals, independence and Monte Carlo", href: "learn/day04-counting-chances.html" },
    { day: 5, title: "Chance in numbers", about: "Bayes with natural frequencies, random variables, PMF and CDF, expected value, variance and the Bernoulli", href: "learn/day05-chance-in-numbers.html" },
    { day: 6, title: "What drives medical costs?", about: "Project: an EDA of 1,338 insurance records with predictions written first: skew, a hidden duplicate, masking, Pearson vs Spearman, Bayes on real data and the ECDF", href: "learn/day06-what-drives-medical-costs.html" },
    { day: 7, title: "Week one in ten questions", about: "Test: centre, spread, fences, masking, scaling, Spearman, causation, independence, Bayes and random variables, all from Days 1–5", href: "learn/day07-week-one-in-ten-questions.html" },
    { day: 8, title: "Six shapes of chance", about: "Bernoulli, Binomial, Poisson, Exponential, Uniform and Normal through one bakery: counting vs timing, memorylessness, overdispersion, the √n law and z-scores", href: "learn/day08-six-shapes-of-chance.html" },
  ],

  // ---------- TOP-DOWN: real products built with AI coding agents ----------
  // status: "planned" | "building" | "live"
  // decisions: the trade-offs you made — this is what recruiters read
  builds: [
    {
      name: "Behörden-Brief Helper",
      flagship: true,
      status: "planned",
      problem: "[one line: the problem this solves for people dealing with German official letters]",
      stack: ["[stack]"],
      decisions: ["[key architecture decision + why]"],
      links: [],
    },
    {
      name: "Support agent",
      flagship: true,
      status: "planned",
      problem: "[one line: who it supports and what it automates]",
      stack: ["[stack]"],
      decisions: ["[key architecture decision + why]"],
      links: [],
    },
    {
      name: "[AWS project name]",
      status: "planned",
      problem: "[a small, real problem deployed on AWS]",
      stack: ["AWS", "[services]"],
      decisions: [],
      links: [],
    },
    {
      name: "Job Radar v2",
      status: "planned",
      problem: "Upgrading my TF-IDF / BM25 / LSA job search engine. [what changes in v2]",
      stack: ["Python", "Streamlit"],
      decisions: [],
      links: [{ label: "v1 live", href: "https://raghav-student-job-radar.streamlit.app" }],
    },
    {
      name: "Eminem Lyrics GPT v2",
      status: "planned",
      problem: "Upgrading my from-scratch transformer service. [what changes in v2]",
      stack: ["PyTorch", "FastAPI", "Docker"],
      decisions: [],
      links: [{ label: "v1 API", href: "https://eminem-lyrics-api.onrender.com" }],
    },
  ],

  // ---------- RESEARCH ----------
  research: {
    title: "The AI software team: can a strong model supervise weaker agents?",
    question:
      "Cheap local LLM agents work as a software team (planner, designer, developer, tester, reviewer) while one strong head model only supervises. Can the supervisor catch wrong or misleading reports from the weaker agents, and how much oversight does it actually need?",
    belief: "Cheap models as workers with an expensive model only for monitoring can be both better and cheaper.",
    roles: ["Planner", "Designer", "Developer", "Tester", "Reviewer"],
    supervisor: "Head model (Claude via API)",
    stage: "[current stage, e.g. building the agent harness]",
    target: "Open-source release and a workshop submission, aiming before Feb 2027",
    links: [{ label: "Repo", href: "[add repo link]" }],
    log: [
      // newest first: { date: "2026-11-10", text: "What happened" },
      { date: "2026-10-23", text: "Started the project; defined roles and the oversight question." },
    ],
  },

  // ---------- SHIPPED PROJECTS ----------
  projects: [
    {
      name: "Deutsch mit Buddy",
      description: "An AI German-learning web app, live for real learners.",
      tech: ["[stack]"],
      links: [{ label: "Live", href: "https://deutschmitbuddy.de" }],
    },
    {
      name: "Eminem Lyrics GPT",
      description: "A 6-layer, 8-head transformer trained in PyTorch on lyrics (validation loss about 1.52), served via FastAPI in Docker.",
      tech: ["PyTorch", "FastAPI", "Docker", "Render"],
      links: [
        { label: "Live API", href: "https://eminem-lyrics-api.onrender.com" },
        { label: "Code", href: "[add repo link]" },
      ],
    },
    {
      name: "Job Radar",
      description: "A job search engine comparing TF-IDF, BM25 and LSA retrieval, measured with a hand-labelled evaluation set.",
      tech: ["Python", "Streamlit", "IR"],
      links: [
        { label: "Live App", href: "https://raghav-student-job-radar.streamlit.app" },
        { label: "Code", href: "[add repo link]" },
      ],
    },
    {
      name: "nano-GPT, micrograd & makemore",
      description: "GPT, an autograd engine and character-level language models rebuilt from scratch, including a micrograd MNIST classifier without PyTorch.",
      tech: ["Python", "Autograd", "Language models"],
      links: [
        { label: "nano-GPT", href: "https://github.com/RaGHaV-186/nano-gpt" },
        { label: "micrograd", href: "https://github.com/RaGHaV-186/micro_grad" },
        { label: "makemore", href: "https://github.com/RaGHaV-186/makemore" },
      ],
    },
    {
      name: "ML from scratch",
      description: "Every algorithm in the path implemented from first principles and checked against NumPy, SciPy and scikit-learn.",
      tech: ["Python", "NumPy", "pytest"],
      links: [{ label: "GitHub", href: "https://github.com/RaGHaV-186/ml-from-scratch" }],
    },
    {
      name: "Filmhaus",
      description: "Four movie recommenders compared on Precision@10 and catalogue coverage.",
      tech: ["Python", "Streamlit"],
      links: [
        { label: "Live", href: "[add link]" },
        { label: "Code", href: "[add repo link]" },
      ],
    },
    {
      name: "Deutsche Coach",
      description: "A German writing practice app that grades answers by meaning.",
      tech: ["FastAPI", "React", "PostgreSQL"],
      links: [
        { label: "Live", href: "[add link]" },
        { label: "Code", href: "[add repo link]" },
      ],
    },
    {
      name: "HireKahani (co-founder)",
      description: "A platform where candidates share real interview experiences.",
      tech: ["React", "Node.js"],
      links: [{ label: "Website", href: "https://hirekahani.in" }],
    },
  ],

  links: {
    email: "raghavbandreddi@gmail.com",
    github: "https://github.com/RaGHaV-186",
    linkedin: "https://www.linkedin.com/in/raghav-bandreddi-035261398",
    cv: "[add CV link]",
  },
};
