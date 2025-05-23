#!/usr/bin/env python3
import os
import io
import requests
from PIL import Image, ImageDraw
import cairosvg

# ─── CONFIG ────────────────────────────────────────────────────────────────
LOGOS = {
    "pact": "https://assets.coingecko.com/coins/images/3693/large/800_x_800.png",
    "solidity": "https://download.logo.wine/logo/Solidity/Solidity-Logo.wine.png",
    "typescript": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    "nextjs": "https://logowik.com/content/uploads/images/nextjs7685.logowik.com.webp",
    "vercel": "https://static.wikia.nocookie.net/logopedia/images/a/a7/Vercel_favicon.svg/revision/latest/scale-to-width-down/250?cb=20221026155821",
    "csharp": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png",
    "postgresql": "https://download.logo.wine/logo/PostgreSQL/PostgreSQL-Logo.wine.png",
    "mongodb": "https://snapdb.app/img/db/mongodb.png",
    "python": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6iLN0baNtQt1Dlv-Eu8bwFw7QlFLVVIb4cg&s",
    "r": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7MKvYABhD5A2Zodr5IhYxv-b6sRSsceTsc5DFHMjOZhAujBmm1wPm0KTnFRet7v4fQ6s&usqp=CAU",
    "linux": "https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg",
    "docker": "https://cdn.iconscout.com/icon/free/png-256/free-docker-logo-icon-download-in-svg-png-gif-file-formats--brand-company-business-brands-pack-logos-icons-2285024.png",
    "devops": "https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png",
    "git": "https://cdn.iconscout.com/icon/free/png-256/free-git-logo-icon-download-in-svg-png-gif-file-formats--programming-langugae-language-pack-logos-icons-1175219.png?f=webp&w=256",
}
TARGET_DIR = "./public/images/logos"
SIZE = 256  # final canvas size
MARGIN = 0.02  # 10% padding inside the circle
BORDER_W = 2  # circle border width in px
# ─────────────────────────────────────────────────────────────────────────────

os.makedirs(TARGET_DIR, exist_ok=True)
inner_size = int(SIZE * (1 - 2 * MARGIN))

for name, url in LOGOS.items():
    try:
        # 1) Download
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        ext = os.path.splitext(url.split("?")[0])[1].lower()

        # 2) Load into PIL.Image (rasterizing SVG if needed)
        if ext == ".svg":
            png_bytes = cairosvg.svg2png(
                bytestring=resp.content,
                output_width=inner_size,
                output_height=inner_size,
            )
            logo = Image.open(io.BytesIO(png_bytes)).convert("RGBA")
        else:
            logo = Image.open(io.BytesIO(resp.content)).convert("RGBA")
            logo.thumbnail((inner_size, inner_size), Image.LANCZOS)

            # 3) Create circular canvas
            canvas = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
            draw = ImageDraw.Draw(canvas)
            # white circle background
            draw.ellipse([0, 0, SIZE, SIZE], fill=(255, 255, 255, 255))

            # 4) Paste logo centered
            x = (SIZE - logo.width) // 2
            y = (SIZE - logo.height) // 2
            canvas.paste(logo, (x, y), logo)

            # 5) Draw grey border
            half = BORDER_W / 2
            draw.ellipse(
                [half, half, SIZE - half, SIZE - half],
                outline=(200, 200, 200, 255),
                width=BORDER_W,
            )

            # 6) Mask corners for true circular crop
            mask = Image.new("L", (SIZE, SIZE), 0)
            mdraw = ImageDraw.Draw(mask)
            mdraw.ellipse([0, 0, SIZE, SIZE], fill=255)
            final = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
            final.paste(canvas, (0, 0), mask)

            # 7) Save as PNG (overwrite previous if any)
            out_path = os.path.join(TARGET_DIR, f"{name}.png")
            final.save(out_path)
            print(f"✔ {name}: saved to {out_path}")

    except Exception as e:
        print(f"✖ {name}: {e}")
