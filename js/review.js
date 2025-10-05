const params = new URLSearchParams(window.location.search);

const productMap = new Map([
    ["fc-1888", "Flux Capacitor"],
    ["pl-2015", "Power Laces"],
    ["mr-2042", "Micro-Reactor"],
    ["hx-3300", "HyperX Router"],
    ["ec-920", "EcoClean Dishwasher"],
    ["px-77", "PixelMax Projector"]
]);

function setText(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = value || "-";
}

const productId = params.get("product");
setText("outProduct", productMap.get(productId) ?? productId ?? "-");
setText("outRating", params.get("rating"));
setText("outInstall", params.get("installDate"));

const features = params.getAll("features");
setText("outFeatures", features.length ? features.join(", ") : "-");

setText("outComments", params.get("comments"));
setText("outUser", params.get("userName"));

const KEY = "reviewCount";
const current = Number(localStorage.getItem(KEY) || 0) + 1;
localStorage.setItem(KEY, String(current));
setText("reviewCount", current);