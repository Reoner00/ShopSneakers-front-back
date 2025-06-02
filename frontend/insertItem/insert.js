const API_BASE = "http://localhost:3003";
const form = document.getElementById("insert-form");
const resultDiv = document.getElementById("insert-result");

function isValidUrl(url) {
  // Простой регекc для проверки http/https ссылки на изображение
  return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  resultDiv.textContent = "";

  const name = form.name.value.trim();
  const price = Number(form.price.value);
  const imageUrl = form.imageUrl.value.trim();
  const description = form.description.value.trim();

  if (!name) {
    resultDiv.textContent = "Name is required.";
    resultDiv.classList.add("error");
    return;
  }
  if (isNaN(price) || price <= 0) {
    resultDiv.textContent = "Price must be a more one dollar";
    resultDiv.classList.add("error");
    return;
  }
  if (imageUrl && !isValidUrl(imageUrl)) {
    resultDiv.textContent =
      "Image URL must be a valid link to an image (jpg, png, gif, etc).";
    resultDiv.classList.add("error");
    return;
  }
  if (description.length < 9) {
    resultDiv.textContent = "Description must be at least 9 characters.";
    resultDiv.classList.add("error");
    return;
  }

  const product = { name, price, imageUrl, description };

  try {
    const res = await fetch(`${API_BASE}/addItem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (res.ok) {
      resultDiv.textContent = "Product added!";
      form.reset();
    } else {
      const data = await res.json();
      resultDiv.textContent = data.message || "Error adding product";
    }
  } catch (err) {
    resultDiv.textContent = "Server error";
  }
});
