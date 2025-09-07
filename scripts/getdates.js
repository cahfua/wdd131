const currentYearSpan = document.getElementById("currentyear");
if (currentYearSpan) {
    const today = new Date();
    currentYearSpan.textContent = today.getFullYear();
}

const lastModifiedParagraph = document.getElementById("lastModified");
if (lastModifiedParagraph) {
    lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;
}