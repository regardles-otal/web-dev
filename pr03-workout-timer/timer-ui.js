'use strict';

const form = document.querySelector('#timer-form');
const resultState = document.querySelector('#result-state');
const summary = document.querySelector('#summary');
const total = document.querySelector('#total');
const steps = document.querySelector('#steps');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const result = createWorkoutPlan(
    Number(document.querySelector('#rounds').value),
    Number(document.querySelector('#work').value),
    Number(document.querySelector('#rest').value),
  );

  steps.replaceChildren();
  if (!result || result.ok !== true) {
    summary.hidden = true;
    resultState.hidden = false;
    resultState.textContent = result?.message || 'The function returned an invalid result.';
    return;
  }

  resultState.hidden = true;
  summary.hidden = false;
  total.textContent = formatDuration(result.totalDuration);

  for (const step of result.steps) {
    const item = document.createElement('li');
    item.className = step.type;
    item.innerHTML = `<span>Round ${step.round} · ${step.type}</span><strong>${formatDuration(step.duration)}</strong>`;
    steps.append(item);
  }
});
