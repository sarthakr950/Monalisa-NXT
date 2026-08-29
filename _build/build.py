#!/usr/bin/env python3
"""Monalisa Nxt Mall — site assembler.

Reads page bodies from _build/pages/, wraps them in the shared shell
(_build/template.html) with per-page title/description from _build/meta.json,
and writes the final static pages to the site root.

Edit content in _build/pages/*.html (or the shell/template), then rebuild:

    python3 _build/build.py
"""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.join(ROOT, "_build")

def main():
    template = open(os.path.join(BUILD, "template.html"), encoding="utf-8").read()
    meta = json.load(open(os.path.join(BUILD, "meta.json"), encoding="utf-8"))
    for name, info in meta.items():
        body = open(os.path.join(BUILD, "pages", f"{name}.html"), encoding="utf-8").read().strip()
        page = (template
                .replace("{{TITLE}}", info["title"])
                .replace("{{DESC}}", info["desc"])
                .replace("{{CONTENT}}", body))
        out = os.path.join(ROOT, f"{name}.html")
        with open(out, "w", encoding="utf-8") as f:
            f.write(page)
        print("built", name)

if __name__ == "__main__":
    main()
