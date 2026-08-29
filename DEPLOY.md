# Deploy Monalisa Nxt Mall — Step-by-Step (foolproof)

Your website is a **static site** — 11 pages + images. Nothing to install, no build step.
Follow these steps in order. Copy **one line at a time** into your Mac Terminal and press Enter.

---

## STEP 1 — Extract the site into a FRESH folder

Open Terminal, then run these lines one by one:

```bash
cd ~/Downloads
mkdir -p Monalisa-SITE
cd Monalisa-SITE
unzip -o ~/Downloads/Monalisa-NXT-site.zip
ls
```

You should see: `index.html  mens.html  ladies.html  ...  assets  _build`

> If you get `unzip: command not found`, use: `ditto -xk ~/Downloads/Monalisa-NXT-site.zip ~/Downloads/Monalisa-SITE`

---

## STEP 2 — Create a NEW git repo in that folder

```bash
cd ~/Downloads/Monalisa-SITE
git init -b main
git add -A
git commit -m "Monalisa Nxt Mall website"
```

You should see `157 files changed` (or similar). If it says "nothing to commit", the files are not in this folder — go back to Step 1.

---

## STEP 3 — Link to GitHub and push

```bash
git branch -M main
git remote add origin https://github.com/sarthakr950/Monalisa-NXT.git
git push -u origin main --force
```

- When asked for **Username**: type `sarthakr950`
- When asked for **Password**: paste your **Personal Access Token** (not your password)
  - Create one at https://github.com/settings/tokens → **Generate new token (classic)**
  - Tick **`repo`** → Generate → copy the `ghp_...` string
  - Pasting shows nothing on screen — that's normal. Press Enter.

Success looks like:
```
To https://github.com/sarthakr950/Monalisa-NXT.git
 * [new branch]      main -> main
```

The `--force` is safe: the repo currently holds only 2 small placeholder files which we are replacing with the full website.

---

## STEP 4 — Publish it live (GitHub Pages, free)

1. On GitHub, open **sarthakr950/Monalisa-NXT** → **Settings**
2. Left menu → **Pages**
3. Under **Branch**: choose `main`, folder `/ (root)` → **Save**
4. Wait 1–2 minutes, then open:

👉 **https://sarthakr950.github.io/Monalisa-NXT/**

---

## STEP 5 — (Later, optional) Use your own domain monalisanxt.com

1. Create a file named `CNAME` (no extension) containing exactly `monalisanxt.com` and push it.
2. At your domain registrar, add a DNS record:
   ```
   Type: CNAME   Name: @ or www   Value: sarthakr950.github.io
   ```
3. In GitHub Pages settings, the custom domain will appear. Tick **Enforce HTTPS**.

Until the DNS record is added, the site will 404 on the custom domain — the `sarthakr950.github.io` URL keeps working.

---

## Troubleshooting

| Message | Fix |
|---|---|
| `Updates were rejected` / `fetch first` | You're pushing from an old folder. Use a FRESH folder (Step 1) and the `--force` in Step 3. |
| `command not found: #` | You pasted a line starting with `#`. Only paste the lines that start with `cd`, `git`, `unzip`, etc. |
| `remote: Repository not found` | Wrong repo name or the repo is under a different account. Check the URL is exactly `https://github.com/sarthakr950/Monalisa-NXT.git`. |
| `Authentication failed` | The token is wrong/expired, or you used your password instead of a token. Create a new token (Step 3). |
| `Permission to sarthakr950/Monalisa-NXT denied` | The token wasn't created with the `repo` scope ticked. Create again. |

## Editing later (optional)

- To change text on a page, edit the `*.html` file directly and re-run:
  ```bash
  git add -A
  git commit -m "update"
  git push
  ```
- For shared changes (navbar, footer) edit `_build/template.html` + `_build/pages/*.html`, then run `python3 _build/build.py` to regenerate all pages, then push.
