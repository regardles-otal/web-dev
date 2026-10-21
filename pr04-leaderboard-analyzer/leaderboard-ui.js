'use strict';

const samplePlayers = [
  { name: 'Marta', scores: [82, 94, 88] },
  { name: 'Bohdan', scores: [70, 75, 80] },
  { name: 'Iryna', scores: [95, 91, 97] },
  { name: 'Andrii', scores: [88, 84, 92] },
];

const status = document.querySelector('#status');
const summary = document.querySelector('#summary');
const tableBody = document.querySelector('#leaderboard-body');

function render() {
  const result = analyzeLeaderboard(samplePlayers);
  if (!result || result.ok !== true) {
    status.hidden = false;
    status.textContent = result?.message || 'The function returned an invalid result.';
    summary.hidden = true;
    return;
  }

  status.hidden = true;
  summary.hidden = false;
  document.querySelector('#player-count').textContent = result.summary.playerCount;
  document.querySelector('#class-average').textContent = result.summary.classAverage;
  document.querySelector('#highest-score').textContent = result.summary.highestScore;

  tableBody.replaceChildren();
  for (const player of result.players) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${player.rank}</td><td>${player.name}</td><td>${player.total}</td><td>${player.average}</td><td>${player.best}</td>`;
    tableBody.append(row);
  }
}

document.querySelector('#analyze').addEventListener('click', render);
