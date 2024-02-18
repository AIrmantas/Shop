const state = {};

async function fetchItems() {
  try {
    const res = await fetch("https://65ccafbadd519126b83f45c4.mockapi.io/v1/v1");
    
    if (!res.ok) {
      throw new Error(`Failed to fetch items: ${res.statusText}`);
    }

    const data = await res.json();
    state.items = data;
    renderItems();
  } catch (error) {
    console.error(error);
  }
}

function renderItems() {
  const itemContainer = document.getElementById("items-container");
  itemContainer.innerHTML = "";

  const sortedItems = state.items.slice().sort((a, b) => a.price - b.price);

  sortedItems.forEach((item) => {
    const itemName = document.createElement("h1");
    itemName.innerText = item.name;

    const itemImage = document.createElement("img");
    itemImage.src = item.image;
    itemImage.setAttribute("alt", "Item picture");

    const itemPrice = document.createElement("h2");
    itemPrice.innerText = `${item.price}€`;

    const itemLink = document.createElement("a");
    itemLink.href = `item.html?id=${item.id}`;
    itemLink.appendChild(itemName);
    itemLink.style.textDecoration = "none";

    const itemCard = document.createElement("div");
    itemCard.setAttribute("class", "item-card");
    itemCard.append(itemLink, itemImage, itemPrice);

    itemContainer.append(itemCard);
  });
}

fetchItems();





