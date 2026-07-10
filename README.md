# zuoxingdong.github.io

Personal website of Xingdong Zuo — built with [Astro](https://astro.build), deployed to GitHub Pages.

## Updating content (the only thing you'll normally do)

All content lives in plain data/markdown files. Edit, commit, push — GitHub Actions rebuilds and deploys automatically.

| To… | Edit |
| --- | --- |
| Add a publication | `src/data/publications.yaml` (one entry; see the field guide in the file header) |
| Add a talk / activity | `src/data/talks.yaml` |
| Add/edit a project | `src/data/projects.yaml` |
| Update bio / links / education | `src/data/profile.yaml` |
| Write a blog post | Add a `.md` file to `src/content/blog/` with `title`, `date`, `tags` frontmatter |
| Link an external article (e.g. HF blog) | `src/data/writing.yaml` |
| Replace the headshot | Overwrite `public/avatar.jpg` |
| Add a CV | Drop `cv.pdf` into `public/` and uncomment the CV link in `src/data/profile.yaml` |

No local tooling required — edits can be made directly on github.com and the site rebuilds on push.

## Local development (optional)

```shell
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
```

## Deployment

`.github/workflows/deploy.yml` builds the site with the official Astro action and publishes via GitHub Pages on every push to `main`.

One-time setup: in the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.

## Design notes

Single-column layout (~46rem) in a Scandinavian modern/cozy direction: warm snow-white background, polar-night ink, one fjord-blue accent (Nord-inspired), soft rounded details. Typography: Schibsted Grotesk (headings) + Nunito Sans (body) + JetBrains Mono (labels). Dark mode is a soft blue-charcoal winter night — automatic via `prefers-color-scheme` with a manual toggle persisted in `localStorage`. Zero client-side JavaScript apart from the theme toggle.
