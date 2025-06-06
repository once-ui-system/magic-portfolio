#!/usr/bin/env python3
import os
import requests
from xml.etree import ElementTree as ET

LOGOS = [
    "solidity",
    "typescript",
    "nextdotjs",
    "vercel",
    "dotnet",
    "postgresql",
    "mongodb",
    "python",
    "r",
    "metamask",
    "walletconnect",
    "github",
    "tailwindcss",
    "linux",
    "docker",
    "git",
]

BASE_URL = "https://cdn.simpleicons.org"
TARGET_DIR = "./public/icons"
os.makedirs(TARGET_DIR, exist_ok=True)


def make_fill_currentcolor(svg_data):
    try:
        ET.register_namespace("", "http://www.w3.org/2000/svg")
        root = ET.fromstring(svg_data)

        # Clean root style if present
        root.attrib.pop("fill", None)
        root.attrib.pop("color", None)

        # Make all paths use `fill="currentColor"`
        for el in root.iter():
            if el.tag.endswith("path") or el.tag.endswith("g"):
                el.set("fill", "currentColor")

        return ET.tostring(root, encoding="unicode")
    except Exception as e:
        print(f"✖ Failed to process SVG: {e}")
        return svg_data


def make_svg_theme_friendly(svg_data):
    try:
        ET.register_namespace("", "http://www.w3.org/2000/svg")
        root = ET.fromstring(svg_data)

        # Remove background rects
        root[:] = [el for el in root if el.tag.split("}")[-1] != "rect"]

        # Set all fills to currentColor
        for el in root.iter():
            if el.tag.endswith("path") or el.tag.endswith("g"):
                el.set("fill", "#000")

        return ET.tostring(root, encoding="unicode")
    except Exception as e:
        print(f"✖ Failed to process SVG: {e}")
        return svg_data


for name in LOGOS:
    url = f"{BASE_URL}/{name}"
    out_path = os.path.join(TARGET_DIR, f"{name}.svg")

    try:
        print(f"Downloading {name}...")
        r = requests.get(url, timeout=10)
        r.raise_for_status()

        original_svg = r.text
        processed_svg = make_svg_theme_friendly(original_svg)

        with open(out_path, "w", encoding="utf-8") as f:
            f.write(processed_svg)

        print(f"✔ Saved to {out_path}")
    except Exception as e:
        print(f"✖ Failed to download {name}: {e}")
