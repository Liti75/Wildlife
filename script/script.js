let currentLanguage = "en";

window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("preferredLang") || "en";
  currentLanguage = savedLang;

  const langSelect = document.getElementById("languageSelect");
  if (langSelect) {
    langSelect.value = savedLang;
    langSelect.addEventListener("change", () => {
      const selectedLang = langSelect.value;
      localStorage.setItem("preferredLang", selectedLang);
      location.reload(); // reload to reflect changes on all pages
    });
  }

  switchLanguage(currentLanguage);
  fetchWikiFact();
  setInterval(fetchWikiFact, 600000);
});

async function switchLanguage(lang) {
  try {
    let file = "/json/lang.json";
    const path = window.location.pathname.toLowerCase();

    const pathMap = [
      { keyword: "andaman", file: "/json/nationalpark/andaman.json" },
      { keyword: "andhrapradesh", file: "/json/nationalpark/andhrapradesh.json" },
      { keyword: "ban", file: "/json/biosphere/ban.json" },
      { keyword: "bkar", file: "/json/biosphere/bkar.json" },
      { keyword: "bmp", file: "/json/biosphere/bmp.json" },
      { keyword: "bodi", file: "/json/biosphere/bodi.json" },
      { keyword: "btn", file: "/json/biosphere/btn.json" },
      { keyword: "bu", file: "/json/biosphere/bu.json" },
      { keyword: "bwb", file: "/json/biosphere/bwb.json" },
      { keyword: "bap", file: "/json/biosphere/bap.json" },
      { keyword: "goa", file: "/json/nationalpark/goa.json" },
      { keyword: "j&k", file: "/json/nationalpark/j&k.json" },
      { keyword: "jharkhand", file: "/json/nationalpark/jharkhand.json" },
      { keyword: "ladakh", file: "/json/nationalpark/ladakh.json" },
      { keyword: "maharastra", file: "/json/nationalpark/maharastra.json" },
      { keyword: "odisha", file: "/json/nationalpark/odisha.json" },
      { keyword: "telengana", file: "/json/nationalpark/telengana.json" },
      { keyword: "westbengal", file: "/json/nationalpark/westbengal.json" },
      { keyword: "wsa&n", file: "/json/wildlifeSantuary/wsa&n.json" },
      { keyword: "wsap", file: "/json/wildlifeSantuary/wsap.json" },
      { keyword: "wsg", file: "/json/wildlifeSantuary/wsg.json" },
      { keyword: "wsj", file: "/json/wildlifeSantuary/wsj.json" },
      { keyword: "wsj&k", file: "/json/wildlifeSantuary/wsj&k.json" },
      { keyword: "wsl", file: "/json/wildlifeSantuary/wsl.json" },
      { keyword: "wsm", file: "/json/wildlifeSantuary/wsm.json" },
      { keyword: "wso", file: "/json/wildlifeSantuary/wso.json" },
      { keyword: "wst", file: "/json/wildlifeSantuary/wst.json" },
      { keyword: "wswb", file: "/json/wildlifeSantuary/wswb.json" },
      { keyword: "sharavathi", file: "/html/information/biosphere/json/sharavathi.json" },
      { keyword: "simlipal", file: "/html/information/biosphere/json/simlipal.json" },
      { keyword: "sundarban", file: "../json/sundarban.json" },
      { keyword: "seshachalam", file: "/html/information/biosphere/json/seshachalam.json" },
      { keyword: "panna", file: "/html/information/biosphere/json/panna.json" },
      { keyword: "pachmarhi", file: "/html/information/biosphere/json/pachmarhi.json" },
      { keyword: "nilgiri", file: "/html/information/biosphere/json/nilgiri.json" },
      { keyword: "nanda", file: "/html/information/biosphere/json/nanda.json" },
      { keyword: "gulf", file: "/html/information/biosphere/json/gulf.json" },
      { keyword: "greatnicober", file: "/html/information/biosphere/json/greatnicober.json" },
      { keyword: "darjeeling", file: "/html/information/biosphere/json/darjeeling.json" },
      { keyword: "agasthyamalai", file: "/html/information/biosphere/json/agasthyamalai.json" },
      { keyword: "Achanakmar", file: "/html/information/biosphere/json/Achanakmar.json" }
    ];

    for (const entry of pathMap) {
      if (path.includes(entry.keyword)) {
        file = entry.file;
        break;
      }
    }

    const res = await fetch(file);
    if (!res.ok) {
      console.warn(`Missing language file: ${file}`);
      return;
    }

    const data = await res.json();
    const t = data[lang];

    if (!t) {
      console.warn(`Language "${lang}" not found in ${file}`);
      return;
    }

    Object.entries(t).forEach(([key, value]) => {
      const el = document.getElementById(key);
      if (el) el.textContent = value;
    });

  } catch (err) {
    console.error("Language switch failed:", err);
  }

  fetchWikiFact();
}

async function fetchWikiFact() {
  try {
    const langCode = currentLanguage || "en";
    const res = await fetch(`https://${langCode}.wikipedia.org/api/rest_v1/page/random/summary`);
    const data = await res.json();
    const factEl = document.getElementById("fact");
    if (factEl) {
      const fact = data.extract ? data.extract.split(". ")[0] + "." : "No fun fact available!";
      factEl.textContent = fact;
    }
  } catch {
    const factEl = document.getElementById("fact");
    if (factEl) factEl.textContent = "Sorry, no fact available.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".clickable-row").forEach(row => {
    row.addEventListener("click", () => {
      const href = row.getAttribute("data-href");
      if (href) window.location.href = href;
    });
  });
});
