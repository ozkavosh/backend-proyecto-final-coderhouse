const addToCart = async (e) => {
  if (!e.target.matches(".btnAddToCart")) return;
  const { id } = e.target.dataset;
  const quantity = Number(document.querySelector(".quantityDisplay").innerText);
  const request = await axios.post("/carrito/", { id, quantity });
  const cart = request.data;
  const cartItems = cart.products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  updateCartItems(cartItems);
  Toastify({
    text: "Producto agregado al carrito!",
    duration: 1000,
    style: {
      background: "black",
      color: "white",
    },
  }).showToast();
};

const quickAddToCart = async (e) => {
  if (!e.target.matches(".btnQuickAddToCart")) return;
  const { id } = e.target.dataset;
  const request = await axios.post("/carrito/", { id, quantity: 1 });
  const cart = request.data;
  const cartItems = cart.products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  updateCartItems(cartItems);
  Toastify({
    text: "Producto agregado al carrito!",
    duration: 1000,
    style: {
      background: "black",
      color: "white",
    },
  }).showToast();
};

const removeFromCart = async (e) => {
  if (!e.target.matches(".btnRemoveFromCart")) return;
  const { id } = e.target.dataset;
  const request = await axios.delete(`/carrito/producto/${id}`);
  const cart = request.data;
  const cartItems = cart.products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  updateCartItems(cartItems);
  location.reload();
};

const finishPurchase = async (e) => {
  if (!e.target.matches(".btnFinishPurchase")) return;
  const { id } = e.target.dataset;
  const request = await axios.delete(`/carrito/producto/${id}`);
  const cart = request.data;
  const cartItems = cart.products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  updateCartItems(cartItems);
  location.reload();
};

const updateCartItems = (newAmount) => {
  const cartItems = document.querySelector(".cartItems");
  cartItems.innerHTML = newAmount < 100 ? newAmount : "99+";
};

const getCart = async () => {
  try {
    const request = await axios.get("/carrito/info");
    const cart = request.data;
    const cartItems = cart.products.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    updateCartItems(cartItems);
  } catch {
    await axios.get("/carrito/nuevo");
  }
};

document.addEventListener("click", (e) => {
  quickAddToCart(e);
  addToCart(e);
  removeFromCart(e);
});

window.addEventListener("load", () => {
  getCart();
});
