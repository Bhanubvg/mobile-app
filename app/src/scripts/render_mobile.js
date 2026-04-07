import { html, render } from 'https://cdn.jsdelivr.net/npm/lit-html@3.3.2/+esm';


let allMobiles = [];

async function loadMobiles() {
    const response = await fetch("/app/assets/mobiles.json");
    const data = await response.json();
    return data.mobiles;
}

function render_mobile(mobile) {
    return html`
        <mobile-card 
            .company=${mobile.company}
            .model=${mobile.model}
            .rating=${mobile.rating}
            .price=${mobile.price}
            .image=${mobile.image}>
        </mobile-card>
    `;
}

// 🔹 Render list
function render_all_mobiles(List) {
    if (List.length === 0) {
        return html`<p>No product found ❌</p>`;
    }
    return html`${List.map(t => render_mobile(t))}`;
}

// 🔹 Search function
function searchMobiles() {
    const value = document.getElementById("searchBox").value.toLowerCase();

    const filtered = allMobiles.filter(t =>
        t.company.toLowerCase().includes(value)
    );

    render(render_all_mobiles(filtered), document.getElementById('mobile'));
}

// 🔹 Load + initial render
allMobiles = await loadMobiles();
render(render_all_mobiles(allMobiles), document.getElementById('mobile'));

// 🔹 Button click
document.getElementById("searchBtn").addEventListener("click", searchMobiles);

// 🔹 Enter key support
document.getElementById("searchBox").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchMobiles();
    }
});