/* Visitor counter: Abacus (abacus.jasoncameron.dev), no cookies. One hit per page load, site-wide. */
(() => {
  const URL = "https://abacus.jasoncameron.dev/hit/hatlem72-creator-ace/visits";
  if (!location.protocol.startsWith("http")) return;
  fetch(URL).then(r => r.ok ? r.json() : null).then(d => {
    const el = document.getElementById("visitCount"), box = document.getElementById("visits");
    if (d && typeof d.value === "number" && el && box) { el.textContent = d.value.toLocaleString("en-US"); box.hidden = false; }
  }).catch(() => {});
})();
