// site.js — renders content from data.js and adds keyboard navigation.
(function () {
  "use strict";
  var S = window.SITE || {};
  var BASE = document.documentElement.getAttribute("data-base") || ""; // "" on home, "../" in /learn

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  // escape text, then highlight [placeholders]
  function txt(s) {
    return esc(s).replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>');
  }
  function isPh(s) { return /^\[.*\]$/.test(String(s || "").trim()); }
  function href(h) {
    if (!h) return "#";
    if (/^(https?:|mailto:|#)/.test(h)) return h;
    return BASE + h;
  }
  function linkHtml(l) {
    if (isPh(l.href)) return '<span>' + esc(l.label) + ': <span class="ph">' + esc(l.href) + "</span></span>";
    var ext = /^https?:/.test(l.href);
    return '<a href="' + esc(href(l.href)) + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + esc(l.label) + " ↗</a>";
  }
  function $(id) { return document.getElementById(id); }
  var explainers = (S.explainers || []).slice().sort(function (a, b) { return a.day - b.day; });
  var byDay = {};
  explainers.forEach(function (e) { byDay[e.day] = e; });
  var phase = (S.phases || []).find(function (p) { return S.currentDay >= p.from && S.currentDay <= p.to; }) || (S.phases || [])[0] || { name: "", from: 1, to: 1 };
  var pct = S.totalDays ? Math.round((S.currentDay / S.totalDays) * 100) : 0;
  var statusTag = {
    planned: '<span class="tag">planned</span>',
    building: '<span class="tag tag-amber">● building</span>',
    live: '<span class="tag tag-green">● live</span>',
  };

  // ---------- hero terminal ----------
  var term = $("term-body");
  if (term) {
    var builds = S.builds || [];
    var active = builds.find(function (b) { return b.status === "building"; }) || builds.find(function (b) { return b.flagship; }) || builds[0];
    var research = S.research || {};
    var lines = [
      { cmd: "whoami" },
      { out: '<span class="val">raghav bandreddi</span> <span class="dim">— AI engineer in training, Bielefeld 🇩🇪</span>' },
      { cmd: "cat now.yaml" },
      { out: '<span class="key">study:</span>    <span class="val">M.Sc. AI &amp; Data Science @ HFU</span>' },
      { out: '<span class="key">bottom_up:</span> <span class="amb">day ' + esc(S.currentDay) + "/" + esc(S.totalDays) + "</span> <span class=\"dim\"># " + esc(phase.name) + "</span>" },
      { out: '<span class="key">top_down:</span>  <span class="val">' + txt(active ? active.name : "—") + "</span> <span class=\"dim\"># " + esc(active ? active.status : "") + "</span>" },
      { out: '<span class="key">research:</span>  <span class="val">AI software team</span> <span class="dim"># supervisor oversight</span>' },
      { out: '<span class="key">open_to:</span>   <span class="val">AI/ML Werkstudent · thesis internship</span>' },
      { cmd: 'echo $PHILOSOPHY' },
      { out: '<span class="o">derive it, build it, ship it, explain it.</span>' },
    ];
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function lineHtml(l, typed) {
      if (l.cmd != null) return '<div class="term-line"><span class="p">~ $</span> <span class="c">' + esc(typed != null ? typed : l.cmd) + "</span></div>";
      return '<div class="term-line o">' + l.out + "</div>";
    }
    if (reduce) {
      term.innerHTML = lines.map(function (l) { return lineHtml(l); }).join("") + '<div class="term-line"><span class="p">~ $</span> <span class="brand-cursor"></span></div>';
    } else {
      var html = "", i = 0;
      (function next() {
        if (i >= lines.length) { term.innerHTML = html + '<div class="term-line"><span class="p">~ $</span> <span class="brand-cursor"></span></div>'; return; }
        var l = lines[i++];
        if (l.cmd == null) { html += lineHtml(l); term.innerHTML = html; return setTimeout(next, 70); }
        var c = 0;
        (function type() {
          term.innerHTML = html + lineHtml(l, l.cmd.slice(0, c)) ;
          if (c++ < l.cmd.length) return setTimeout(type, 38);
          html += lineHtml(l); setTimeout(next, 220);
        })();
      })();
    }
  }

  // ---------- now: three tracks ----------
  var tracks = $("tracks");
  if (tracks) {
    var b = (S.builds || []);
    var live = b.filter(function (x) { return x.status === "live"; }).length;
    var r = S.research || {};
    tracks.innerHTML =
      '<article class="card track" style="--c:var(--green)">' +
        '<div class="track-top"><span class="tag tag-green">bottom-up</span><span class="num">01</span></div>' +
        "<h3>First-principles ML</h3>" +
        "<p>Every formula derived, every model written by hand, then explained in an interactive article.</p>" +
        '<div class="now-line"><span class="dim">now →</span> day ' + esc(S.currentDay) + " of " + esc(S.totalDays) + " · " + esc(phase.name) + "</div>" +
        '<div class="bar"><span style="width:' + pct + '%"></span></div>' +
        '<a class="go" href="#bottom-up">cd ~/bottom-up →</a>' +
      "</article>" +
      '<article class="card track" style="--c:var(--amber)">' +
        '<div class="track-top"><span class="tag tag-amber">top-down</span><span class="num">02</span></div>' +
        "<h3>Real products, built with agents</h3>" +
        "<p>Real problems shipped with AI coding agents. I own the architecture, review every line and deploy it live.</p>" +
        '<div class="now-line"><span class="dim">now →</span> ' + b.length + " builds · " + live + " live</div>" +
        '<div class="bar"><span style="width:' + (b.length ? Math.round(live / b.length * 100) : 0) + '%"></span></div>' +
        '<a class="go" href="#top-down">cd ~/top-down →</a>' +
      "</article>" +
      '<article class="card track" style="--c:var(--violet)">' +
        '<div class="track-top"><span class="tag tag-violet">research</span><span class="num">03</span></div>' +
        "<h3>Scalable oversight</h3>" +
        "<p>Can one strong model reliably supervise a team of cheap local agents?</p>" +
        '<div class="now-line"><span class="dim">now →</span> ' + txt(r.stage || "—") + "</div>" +
        '<a class="go" href="#research">cd ~/research →</a>' +
      "</article>";
  }

  // ---------- bottom-up path ----------
  var phasesEl = $("phases");
  var insp = $("inspector");
  function inspect(d, pname) {
    if (!insp) return;
    var e = byDay[d];
    var st = d < S.currentDay ? "completed" : d === S.currentDay ? "today" : "upcoming";
    insp.innerHTML =
      '<div class="day">day ' + d + " · " + esc(pname) + " · " + st + "</div>" +
      (e
        ? '<div class="t">' + esc(e.title) + '</div><div class="a">' + esc(e.about) + '</div><a class="go" style="display:block;margin-top:10px" href="' + esc(href(e.href)) + '">open explainer →</a>'
        : '<div class="a" style="margin-top:6px">' + (st === "upcoming" ? "Not reached yet." : "Study day, no explainer published.") + "</div>");
  }
  if (phasesEl) {
    phasesEl.innerHTML = "";
    (S.phases || []).forEach(function (p) {
      var cur = S.currentDay >= p.from && S.currentDay <= p.to;
      var row = document.createElement("div");
      row.className = "phase-row";
      var done = Math.max(0, Math.min(p.to - p.from + 1, S.currentDay - p.from));
      row.innerHTML = '<div class="phase-name' + (cur ? " current" : "") + '">' + esc(p.name) + "<small>days " + p.from + "–" + p.to + " · " + done + "/" + (p.to - p.from + 1) + "</small></div>";
      var cells = document.createElement("div");
      cells.className = "cells";
      for (var d = p.from; d <= p.to; d++) {
        var e = byDay[d];
        var el = document.createElement(e ? "a" : "button");
        var cls = "cell" + (d < S.currentDay ? " done" : "") + (d === S.currentDay ? " today" : "") + (e ? " exp" : "");
        el.className = cls;
        el.textContent = d;
        el.setAttribute("aria-label", "Day " + d + (e ? ": " + e.title : ""));
        if (e) el.href = href(e.href); else el.type = "button";
        (function (dd, pn) {
          el.addEventListener("mouseenter", function () { inspect(dd, pn); });
          el.addEventListener("focus", function () { inspect(dd, pn); });
          el.addEventListener("click", function () { inspect(dd, pn); });
        })(d, p.name);
        cells.appendChild(el);
      }
      row.appendChild(cells);
      phasesEl.appendChild(row);
    });
    inspect(S.currentDay, phase.name);
    var stats = $("path-stats");
    if (stats) stats.innerHTML =
      '<div class="stat"><b>' + S.currentDay + '</b><span>day</span></div>' +
      '<div class="stat"><b>' + pct + '%</b><span>done</span></div>' +
      '<div class="stat"><b>' + explainers.length + '</b><span>explainers</span></div>' +
      '<div class="stat"><b>' + (S.phases || []).length + '</b><span>phases</span></div>';
  }

  function explainerCard(e) {
    return '<a class="card explainer" href="' + esc(href(e.href)) + '">' +
      '<div class="meta">day ' + String(e.day).padStart(2, "0") + "</div>" +
      "<h3>" + esc(e.title) + "</h3><p>" + esc(e.about) + '</p><span class="go">read →</span></a>';
  }
  var latest = $("latest-explainers");
  if (latest) latest.innerHTML = explainers.slice().reverse().slice(0, 3).map(explainerCard).join("");
  var all = $("all-explainers");
  if (all) all.innerHTML = explainers.slice().reverse().map(explainerCard).join("");

  // ---------- top-down builds ----------
  var buildsEl = $("builds");
  if (buildsEl) {
    buildsEl.innerHTML = (S.builds || []).map(function (b) {
      var dec = (b.decisions || []).filter(Boolean);
      return '<article class="card build' + (b.flagship ? " flagship" : "") + '">' +
        '<div class="build-top">' + (statusTag[b.status] || statusTag.planned) + (b.flagship ? ' <span class="tag tag-amber">flagship</span>' : "") + "</div>" +
        "<h3>" + txt(b.name) + "</h3>" +
        "<p>" + txt(b.problem) + "</p>" +
        (dec.length ? '<div><div class="decisions-label">decisions</div><ul class="decisions">' + dec.map(function (d) { return "<li>" + txt(d) + "</li>"; }).join("") + "</ul></div>" : "") +
        '<div class="chips">' + (b.stack || []).map(function (t) { return '<span class="chip">' + txt(t) + "</span>"; }).join("") + "</div>" +
        ((b.links || []).length ? '<div class="links">' + b.links.map(linkHtml).join("") + "</div>" : "") +
        "</article>";
    }).join("");
  }

  // ---------- research ----------
  var r = S.research;
  if (r && $("research-q")) {
    $("research-title").innerHTML = txt(r.title);
    $("research-q").innerHTML = txt(r.question);
    $("research-kv").innerHTML =
      "<dt>belief</dt><dd>" + txt(r.belief) + "</dd>" +
      "<dt>stage</dt><dd>" + txt(r.stage) + "</dd>" +
      "<dt>target</dt><dd>" + txt(r.target) + "</dd>" +
      "<dt>links</dt><dd class=\"links\" style=\"margin:0\">" + (r.links || []).map(linkHtml).join("") + "</dd>";
    $("research-log").innerHTML = (r.log || []).map(function (l) {
      return "<li><time>" + esc(l.date) + "</time><span>" + txt(l.text) + "</span></li>";
    }).join("");
    // diagram: supervisor above five worker agents
    var roles = r.roles || [];
    var W = 520, H = 250, n = roles.length || 1, gap = W / n;
    var svg = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Diagram: one supervisor model overseeing ' + n + ' local worker agents">';
    svg += '<rect x="150" y="14" width="220" height="50" rx="8" fill="rgba(196,167,255,0.12)" stroke="#c4a7ff"/>';
    svg += '<text x="260" y="36" text-anchor="middle" fill="#e7eaee" font-family="JetBrains Mono, monospace" font-size="13" font-weight="600">supervisor</text>';
    svg += '<text x="260" y="54" text-anchor="middle" fill="#7d8694" font-family="JetBrains Mono, monospace" font-size="10.5">' + esc(r.supervisor) + "</text>";
    roles.forEach(function (role, i) {
      var cx = gap * i + gap / 2;
      svg += '<path d="M260 64 C260 110 ' + cx + " 110 " + cx + ' 162" stroke="#303844" stroke-width="1.5" fill="none" stroke-dasharray="4 4"/>';
      svg += '<rect x="' + (cx - 46) + '" y="162" width="92" height="40" rx="7" fill="#13171c" stroke="#303844"/>';
      svg += '<text x="' + cx + '" y="186" text-anchor="middle" fill="#b4bcc8" font-family="JetBrains Mono, monospace" font-size="11.5">' + esc(role.toLowerCase()) + "</text>";
    });
    svg += '<text x="260" y="232" text-anchor="middle" fill="#7d8694" font-family="JetBrains Mono, monospace" font-size="10.5">cheap local LLM agents · reports flow up, oversight flows down</text>';
    svg += "</svg>";
    $("research-diagram").innerHTML = svg;
  }

  // ---------- projects ----------
  var proj = $("projects-grid");
  if (proj) {
    proj.innerHTML = (S.projects || []).map(function (p) {
      return '<article class="card project hoverable"><h3>' + txt(p.name) + "</h3><p>" + txt(p.description) + "</p>" +
        '<div class="chips">' + (p.tech || []).map(function (t) { return '<span class="chip">' + txt(t) + "</span>"; }).join("") + "</div>" +
        '<div class="links">' + (p.links || []).map(linkHtml).join("") + "</div></article>";
    }).join("");
  }

  // ---------- CV link ----------
  document.querySelectorAll("[data-cv]").forEach(function (el) {
    var cv = (S.links || {}).cv;
    if (!cv || isPh(cv)) { el.outerHTML = '<span class="btn">CV <span class="ph">' + esc(cv || "[add CV link]") + "</span></span>"; }
    else { el.href = cv; }
  });
  document.querySelectorAll("[data-ph]").forEach(function (el) { el.innerHTML = txt(el.textContent); });

  // ---------- command palette ----------
  var items = [
    { g: "go", t: "Home", h: BASE + "index.html#top", k: "0" },
    { g: "go", t: "Now: what I'm working on", h: BASE + "index.html#now", k: "1" },
    { g: "go", t: "Bottom-up: 147-day ML path", h: BASE + "index.html#bottom-up", k: "2" },
    { g: "go", t: "Top-down: builds", h: BASE + "index.html#top-down", k: "3" },
    { g: "go", t: "Research: AI software team", h: BASE + "index.html#research", k: "4" },
    { g: "go", t: "Projects", h: BASE + "index.html#projects", k: "5" },
    { g: "go", t: "Experience & skills", h: BASE + "index.html#experience", k: "6" },
    { g: "go", t: "Contact", h: BASE + "index.html#contact", k: "7" },
    { g: "go", t: "All explainers", h: BASE + "learn/index.html" },
  ];
  explainers.slice().reverse().forEach(function (e) { items.push({ g: "day " + e.day, t: e.title, h: href(e.href) }); });
  (S.projects || []).forEach(function (p) {
    var l = (p.links || []).find(function (x) { return !isPh(x.href); });
    if (l) items.push({ g: "project", t: p.name, h: l.href, ext: /^https?:/.test(l.href) });
  });
  var L = S.links || {};
  items.push({ g: "link", t: "GitHub", h: L.github, ext: true });
  items.push({ g: "link", t: "LinkedIn", h: L.linkedin, ext: true });
  items.push({ g: "link", t: "Email me", h: "mailto:" + L.email });
  items.push({ g: "action", t: "Copy email address", act: function () { try { navigator.clipboard.writeText(L.email); } catch (e) {} } });

  var back = document.createElement("div");
  back.className = "cmdk-backdrop";
  back.innerHTML = '<div class="cmdk" role="dialog" aria-modal="true" aria-label="Command menu"><input type="text" placeholder="Type a command or search…" aria-label="Search" autocomplete="off" spellcheck="false"/><ul role="listbox"></ul><div class="foot"><span><kbd>↑</kbd> <kbd>↓</kbd> move</span><span><kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span></div></div>';
  document.body.appendChild(back);
  var input = back.querySelector("input"), list = back.querySelector("ul"), sel = 0, shown = [];
  function render() {
    var q = input.value.toLowerCase().trim();
    shown = items.filter(function (it) { return !q || (it.t + " " + it.g).toLowerCase().indexOf(q) !== -1; });
    if (sel >= shown.length) sel = Math.max(0, shown.length - 1);
    list.innerHTML = shown.length ? shown.map(function (it, i) {
      return '<li role="option" data-i="' + i + '" aria-selected="' + (i === sel) + '"><span>' + esc(it.t) + '</span><span class="grp">' + esc(it.g) + (it.k ? " · " + it.k : "") + "</span></li>";
    }).join("") : '<div class="empty">no results</div>';
    var s = list.querySelector('[aria-selected="true"]');
    if (s) s.scrollIntoView({ block: "nearest" });
  }
  function run(it) {
    if (!it) return;
    close();
    if (it.act) return it.act();
    if (it.ext) window.open(it.h, "_blank", "noopener"); else window.location.href = it.h;
  }
  var lastFocus = null;
  function open() { lastFocus = document.activeElement; back.classList.add("open"); input.value = ""; sel = 0; render(); input.focus(); }
  function close() { back.classList.remove("open"); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  input.addEventListener("input", function () { sel = 0; render(); });
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || (e.ctrlKey && e.key === "n")) { e.preventDefault(); sel = Math.min(shown.length - 1, sel + 1); render(); }
    else if (e.key === "ArrowUp" || (e.ctrlKey && e.key === "p")) { e.preventDefault(); sel = Math.max(0, sel - 1); render(); }
    else if (e.key === "Enter") { e.preventDefault(); run(shown[sel]); }
  });
  list.addEventListener("mousemove", function (e) { var li = e.target.closest("li"); if (li && +li.dataset.i !== sel) { sel = +li.dataset.i; render(); } });
  list.addEventListener("click", function (e) { var li = e.target.closest("li"); if (li) run(shown[+li.dataset.i]); });
  back.addEventListener("click", function (e) { if (e.target === back) close(); });
  document.querySelectorAll("[data-cmdk]").forEach(function (b) { b.addEventListener("click", open); });

  // shortcuts help
  var help = document.createElement("div");
  help.className = "help";
  help.setAttribute("role", "dialog");
  help.setAttribute("aria-label", "Keyboard shortcuts");
  help.innerHTML = "<h4>keyboard shortcuts</h4>" +
    "<div><span>command menu</span><span><kbd>⌘</kbd> <kbd>K</kbd> or <kbd>/</kbd></span></div>" +
    "<div><span>jump to section</span><span><kbd>0</kbd>–<kbd>7</kbd></span></div>" +
    "<div><span>next / prev section</span><span><kbd>j</kbd> <kbd>k</kbd></span></div>" +
    "<div><span>explainers</span><span><kbd>e</kbd></span></div>" +
    "<div><span>this help</span><span><kbd>?</kbd></span></div>" +
    "<div><span>close</span><span><kbd>esc</kbd></span></div>";
  document.body.appendChild(help);

  var homeIds = ["top", "now", "bottom-up", "top-down", "research", "projects", "experience", "contact"];
  var pageSecs = Array.prototype.map.call(document.querySelectorAll("main section[id]"), function (s) { return s.id; });
  var onHome = !!$("now");
  var sectionIds = onHome ? homeIds : ["top"].concat(pageSecs);
  function typing(t) { return t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable); }
  function jump(id) { var el = $(id); if (el) { el.scrollIntoView(); history.replaceState(null, "", "#" + id); } else window.location.href = BASE + "index.html#" + id; }
  function currentIndex() {
    var y = window.scrollY + 120, idx = 0;
    sectionIds.forEach(function (id, i) { var el = $(id); if (el && el.offsetTop <= y) idx = i; });
    return idx;
  }
  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); back.classList.contains("open") ? close() : open(); return; }
    if (e.key === "Escape") { if (back.classList.contains("open")) close(); help.classList.remove("open"); return; }
    if (back.classList.contains("open") || typing(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "/") { e.preventDefault(); open(); }
    else if (e.key === "?") { help.classList.toggle("open"); }
    else if (/^[0-7]$/.test(e.key)) { onHome ? jump(homeIds[+e.key]) : (window.location.href = BASE + "index.html#" + homeIds[+e.key]); }
    else if (e.key === "j") { jump(sectionIds[Math.min(sectionIds.length - 1, currentIndex() + 1)]); }
    else if (e.key === "k") { jump(sectionIds[Math.max(0, currentIndex() - 1)]); }
    else if (e.key === "e") { window.location.href = BASE + "learn/index.html"; }
  });

  // reveal
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
  var yr = $("year"); if (yr) yr.textContent = new Date().getFullYear();
})();
