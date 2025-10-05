const products = [
    { id: "fc-1888", name: "Flux Capacitor" },
    { id: "pl-2015", name: "Power Laces" },
    { id: "mr-2042", name: "Micro-Reactor" },
    { id: "hx-3300", name: "HyperX Router" },
    { id: "ec-920", name: "EcoClean Dishwasher" },
    { id: "px-77", name: "PixelMax Projector" }
];

const productSelect = document.querySelector("#product");
if (productSelect) {
    products.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.id;
        opt.textContent = p.name;
        productSelect.append(opt);
    });
}

const dateInput = document.querySelector("#installDate");
if (dateInput) {
    const today = new Date();
    const iso = today.toISOString().split("T")[0];
    dateInput.setAttribute("max", iso);
}

const form = document.getElementById("reviewForm");
if (form) {
    form.addEventListener("submit", (e) => {
        if (!form.checkValidity()) {
            e.preventDefault();
            const firstInvalid = form.querySelector(":invalid");
            if (firstInvalid) firstInvalid.focus();
        }
    });
}