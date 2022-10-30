const productQuantity = document.querySelector(".quantityDisplay");

const handleQuantityButtonClick = (e) => {
  if (
    !e.target.matches(".btnAddQuantity") &&
    !e.target.matches(".btnRemoveQuantity")
  )
    return;
  const value = parseInt(productQuantity.innerText);
  const type = e.target.matches(".btnAddQuantity") ? "add" : "remove";
  switch (type) {
    case "add":
      if (value < 20) {
        productQuantity.innerText = value + 1;
      }
      break;
    default:
      if (value > 1) {
        productQuantity.innerText = value - 1;
      }
  }
};

document.addEventListener("click", handleQuantityButtonClick);
