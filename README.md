# TRFC Website

<p align="center">
  <!-- Replace the src below with your own image (e.g. commit readme-banner.png next to this README and set src="./readme-banner.png"). -->
  <img
    src="https://via.placeholder.com/960x280/0d1117/58a6ff?text=TRFC+Website+%E2%80%94+Replace+with+your+banner"
    alt="The Russian Federation Corporation website — replace this placeholder with your project image"
    width="960"
  />
</p>

Static web front end for **The Russian Federation Corporation** public presence: HTML pages, shared styling, and lightweight client-side JavaScript served as a **static site** (no server-side rendering in this repository). Content is organized into sections such as home, about, divisions, team, and contact.

---

## Table of contents

- [What this project does](#what-this-project-does)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Scripts and local preview](#scripts-and-local-preview)
- [Editing content and styles](#editing-content-and-styles)
- [Contact form behavior](#contact-form-behavior)
- [Building and deploying](#building-and-deploying)
- [Browser support](#browser-support)
- [Maintenance](#maintenance)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## What this project does

- Presents **public-facing pages** for the organization with a consistent layout and navigation.
- Ships **static assets** (markup, CSS, JavaScript) suitable for hosting on any static file host or CDN.
- Uses **npm** only for a small **development static server** (`serve`) so contributors can preview changes locally without configuring a separate web stack.

There is **no build step** that compiles TypeScript or bundles JavaScript for production in the current setup; scripts are plain JavaScript loaded by the pages. If you later introduce a bundler or framework, document the new workflow in this file.

---

## Requirements

- **Node.js** (LTS recommended) and **npm**, used to install the dev dependency that powers the local preview server.
- A **modern browser** for development and testing (see [Browser support](#browser-support)).

No database or API server is required to **view** the static files; connecting forms to a live backend is a separate integration task.

---

## Quick start

1. **Clone** the repository and enter the project directory.

2. **Install dependencies** (installs the local static server used by npm scripts):

   ```bash
   npm install
   ```

3. **Start the preview server:**

   ```bash
   npm run dev
   ```

   By default the site is served at **http://localhost:3000** (see `package.json` for the exact port).

4. Open the site in your browser and navigate between pages using the site navigation.

---

## Scripts and local preview

The `package.json` scripts use **`serve`** to host the current directory. Typical commands:

| Script | Command | Purpose |
|--------|---------|---------|
| `start` | `serve -l 3000 .` | Production-style static serving from the project root. |
| `dev` | same as `start` | Local preview during development (name reflects intent). |
| `serve` / `preview` | same | Aliases for the same behavior. |

To use another port, you can invoke `npx serve -l <port> .` directly, or adjust the scripts in `package.json` in a dedicated change.

**Important:** `serve` is for **development and demos**. For production, deploy the static files to a host that supports HTTPS, caching headers, and compression (see [Building and deploying](#building-and-deploying)).

---

## Editing content and styles

- **Pages:** Edit the HTML files for each section. Keep navigation labels and links consistent across pages when adding or renaming sections.
- **Styles:** Global rules live in the main stylesheet referenced by the pages. Prefer reusing existing classes and variables (if any) before introducing one-off styles so the site stays visually coherent.
- **Scripts:** Client-side behavior is implemented in small JavaScript files. Keep scripts defensive (check for DOM nodes before attaching listeners) so pages without a given widget still load cleanly.

After substantive edits, reload the preview server tab and spot-check every page template you touched.

---

## Contact form behavior

The contact experience may include a form that **validates input in the browser**. In the current implementation, messaging emphasizes demonstration and directs users to official channels where appropriate. **Wiring the form to a production API** (for example the TRFC Web Server form endpoint) requires updating the client script to `fetch` your backend URL, handling CORS policy on the API, and never exposing secrets in front-end code.

Document any production endpoint URL configuration (environment-specific build-time constants, server-side proxy, etc.) in deployment runbooks—not in public HTML comments.

---

## Building and deploying

**There is no compile step** for the current static setup: the deployable artifact is the set of static files (HTML, CSS, JS, and any images or fonts you add).

**Typical deployment options:**

- **Object storage + CDN** (AWS S3 + CloudFront, Google Cloud Storage + Cloud CDN, Azure Blob + Front Door, Cloudflare R2 + CDN, etc.).
- **Static hosting** (Netlify, Vercel static, GitHub Pages, Cloudflare Pages) by connecting the repository or uploading the file tree.
- **Traditional web server** (nginx, Apache, Caddy) with the document root pointing at the deployed files.

**Recommended practices:**

- Serve the site over **HTTPS** with automatic certificate renewal.
- Set **cache headers** for hashed or versioned assets if you introduce fingerprinting later; for static filenames, use conservative caching or short TTLs for HTML.
- Use a **canonical hostname** and redirect HTTP to HTTPS.
- Add **security headers** (`Content-Security-Policy`, `X-Content-Type-Options`, etc.) at the edge or server when you have a clear policy.

---

## Browser support

Target **current evergreen browsers** (last two major versions of Chrome, Firefox, Safari, Edge) unless a page explicitly requires legacy support. Test interactive features after changes on both desktop and mobile viewport sizes.

---

## Maintenance

- **Dependencies:** Periodically run `npm audit` and update `serve` (or replace it with another static server) in a controlled change that updates `package-lock.json`.
- **Content updates:** Coordinate copy changes with stakeholders; keep accessibility in mind (heading hierarchy, link text, contrast).
- **Assets:** Optimize images (dimensions, compression, modern formats) before adding large media to keep load times reasonable on mobile networks.

---

## Troubleshooting

| Symptom | Things to check |
|---------|-----------------|
| `npm install` fails | Node/npm version, network, and registry access; retry after clearing npm cache if appropriate. |
| Port 3000 already in use | Stop the other process or run `serve` on a different port. |
| Styles or scripts not updating | Hard-refresh the browser; confirm you saved files and are viewing the correct local URL. |
| Old content on production | CDN or browser cache; purge CDN cache after deploy if URLs did not change. |

---

## Contributing

1. **Open an issue** for large content or structural changes so maintainers can align on messaging and scope.
2. **Branch** from the default branch with a clear name.
3. **Preview** locally with `npm run dev` and verify all affected pages.
4. **Keep commits** focused: one logical change per pull request when possible.
5. **Describe** pull requests clearly: what changed on which pages, and any deployment notes (e.g. new asset paths).

Accessibility, performance, and factual accuracy matter for a public site—review copy with that in mind.

---

## License

See the `LICENSE` file in this repository if one is provided; otherwise, default repository policies apply as defined by the organization.
