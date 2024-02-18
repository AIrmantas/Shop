document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get("id");

  fetch(`https://65ccafbadd519126b83f45c4.mockapi.io/v1/v1/${itemId}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((item) => {
      document.getElementById("itemName").innerText = `Prekė: ${item.name}`;
      document.getElementById("itemImage").src = item.image;
      document.getElementById("itemPrice").innerText = `Kaina: ${item.price}€`;
      document.getElementById("itemDescription").innerText = `Aprašymas: ${item.description}`;
      document.getElementById("itemCity").innerText = `Miestas: ${item.city}`;

      document.getElementById("deleteButton").addEventListener("click", () => {
        deleteItem(itemId);
      });
    })
    .catch((error) => {
      console.error(error);
    });

  function deleteItem(itemId) {
    fetch(`https://65ccafbadd519126b83f45c4.mockapi.io/v1/v1/${itemId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          showDeleteMessage("Item successfully deleted.");
          // window.location.href = "index.html";
        } else {
          throw new Error(`Failed to delete item: ${res.statusText}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function showDeleteMessage(message) {
    const deleteMessageElement = document.getElementById("deleteMessage");
    deleteMessageElement.innerText = message;
}
});