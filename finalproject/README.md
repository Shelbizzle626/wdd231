# Stabby Rats Racing — website

A static, multi-page site for the family mountain bike team. No build step, no
framework — just HTML, CSS, and a little JavaScript. Open `index.html` in a
browser to preview it locally.

## Files

```
index.html        Home
about.html        The Team (story + name origin)
riders.html       Riders roster + race schedule
gallery.html      Photo board
styles.css        All styling (design tokens live at the top)
main.js           Mobile menu + gallery lightbox
images/
  logo-full.jpg   The full logo (shown on the home page)
  logo-badge.png  The gear-badge emblem, cropped for the nav bar + favicon
  riders/         Rider photos (placeholders to replace)
  gallery/        Gallery photos (placeholders to replace)
```

## Making it yours

Everything you need to edit is marked with `<!-- EDIT THIS -->` comments.

- **Your story** → `about.html` (the two prose blocks and the "Why Stabby Rats?" box)
- **Riders** → `riders.html`: one `<article class="rider">` block per person.
  Change the name, plate number, discipline, and the photo `src`.
- **Schedule** → `riders.html`: edit the table rows. Use
  `<span class="tag confirmed">` or `<span class="tag tbd">` for the status.
- **Photos** → drop files in `images/riders/` and `images/gallery/`, then point
  each `src` at them. Keep `loading="lazy"` on gallery images so phones stay fast.
- **Colors / fonts** → top of `styles.css`, in the `:root` block.

### Photo tips (the site is photo-heavy)
- Resize before uploading: ~1200px wide for gallery shots, ~800×1000 for riders.
- Compress them (Squoosh.app is free) — aim for under ~300KB each.
- WebP is ideal; optimized JPG is fine.

## Putting it online with GitHub Pages (free)

1. Create a new repository on GitHub, e.g. `stabby-rats`.
2. Upload all these files to the repo (drag-and-drop in the GitHub web UI works,
   or push with git). `index.html` must sit at the repo root.
3. Repo **Settings → Pages** → under "Build and deployment", set Source to
   **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. Wait a minute. Your site goes live at
   `https://<your-username>.github.io/stabby-rats/`.

## Pointing your GoDaddy domain at it

Once the GitHub Pages site is live, connect your domain:

1. In your repo, **Settings → Pages → Custom domain**, enter your domain
   (e.g. `stabbyratsracing.com`) and save. This creates a `CNAME` file in the repo.
2. In **GoDaddy → your domain → DNS**, add these records:

   **For the root domain** (`stabbyratsracing.com`) — four A records, all
   pointing at GitHub's IPs:

   | Type | Name | Value           |
   |------|------|-----------------|
   | A    | @    | 185.199.108.153 |
   | A    | @    | 185.199.109.153 |
   | A    | @    | 185.199.110.153 |
   | A    | @    | 185.199.111.153 |

   **For the www subdomain** — one CNAME:

   | Type  | Name | Value                        |
   |-------|------|------------------------------|
   | CNAME | www  | `<your-username>.github.io`  |

3. Back in **Settings → Pages**, tick **Enforce HTTPS** once it becomes available
   (can take a little while after DNS resolves).

DNS changes can take anywhere from a few minutes to a couple of hours to take
effect — occasionally longer — so don't panic if it's not instant. GitHub's IPs
above are current as of this writing; if the site won't verify, double-check them
against GitHub's Pages documentation in case they've changed.

## Adding a store later

When you're ready to sell merch, you don't have to rebuild anything. Drop in a
Shopify Buy Button, a Stripe Payment Link, Snipcart, or a print-on-demand
embed (Printful) on a new `shop.html` page and add it to the nav. The static
setup stays as-is.
