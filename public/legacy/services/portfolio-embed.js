/*
 * Shared portfolio browser for static service pages.
 * Uses window.BIF_PORTFOLIO_ITEMS from lightbox-portfolio.js, which is
 * generated from app/data/portfolio.ts, the same source as /portfolio.
 */
(function () {
  "use strict";

  var VIDEO_TYPE_FILTERS = [
    ["Brand films and commercials", ["brand hero", "brand film", "brand story", "spec ad", "commercial", "campaign"]],
    ["Product and platform videos", ["product", "platform", "service overview", "service video", "launch video", "portal", "unboxing", "real estate", "video tour"]],
    ["Explainers and animation", ["explainer", "animated", "animation", "vfx", "course overview"]],
    ["Events and highlights", ["event", "highlights", "anniversary", "launch", "soiree"]],
    ["Testimonials and interviews", ["testimonial", "interview", "customer success", "graduate", "member"]],
    ["Social and education", ["social", "educational", "education", "course promo", "promotional", "viral", "charity", "behind the scenes", "behind-the-scenes", "bts", "passion project"]]
  ];

  var INDUSTRY_FILTERS = [
    ["Finance and fintech", ["finance", "fintech", "wealth", "dacxi", "mastercard", "kpmg", "independent reserve"]],
    ["Technology and SaaS", ["technology", "legal technology", "infrastructure", "games", "saas", "software", "portal", "app", "amplitel"]],
    ["Education and training", ["higher education", "academy of interactive entertainment", "aie", "training", "course", "graduate"]],
    ["Events and hospitality", ["events", "event", "hospitality", "tourism", "doltone", "little red hood"]],
    ["Health and wellbeing", ["health", "fitness", "aged-care", "aged care", "manad", "lyfy", "invictus"]],
    ["Community and charity", ["charity", "community", "street growth", "edapp"]],
    ["Lifestyle, beauty and property", ["fashion", "beauty", "cartier", "instyle", "mimi", "real estate", "property", "home improvement", "smart makeover", "ray white"]],
    ["Creative and passion projects", ["creative services", "black iris films", "passion project", "flow motion"]]
  ];

  function textFor(item) {
    return [item.category, item.title, item.description, item.client, item.industry].join(" ").toLowerCase();
  }

  function groupsFor(item, filters, fallback) {
    var text = textFor(item);
    var groups = filters
      .filter(function (filter) {
        return filter[1].some(function (term) { return text.indexOf(term) !== -1; });
      })
      .map(function (filter) { return filter[0]; });
    return groups.length ? groups : [item[fallback]];
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function addStyles() {
    if (document.getElementById("bif-service-portfolio-css")) return;
    var style = document.createElement("style");
    style.id = "bif-service-portfolio-css";
    style.textContent =
      ".bif-portfolio-embed-section{background:#f7f8fa;padding:78px 0 90px;}" +
      ".bif-portfolio-embed-section h2{text-align:center;margin-bottom:28px;}" +
      ".bif-portfolio-controls{border:1px solid #d5d8de;background:#fff;border-radius:6px;padding:24px;box-shadow:0 10px 30px rgba(15,24,38,.08);}" +
      ".bif-portfolio-control-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;}" +
      ".bif-portfolio-field{display:block;color:#0f1826;font-size:14px;font-weight:800;}" +
      ".bif-portfolio-field span{display:block;margin-bottom:8px;}" +
      ".bif-portfolio-field select{width:100%;height:44px;border:1px solid #d5d8de;border-radius:3px;background:#fff;color:#0f1826;font:800 14px Montserrat,Arial,sans-serif;padding:0 12px;}" +
      ".bif-portfolio-clear-wrap{display:flex;justify-content:flex-end;margin-top:16px;}" +
      ".bif-portfolio-clear{min-height:42px;border:0;border-radius:2px;background:#4fad73;color:#fff;font:800 12px Montserrat,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;padding:0 18px;cursor:pointer;}" +
      ".bif-portfolio-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:34px;}" +
      ".bif-portfolio-card{display:block;overflow:hidden;border:1px solid rgba(213,216,222,.9);border-radius:6px;background:#fff;text-align:left;box-shadow:0 18px 45px rgba(15,24,38,.08);cursor:pointer;transition:transform .25s ease,box-shadow .25s ease;}" +
      ".bif-portfolio-card:hover,.bif-portfolio-card:focus-visible{transform:translateY(-4px);box-shadow:0 24px 60px rgba(15,24,38,.13);outline:none;}" +
      ".bif-portfolio-thumb{position:relative;display:block;aspect-ratio:16/9;overflow:hidden;background:#0f1826;}" +
      ".bif-portfolio-thumb img{width:100%;height:100%;object-fit:cover;transition:transform .7s ease;}" +
      ".bif-portfolio-card:hover img{transform:scale(1.045);}" +
      ".bif-portfolio-thumb:after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.78),rgba(0,0,0,.12),transparent);}" +
      ".bif-portfolio-chip{position:absolute;left:12px;top:12px;z-index:2;border-radius:3px;background:rgba(255,255,255,.94);color:#0f1826;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:5px 10px;}" +
      ".bif-portfolio-play{position:absolute;inset:0;z-index:3;display:grid;place-items:center;opacity:0;transition:opacity .25s ease;}" +
      ".bif-portfolio-card:hover .bif-portfolio-play,.bif-portfolio-card:focus-visible .bif-portfolio-play{opacity:1;}" +
      ".bif-portfolio-play span{display:grid;width:48px;height:48px;place-items:center;border-radius:999px;background:#4fad73;color:#fff;box-shadow:0 15px 35px rgba(0,0,0,.28);}" +
      ".bif-portfolio-body{display:block;padding:18px;}" +
      ".bif-portfolio-industry{display:block;color:#4fad73;font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;}" +
      ".bif-portfolio-title{display:block;margin-top:9px;color:#0f1826;font-size:20px;font-weight:800;line-height:1.22;}" +
      ".bif-portfolio-desc{display:block;margin-top:9px;color:#4b6b8b;font-size:14px;line-height:1.6;}" +
      ".bif-portfolio-empty{margin-top:34px;border:1px solid #d5d8de;background:#fff;padding:44px 20px;text-align:center;color:#4b6b8b;}" +
      "@media(max-width:900px){.bif-portfolio-grid{grid-template-columns:repeat(2,minmax(0,1fr));}.bif-portfolio-control-grid{grid-template-columns:1fr;}}" +
      "@media(max-width:600px){.bif-portfolio-embed-section{padding:58px 0 70px;}.bif-portfolio-grid{grid-template-columns:1fr;}.bif-portfolio-controls{padding:18px;}}";
    document.head.appendChild(style);
  }

  function renderSelect(label, options, value, name) {
    return '<label class="bif-portfolio-field"><span>' + label + '</span><select data-bif-' + name + '>' +
      '<option value="All">All</option>' +
      options.map(function (option) {
        return '<option value="' + esc(option[0]) + '"' + (option[0] === value ? " selected" : "") + ">" + esc(option[0]) + "</option>";
      }).join("") +
      "</select></label>";
  }

  function initEmbed(root) {
    var items = Array.isArray(window.BIF_PORTFOLIO_ITEMS) ? window.BIF_PORTFOLIO_ITEMS : [];
    var section = root.closest("[data-bif-portfolio-section]") || root;
    var defaultType = section.getAttribute("data-bif-default-type") || "All";
    var defaultIndustry = section.getAttribute("data-bif-default-industry") || "All";
    var typeValue = defaultType;
    var industryValue = defaultIndustry;

    function itemMatches(item) {
      var typeGroups = groupsFor(item, VIDEO_TYPE_FILTERS, "category");
      var industryGroups = groupsFor(item, INDUSTRY_FILTERS, "industry");
      return (typeValue === "All" || typeGroups.indexOf(typeValue) !== -1) &&
        (industryValue === "All" || industryGroups.indexOf(industryValue) !== -1);
    }

    function card(item) {
      var typeLabel = groupsFor(item, VIDEO_TYPE_FILTERS, "category")[0];
      var industryLabel = groupsFor(item, INDUSTRY_FILTERS, "industry")[0];
      return '<button type="button" class="bif-portfolio-card" data-vimeo="' + esc(item.vimeoId) + '" aria-label="Play ' + esc(item.title) + '">' +
        '<span class="bif-portfolio-thumb"><img src="' + esc(item.thumb) + '" alt="' + esc(item.title) + '" loading="lazy" decoding="async">' +
        '<span class="bif-portfolio-chip">' + esc(typeLabel) + '</span>' +
        '<span class="bif-portfolio-play"><span><svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span></span></span>' +
        '<span class="bif-portfolio-body"><span class="bif-portfolio-industry">' + esc(industryLabel) + '</span>' +
        '<span class="bif-portfolio-title">' + esc(item.title) + '</span>' +
        '<span class="bif-portfolio-desc">' + esc(item.description) + '</span></span></button>';
    }

    function render() {
      var active = typeValue !== "All" || industryValue !== "All";
      var shown = items.filter(itemMatches);
      if (!active) shown = shown.slice(0, 21);
      root.innerHTML =
        '<div class="bif-portfolio-controls">' +
          '<div class="bif-portfolio-control-grid">' +
            renderSelect("Choose an industry", INDUSTRY_FILTERS, industryValue, "industry-filter") +
            renderSelect("Choose a type of video", VIDEO_TYPE_FILTERS, typeValue, "type-filter") +
          '</div>' +
          (active ? '<div class="bif-portfolio-clear-wrap"><button type="button" class="bif-portfolio-clear" data-bif-clear-filters>Clear filters</button></div>' : '') +
        '</div>' +
        (shown.length
          ? '<div class="bif-portfolio-grid">' + shown.map(card).join("") + '</div>'
          : '<div class="bif-portfolio-empty"><strong>No matching projects.</strong><br>Try clearing a filter or choosing a different sector or video format.</div>');
    }

    root.addEventListener("change", function (event) {
      if (event.target.matches("[data-bif-industry-filter]")) {
        industryValue = event.target.value;
        render();
      }
      if (event.target.matches("[data-bif-type-filter]")) {
        typeValue = event.target.value;
        render();
      }
    });

    root.addEventListener("click", function (event) {
      var clear = event.target.closest("[data-bif-clear-filters]");
      if (clear) {
        typeValue = "All";
        industryValue = "All";
        render();
        return;
      }
      var cardEl = event.target.closest(".bif-portfolio-card");
      if (cardEl && window.openPortfolioItem) {
        window.openPortfolioItem(cardEl.getAttribute("data-vimeo"));
      }
    });

    render();
  }

  function init() {
    addStyles();
    document.querySelectorAll("[data-bif-portfolio-embed]").forEach(initEmbed);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
