'use strict';

const form = document.querySelector('#checkout-form');
const subtotalInput = document.querySelector('#subtotal');
const studentInput = document.querySelector('#student');
const deliveryInput = document.querySelector('#delivery');
const resultState = document.querySelector('#result-state');
const breakdown = document.querySelector('#breakdown');

function formatMoney(value) {
  return `${Number(value).toFixed(2)} UAH`;
}

function setField(field, value) {
  const element = breakdown.querySelector(`[data-field="${field}"]`);

  if (element) {
    element.textContent = formatMoney(value);
  }
}

function showError(message) {
  breakdown.hidden = true;
  resultState.hidden = false;
  resultState.classList.add('error');
  resultState.textContent = message;
}

function showResult(result) {
  resultState.hidden = true;
  resultState.classList.remove('error');
  breakdown.hidden = false;

  setField('subtotal', result.subtotal);
  setField('discountAmount', result.discountAmount === 0 ? 0 : -result.discountAmount);
  setField('discountedSubtotal', result.discountedSubtotal);
  setField('deliveryFee', result.deliveryFee);
  setField('total', result.total);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const rawSubtotal = subtotalInput.value.trim();
  const subtotal = rawSubtotal === '' ? Number.NaN : Number(rawSubtotal);

  const result = calculateCheckout(
    subtotal,
    studentInput.checked,
    deliveryInput.value,
  );

  if (!result || result.ok !== true) {
    showError(result?.message || 'The calculation returned an invalid result.');
    return;
  }

  showResult(result);
});
