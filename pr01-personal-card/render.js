'use strict';

function renderProfile(profile) {
  const fields = [
    'fullName',
    'group',
    'specialty',
    'weeklyHours',
    'semesterWeeks',
    'semesterHours',
    'intro',
  ];

  for (const field of fields) {
    const element = document.querySelector(`[data-field="${field}"]`);

    if (element) {
      element.textContent = profile[field];
    }
  }
}
