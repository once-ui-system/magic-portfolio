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


def add_white_background(svg_data):
    try:
        # Parse SVG
        ET.register_namespace("", "http://www.w3.org/2000/svg")
        root = ET.fromstring(svg_data)

        # Create white background rect
        bg = ET.Element(
            "rect",
            {"x": "0", "y": "0", "width": "100%", "height": "100%", "fill": "#fff"},
        )

        # Insert background before any other child
        root.insert(0, bg)

        # Return modified SVG as string
        return ET.tostring(root, encoding="unicode")
    except Exception as e:
        print(f"✖ Failed to modify SVG: {e}")
        return svg_data  # fallback


for name in LOGOS:
    url = f"{BASE_URL}/{name}"
    out_path = os.path.join(TARGET_DIR, f"{name}.svg")

    try:
        print(f"Downloading {name}...")
        r = requests.get(url, timeout=10)
        r.raise_for_status()

        original_svg = r.text
        modified_svg = add_white_background(original_svg)

        with open(out_path, "w", encoding="utf-8") as f:
            f.write(modified_svg)

        print(f"✔ Saved to {out_path}")
    except Exception as e:
        print(f"✖ Failed to download {name}: {e}")
