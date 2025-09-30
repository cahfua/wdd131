const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
    },
    {
        templeName: "Apia Samoa",
        location: "Apia, Samoa",
        dedicated: "1983, August, 5",
        area: 18691,
        imageUrl:
            "https://www.churchofjesuschrist.org/imgs/6007b20e832459d2d8540c15a8f5fa80d7dcff0f/full/800%2C/0/default",
    },
    {
        templeName: "Suva Fiji",
        location: "Suva, Fiji",
        dedicated: "2000, June, 18",
        area: 20438,
        imageUrl:
            "https://assets.churchofjesuschrist.org/1f/61/1f613a25e8c3fc308eff05c36bb02e78b9eef6c9/suva_fiji_temple_lds.jpeg",
    },
    {
        templeName: "Hamilton New Zealand",
        location: "Hamilton, New Zealand",
        dedicated: "1958, April, 20",
        area: 85700,
        imageUrl:
            "https://assets.churchofjesuschrist.org/c5/d2/c5d27d196f7b58ce3267af61a746073ec7e94ac2/hamilton_new_zealand_lds_temple.jpeg",
    },
];

const getYear = (t) => Number(String(t.dedicated).split(",")[0].trim());

const viewTitle = $("#view-title");
const cards = $("#cards");

function renderCards(list) {
    cards.innerHTML = "";

    const frag = document.createDocumentFragment();

    list.forEach((t) => {
        const article = document.createElement("article");
        article.className = "card";

        const img = document.createElement("img");
        img.src = t.imageUrl;
        img.alt = t.templeName;
        img.loading = "lazy";

        const link = document.createElement("a");
        link.href = t.imageUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.append(img);

        const body = document.createElement("div");
        body.className = "body";

        const h3 = document.createElement("h3");
        h3.textContent = t.templeName;

        const p = document.createElement("p");
        p.className = "meta";
        p.innerHTML = `
            <strong>Location:</strong> ${t.location}<br>
            <strong>Dedicated:</strong> ${t.dedicated}<br>
            <strong>Area:</strong> ${t.area.toLocaleString()} sq ft
        `;

        body.append(h3, p);
        article.append(link, body);
        frag.append(article);
    });

    cards.append(frag);
}

const FILTERS = {
    home: () => temples,
    old: () => temples.filter(t => getYear(t) < 1900),
    new: () => temples.filter(t => getYear(t) > 2000),
    large: () => temples.filter(t => t.area > 90000),
    small: () => temples.filter(t => t.area < 10000),
};

function applyFilter(key) {
    const fn = FILTERS[key] || FILTERS.home;
    const result = fn();
    renderCards(result);

    $$(".nav-btn").forEach(btn => btn.setAttribute("aria-pressed", String(btn.dataset.filter === key)));

    const titles = {
        home: "All Temples",
        old: "Old Temples (before 1900)",
        new: "New Temples (after 2000)",
        large: "Large Temples (> 90,000 sq ft)",
        small: "Small Temples (< 10,000 sq ft)",
    };
    viewTitle.textContent = `${titles[key]} • ${result.length} shown`;
    viewTitle.focus({ preventScroll: false });
}

const menuBtn = $("#menuBtn");
const nav = $("#primary-nav");

menuBtn?.addEventListener("click", () => {
    const isOpen = nav.style.display === "block";
    nav.style.display = isOpen ? "none" : "block";
    menuBtn.setAttribute("aria-expanded", String(!isOpen));
});

$$(".nav-btn").forEach(el => {
    el.addEventListener("click", (e) => {
        e.preventDefault();
        applyFilter(el.dataset.filter);
    });
});

$("#year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent =
    new Date(document.lastModified).toLocaleString();

applyFilter("home");