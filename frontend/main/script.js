const API_BASE = "http://localhost:3003";

async function fetchItems() {
  try {
    const res = await fetch(`${API_BASE}/allItems`);
    if (!res.ok) throw new Error("Failed to load items");
    const items = await res.json();
    renderItems(items);
  } catch (err) {
    document.getElementById("items-container").innerHTML =
      "<p>Failed to load items.</p>";
  }
}

function renderItems(items) {
  const container = document.getElementById("items-container");
  container.innerHTML = "";
  if (!Array.isArray(items) || items.length === 0) {
    container.innerHTML = "<p>No items available.</p>";
    return;
  }

  items.forEach((item) => {
    const cardLink = document.createElement("a");
    cardLink.href = "../item/item.html?id=" + item._id;
    cardLink.className = "item-card";
    cardLink.innerHTML = `
          <img src="${
            item.imageUrl || "https://via.placeholder.com/200x120?text=No+Image"
          }" alt="${item.name}" />
          <div class="info">
            <h3>${item.name}</h3>
            <p class="price">${item.price.toFixed(2)} $</p>
          </div>
        `;
    container.appendChild(cardLink);
  });
}

// Load items on page load
document.addEventListener("DOMContentLoaded", fetchItems);
