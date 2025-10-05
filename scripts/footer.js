const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const modifiedEl = document.getElementById("modified");
if (modifiedEl) modifiedEl.textContent = new Date(document.lastModified).toLocaleString();