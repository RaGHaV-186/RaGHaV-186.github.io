# Raghav Bandreddi — portfolio (`raghav-186.github.io`)

Zero-build site: plain HTML, CSS and JavaScript on GitHub Pages. Dark, keyboard-first design
(`⌘K` command menu, `0–7` jump to sections, `j`/`k` next/prev, `e` explainers, `?` help).

## Structure

```text
index.html            home: hero, now, bottom-up, top-down, research, projects, experience, contact
learn/index.html      list of all explainers
learn/dayXX-*.html    the interactive explainers (use assets/style.css, unchanged)
assets/data.js        ALL content that changes  ← you edit this
assets/site.css       styles for home + explainer list
assets/site.js        renders data.js, command menu, keyboard shortcuts
assets/style.css      styles for the explainer pages
```

## Everyday updates (only `assets/data.js`)

- **Closed a day?** bump `currentDay`.
- **New explainer?** add the file to `learn/` and one line to `explainers`.
- **Top-down build progress?** change a build's `status` (`planned` → `building` → `live`),
  fill in `problem`, `stack`, `decisions` and `links`. Decisions are what recruiters read: write the trade-off and why.
- **Research progress?** update `research.stage` and add a line at the top of `research.log`.
- **New shipped project?** copy an entry in `projects`.
- **CV?** set `links.cv`.

Anything written as `[like this]` shows up as a red placeholder on the site. Search for `[` to find them all.

## Preview locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Publish

```bash
git add -A && git commit -m "Update site" && git push
```
