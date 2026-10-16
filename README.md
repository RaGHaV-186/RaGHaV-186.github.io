# Raghav Bandreddi — Personal Portfolio & 147-Day ML Explainer Site (`RaGHaV-186.github.io`)

A zero-build, first-principles Machine Learning portfolio and interactive visual explanation studio built with plain HTML, CSS, and JavaScript.

## Repository Structure

```text
index.html                         home page
assets/style.css                   shared styles (light + dark themes, responsive layout)
assets/data.js                     ALL content that changes: current day, explainer list, projects
learn/index.html                   list of all explainer pages, generated from data.js
learn/day01-finding-the-centre.html   first explainer page
README.md                          how to update the site
.nojekyll                          tells GitHub Pages to serve files directly without Jekyll
```

## Everyday updates (only `assets/data.js`)

- **Closed a day?** Change `currentDay` to the new day number.
- **New explainer page?** Put the file in `learn/` (e.g. `learn/day02-measuring-spread.html`) and add one line to `explainers`:
  ```js
  { day: 2, title: "Measuring spread", about: "Variance, percentiles and outliers", href: "learn/day02-measuring-spread.html" },
  ```
  It then appears on the home page, on `learn/index.html`, and in the 147-day path.
- **New project?** Copy one entry in `projects` and edit it. Links look like `{ label: "Code", href: "https://..." }`.

## Placeholders

Anything in `[square brackets]` is a placeholder and is highlighted on the page. Search the files for `[` and replace each one.

## Publish

```bash
git add -A
git commit -m "Update site"
git push
```

GitHub Pages republishes within a minute or two.

## Preview locally

```bash
python3 -m http.server 8000
```
Then open http://localhost:8000.
