# raghav-186.github.io

My portfolio and the home of my "Explained" pages.

## Folder layout

```
index.html            home page
assets/site.css       shared styles (colours, fonts, layout)
assets/data.js        everything that changes: current day, explainers, projects
learn/index.html      list of all explainer pages (built automatically from data.js)
learn/dayNN-*.html    one file per explainer page
.nojekyll             tells GitHub Pages to serve files as they are
```

## Everyday updates (only `assets/data.js`)

**Closed a day?** Change `currentDay: 5` to the new day. The path grid on the home page updates itself.

**New explainer page?**
1. Put the file in `learn/`, named `dayNN-short-title.html` (e.g. `learn/day02-measuring-spread.html`).
2. Add one line to `explainers` in `assets/data.js`:
   ```js
   { day: 2, title: "Measuring spread", about: "Variance, percentiles and outliers", href: "learn/day02-measuring-spread.html" },
   ```
3. Commit and push. It appears on the home page, on `/learn/`, and as a teal square in the path grid.

**New project?** Copy one entry in `projects` and change the text. Links are `["Label", "https://..."]`.

## Placeholders

Anything in `[square brackets]` is a placeholder and shows up highlighted in yellow on the site. Search the files for `[` and replace or delete each one. In particular:
- `index.html`: CV link, research stage, job descriptions, HireKahani years, skills, English level
- `assets/data.js`: repo and app links for some projects

**CV:** put your PDF at `assets/raghav-bandreddi-cv.pdf` and set the Download CV button's link to `assets/raghav-bandreddi-cv.pdf`.

## Publishing (replacing the old site)

Your site lives in the repo `RaGHaV-186/RaGHaV-186.github.io`. Keep the old site in a branch first, so nothing is lost:

```bash
git clone https://github.com/RaGHaV-186/RaGHaV-186.github.io.git
cd RaGHaV-186.github.io
git checkout -b old-site && git push -u origin old-site   # backup of the old site
git checkout main                                       # or master, whichever your default branch is

# delete the old files, copy in the new ones (this folder's contents), then:
git add -A
git commit -m "New portfolio site"
git push
```

GitHub Pages republishes within a minute or two at https://raghav-186.github.io.

## Preview locally

```bash
python3 -m http.server 8000
```
Then open http://localhost:8000.
