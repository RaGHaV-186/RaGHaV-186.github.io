/*
  Everything you update regularly lives in this one file.
  - Close a day?           -> change currentDay
  - Published an explainer? -> add one line to explainers
  - New project?           -> add one entry to projects
  Text in [square brackets] is a placeholder: replace it or delete the line.
*/
window.SITE = {
  currentDay: 5,          // the plan day you're on (1–147)
  totalDays: 147,

  phases: [
    { name: "Math",            from: 1,   to: 21  },
    { name: "Classical ML",    from: 22,  to: 49  },
    { name: "Deep learning",   from: 50,  to: 77  },
    { name: "Transformers",    from: 78,  to: 98  },
    { name: "LLM engineering", from: 99,  to: 119 },
    { name: "Production",      from: 120, to: 133 },
    { name: "Interview prep",  from: 134, to: 147 },
  ],

  // newest last; the site shows them newest first
  explainers: [
    { day: 1, title: "Finding the centre", about: "Mean, median and mode, and when each one lies", href: "learn/day01-finding-the-centre.html" },
  ],

  projects: [
    {
      name: "ML from scratch",
      what: "Every algorithm in a 21-week machine learning path, implemented from first principles and checked against NumPy, SciPy and scikit-learn.",
      tech: "Python, NumPy, pytest",
      links: [["Code", "https://github.com/RaGHaV-186/ml-from-scratch"]],
    },
    {
      name: "Eminem Lyrics GPT",
      what: "A 6-layer, 8-head transformer trained in PyTorch on lyrics (validation loss about 1.52), served through a FastAPI endpoint in Docker.",
      tech: "PyTorch, FastAPI, Docker, Render",
      links: [["Live API", "https://eminem-lyrics-api.onrender.com"], ["Code", "[add repo link]"]],
    },
    {
      name: "Job Radar",
      what: "A job search engine comparing TF-IDF, BM25 and LSA retrieval, measured with a hand-labelled evaluation set.",
      tech: "Python, Streamlit",
      links: [["Live app", "https://raghav-student-job-radar.streamlit.app"], ["Code", "[add repo link]"]],
    },
    {
      name: "Filmhaus",
      what: "Four movie recommenders compared on Precision@10 and catalogue coverage.",
      tech: "Python, Streamlit",
      links: [["Live app", "[add link]"], ["Code", "[add repo link]"]],
    },
    {
      name: "Deutsche Coach",
      what: "A German writing practice app that grades answers by meaning, not exact wording.",
      tech: "FastAPI, React, PostgreSQL",
      links: [["Live app", "[add link]"], ["Code", "[add repo link]"]],
    },
    {
      name: "nano-GPT, micrograd and makemore",
      what: "GPT, an autograd engine and character-level language models rebuilt from scratch, including a micrograd MNIST classifier without PyTorch.",
      tech: "Python, PyTorch",
      links: [["nano-GPT", "https://github.com/RaGHaV-186/nano-gpt"], ["micrograd", "https://github.com/RaGHaV-186/micro_grad"], ["makemore", "https://github.com/RaGHaV-186/makemore"]],
    },
    {
      name: "HireKahani",
      what: "Co-founded a platform where candidates share real interview experiences.",
      tech: "React, Node.js",
      links: [["Website", "https://hirekahani.in"]],
    },
  ],
};
