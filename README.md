# P-24 Web Practicals

One repository for all ten JavaScript and TypeScript practicals. Each practical
is an independent browser application in its own directory. Older directories
stay unchanged when you start a new assignment.

Create your repository with **Use this template → Create a new repository**.
This is not a fork: you receive a regular private repository with your own
history.

## Published practicals

- [Practical 1 — Personal Card](https://github.com/everlabs-university/p24-web-course/blob/main/labs/pr01-personal-card/README.md)
- [Practical 2 — Smart Checkout](https://github.com/everlabs-university/p24-web-course/blob/main/labs/pr02-smart-checkout/README.md)
- [Practical 3 — Workout Timer Core](https://github.com/everlabs-university/p24-web-course/blob/main/labs/pr03-workout-timer/README.md)
- [Practical 4 — Leaderboard Analyzer](https://github.com/everlabs-university/p24-web-course/blob/main/labs/pr04-leaderboard-analyzer/README.md)
- [Practical 5 — Modular Shopping Cart](https://github.com/everlabs-university/p24-web-course/blob/main/labs/pr05-modular-shopping-cart/README.md)

## Requirements

- Node.js **22.13** or newer;
- npm 10 or newer.

## Start locally

```bash
npm ci
npm run dev
```

Open the local URL and choose a published practical from the index page. Each
practical also works when its own `index.html` file is opened directly.

## Normal submission flow

```bash
git add .
git commit -m "feat: complete practical 1"
git push
```

Every push runs all practicals published so far. The Actions summary shows the
automatic score for each published practical out of 80 points.

In Moodle submit:

1. the permalink to the exact commit;
2. a screenshot of the Actions summary for the same commit.

Do not create pull requests, tags, releases, submission scripts, or repository
secrets. Submission is always `commit` → `push` → exact commit link.

## Repository layout

```text
.github/workflows/grade.yml  canonical grader call; do not edit
prNN-practical-name/         One published practical application
```

Each brief tells you which file may be edited. Public contracts and lecture
materials live in [p24-web-course](https://github.com/everlabs-university/p24-web-course).

The grading workflow is compared byte for byte with the canonical file. Any
change makes the submitted commit invalid during the instructor's final check.
