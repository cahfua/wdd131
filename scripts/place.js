const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const modifiedEl = document.getElementById("modified");
if (modifiedEl) modifiedEl.textContent = new Date(document.lastModified).toLocaleString();

const tempC = 10;
const windKmh = 24;

document.getElementById("temp").textContent = String(tempC);
document.getElementById("wind").textContent = String(windKmh);

const calculateWindChill = (tC, vKmh) =>
    13.12 + (0.6215 * tC) - (11.37 * Math.pow(vKmh, 0.16)) + (0.3965 * tC * Math.pow(vKmh, 0.16));

const windChillEl = document.getElementById("windchill");

if (tempC <= 10 && windKmh > 4.8) {
    const wc = calculateWindChill(tempC, windKmh);
    windChillEl.textContent = `${Math.round(wc)} °C`;
} else {
    windChillEl.textContent = "N/A";
}