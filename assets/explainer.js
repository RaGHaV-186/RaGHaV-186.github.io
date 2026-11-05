// explainer.js — small shared helpers for the interactive explainers.
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var X = {};
  X.C = { amber: "#ffb454", green: "#7ee787", cyan: "#79c0ff", violet: "#c4a7ff", red: "#ff8b80", text: "#e7eaee", text2: "#b4bcc8", muted: "#7d8694", border: "#232931", border2: "#303844", bg2: "#0f1216", surface: "#13171c" };

  // create an svg element: X.el("rect", {x:1}, parent)
  X.el = function (tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };
  X.text = function (parent, x, y, s, attrs) {
    var a = Object.assign({ x: x, y: y, fill: X.C.muted, "font-size": 11 }, attrs || {});
    var t = X.el("text", a, parent);
    t.textContent = s;
    return t;
  };
  X.clear = function (svg) { while (svg.firstChild) svg.removeChild(svg.firstChild); };
  X.fmt = function (v, d) { return (Math.round(v * Math.pow(10, d == null ? 3 : d)) / Math.pow(10, d == null ? 3 : d)).toString(); };
  X.pct = function (v, d) { return (v * 100).toFixed(d == null ? 1 : d) + "%"; };

  // seeded RNG (mulberry32) so simulations are repeatable
  X.rng = function (seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  // bind a range input to an output + callback
  X.slider = function (id, cb, fmt) {
    var inp = document.getElementById(id), out = document.querySelector('output[for="' + id + '"]');
    function upd() { var v = parseFloat(inp.value); if (out) out.textContent = fmt ? fmt(v) : v; cb(v); }
    inp.addEventListener("input", upd);
    return { get: function () { return parseFloat(inp.value); }, set: function (v) { inp.value = v; upd(); }, update: upd };
  };

  // predict-first blocks: <div class="predict" data-answer="b"> buttons data-k
  X.predicts = function () {
    document.querySelectorAll(".predict[data-answer]").forEach(function (box) {
      var ans = box.getAttribute("data-answer");
      var btns = box.querySelectorAll(".choices button");
      btns.forEach(function (b) {
        b.addEventListener("click", function () {
          btns.forEach(function (o) { o.classList.remove("right", "wrong"); });
          b.classList.add(b.getAttribute("data-k") === ans ? "right" : "wrong");
          box.querySelectorAll('.choices button[data-k="' + ans + '"]').forEach(function (o) { o.classList.add("right"); });
          var r = box.querySelector(".reveal-a"); if (r) r.classList.add("show");
          box.dispatchEvent(new CustomEvent("answered", { detail: b.getAttribute("data-k") }));
        });
      });
    });
  };

  // very small python highlighter for <pre data-py>
  X.highlight = function () {
    var KW = /\b(def|return|if|elif|else|for|in|while|import|from|as|raise|not|and|or|is|None|True|False|lambda|with|class)\b/g;
    document.querySelectorAll("pre[data-py]").forEach(function (pre) {
      var lines = pre.textContent.split("\n").map(function (line) {
        var code = line, cm = "";
        var i = line.indexOf("#");
        if (i !== -1 && !/["'].*#.*["']/.test(line.slice(0, i + 1))) { code = line.slice(0, i); cm = line.slice(i); }
        var esc = function (s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
        var parts = code.split(/("[^"]*"|'[^']*')/);
        code = parts.map(function (p, j) {
          if (j % 2) return '<span class="st">' + esc(p) + "</span>";
          p = esc(p);
          p = p.replace(KW, '<span class="kw">$1</span>');
          p = p.replace(/\b(\d+\.?\d*)\b/g, '<span class="nu">$1</span>');
          p = p.replace(/\b([a-z_][a-z0-9_]*)(?=\()/gi, function (m) { return /^(def|if|return|in|not|and|or)$/.test(m) ? m : '<span class="fn">' + m + "</span>"; });
          return p;
        }).join("");
        return code + (cm ? '<span class="cm">' + esc(cm) + "</span>" : "");
      });
      pre.innerHTML = lines.join("\n");
    });
  };

  // highlight current section in the sticky table of contents
  X.toc = function () {
    var links = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    links.forEach(function (l) { var s = document.querySelector(l.getAttribute("href")); if (s) io.observe(s); });
  };

  // axis helper: draws baseline + x tick labels
  X.axisX = function (svg, x0, x1, y, ticks) {
    X.el("line", { x1: x0, x2: x1, y1: y, y2: y, stroke: X.C.border2 }, svg);
    (ticks || []).forEach(function (t) { X.text(svg, t.x, y + 16, t.label, { "text-anchor": "middle" }); });
  };

  window.X = X;
  document.addEventListener("DOMContentLoaded", function () { X.predicts(); X.highlight(); X.toc(); });
})();
