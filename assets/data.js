window.SITE = {
  currentDay: 5,      // day of my 147-day plan I'm on; I update this by hand
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
  ],
  projects: [
    {
      name: "ML from scratch",
      description: "Every algorithm in a 21-week ML path implemented from first principles and checked against NumPy, SciPy and scikit-learn.",
      tech: ["Python", "NumPy", "pytest"],
      links: [
        { label: "GitHub", href: "https://github.com/RaGHaV-186/ml-from-scratch" }
      ]
    },
    {
      name: "Eminem Lyrics GPT",
      description: "A 6-layer, 8-head transformer trained in PyTorch on lyrics (validation loss about 1.52), served via FastAPI in Docker.",
      tech: ["PyTorch", "FastAPI", "Docker", "Render"],
      links: [
        { label: "Live API", href: "https://eminem-lyrics-api.onrender.com" },
        { label: "Code", href: "[add repo link]", placeholder: true }
      ]
    },
    {
      name: "Job Radar",
      description: "A job search engine comparing TF-IDF, BM25 and LSA retrieval, measured with a hand-labelled evaluation set.",
      tech: ["Python", "Streamlit"],
      links: [
        { label: "Live App", href: "https://raghav-student-job-radar.streamlit.app" },
        { label: "Code", href: "[add repo link]", placeholder: true }
      ]
    },
    {
      name: "Filmhaus",
      description: "Four movie recommenders compared on Precision@10 and catalogue coverage.",
      tech: ["Python", "Streamlit"],
      links: [
        { label: "Live", href: "[add link]", placeholder: true },
        { label: "Code", href: "[add repo link]", placeholder: true }
      ]
    },
    {
      name: "Deutsche Coach",
      description: "A German writing practice app that grades answers by meaning.",
      tech: ["FastAPI", "React", "PostgreSQL"],
      links: [
        { label: "Live", href: "[add link]", placeholder: true },
        { label: "Code", href: "[add repo link]", placeholder: true }
      ]
    },
    {
      name: "nano-GPT, micrograd and makemore",
      description: "GPT, an autograd engine and character-level language models rebuilt from scratch, including a micrograd MNIST classifier without PyTorch.",
      tech: ["Python", "Autograd", "Language Models"],
      links: [
        { label: "nano-GPT", href: "https://github.com/RaGHaV-186/nano-gpt" },
        { label: "micrograd", href: "https://github.com/RaGHaV-186/micro_grad" },
        { label: "makemore", href: "https://github.com/RaGHaV-186/makemore" }
      ]
    },
    {
      name: "HireKahani (co-founder)",
      description: "A platform where candidates share real interview experiences.",
      tech: ["React", "Node.js"],
      links: [
        { label: "Website", href: "https://hirekahani.in" }
      ]
    }
  ],
};
