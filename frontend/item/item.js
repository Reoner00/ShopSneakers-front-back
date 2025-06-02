const API_BASE = "http://localhost:3003";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const deleteBtn = document.getElementById("delete-btn");
const detailsDiv = document.getElementById("item-details");
const form = document.getElementById("edit-form");

async function loadItem() {
  const res = await fetch(`${API_BASE}/items/${id}`);
  if (!res.ok) {
    detailsDiv.innerHTML = "<p>Item not found.</p>";
    form.style.display = "none";
    return;
  }
  const item = await res.json();
  detailsDiv.innerHTML = `
    <div class="item-card" style="margin:auto;">
      <img src="${
        item.imageUrl || "https://via.placeholder.com/200x120?text=No+Image"
      }" alt="${item.name}" />
      <div class="info">
        <h3>${item.name}</h3>
        <p class="price">${item.price.toFixed(2)} $</p>
        <p>${item.description || ""}</p>
      </div>
    </div>
  `;
  form.name.value = item.name;
  form.price.value = item.price;
  form.imageUrl.value = item.imageUrl;
  form.description.value = item.description;
}

deleteBtn.addEventListener("click", async () => {
  if (!confirm("Are you sure you want to delete this product?")) return;
  const res = await fetch(`${API_BASE}/items/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    alert("Product deleted!");
    window.location.href = "../main/index.html";
  } else {
    alert("Error deleting product");
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const updated = {
    name: form.name.value,
    price: Number(form.price.value),
    imageUrl: form.imageUrl.value,
    description: form.description.value,
  };
  const res = await fetch(`${API_BASE}/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });
  if (res.ok) {
    alert("Product updated!");
    loadItem();
  } else {
    alert("Error updating product");
  }
});

loadItem();
