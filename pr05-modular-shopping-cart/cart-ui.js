import { addToCart, getCartSummary, removeFromCart } from './cart.js';

const products = [
  { id: 'book-js', name: 'JavaScript Guide', category: 'books', price: 400, stock: 5 },
  { id: 'mouse', name: 'Gaming Mouse', category: 'tech', price: 800, stock: 3 },
  { id: 'headphones', name: 'Headphones', category: 'tech', price: 600, stock: 4 },
];

const catalogueElement = document.querySelector('#catalogue');
const cartElement = document.querySelector('#cart');
const summaryElement = document.querySelector('#summary');
const messageElement = document.querySelector('#message');
const promoElement = document.querySelector('#promo');
let cart = [];

function money(value) {
  return `${Number(value).toFixed(2)} UAH`;
}

function showMessage(message = '') {
  messageElement.textContent = message;
}

function renderCatalogue() {
  catalogueElement.innerHTML = products.map((product) => `
    <article class="product">
      <p class="tag">${product.category}</p>
      <h3>${product.name}</h3>
      <p>${money(product.price)} · ${product.stock} available</p>
      <label>Quantity <input id="quantity-${product.id}" type="number" min="1" max="${product.stock}" value="1"></label>
      <button data-add="${product.id}">Add to cart</button>
    </article>
  `).join('');
}

function renderSummary() {
  const result = getCartSummary(cart, promoElement.value.trim());
  if (!result.ok) {
    summaryElement.innerHTML = '';
    showMessage(result.message);
    return;
  }

  const { summary } = result;
  summaryElement.innerHTML = `
    <div><dt>Items</dt><dd>${summary.itemCount}</dd></div>
    <div><dt>Subtotal</dt><dd>${money(summary.subtotal)}</dd></div>
    <div><dt>Discount</dt><dd>−${money(summary.discount)}</dd></div>
    <div><dt>Shipping</dt><dd>${money(summary.shipping)}</dd></div>
    <div class="total"><dt>Total</dt><dd>${money(summary.total)}</dd></div>
  `;
}

function renderCart() {
  cartElement.innerHTML = cart.length === 0
    ? '<p class="empty">The cart is empty.</p>'
    : cart.map((line) => `
      <article class="cart-line">
        <div><strong>${line.name}</strong><span>${line.quantity} × ${money(line.price)}</span></div>
        <button class="secondary" data-remove="${line.id}">Remove</button>
      </article>
    `).join('');
  renderSummary();
}

catalogueElement.addEventListener('click', (event) => {
  const productId = event.target.dataset.add;
  if (!productId) return;
  const product = products.find(({ id }) => id === productId);
  const quantity = Number(document.querySelector(`#quantity-${productId}`).value);
  const result = addToCart(cart, product, quantity);
  if (!result.ok) return showMessage(result.message);
  cart = result.cart;
  showMessage(`${product.name} added.`);
  renderCart();
});

cartElement.addEventListener('click', (event) => {
  const productId = event.target.dataset.remove;
  if (!productId) return;
  const result = removeFromCart(cart, productId);
  if (!result.ok) return showMessage(result.message);
  cart = result.cart;
  showMessage('Product removed.');
  renderCart();
});

promoElement.addEventListener('input', renderSummary);
renderCatalogue();
renderCart();
