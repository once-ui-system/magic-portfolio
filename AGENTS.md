# Agent Guide: Architecture & Content Guidelines

This guide explains the project architecture and the protocols for AI agents editing the portfolio and blog posts.

---

## 1. Project Architecture

This is a Next.js application built with internationalization (`[locale]` routing) and styled using Once UI system primitives (`<Column>`, `<Row>`, `<Grid>`, `<Heading>`, `<Text>`). 

- **Layout System:** Styled via Once UI tokens. Primitives are imported from `@once-ui-system/core`. Avoid adding inline custom CSS or Tailwind unless standard Once UI props do not cover the layout requirements.
- **Content Sources:** MDX files are parsed using `next-mdx-remote/rsc` and `gray-matter`.
  - **Work/Projects:** MDX files are stored under `src/app/work/projects/[locale]/`.
  - **Blog Posts:** MDX files are stored under `src/app/blog/posts/[locale]/`.

---

## 2. Protocol to Add a Project (Work)

To add a new showcase project to the work section:

1.  **Screenshots:** Place any preview screenshots in `public/images/projects/<slug>/` or `public/images/projects/<slug>.png`.
2.  **English MDX:** Create `src/app/work/projects/en/<slug>.mdx`.
3.  **Portuguese MDX:** Create `src/app/work/projects/pt-BR/<slug>.mdx`.
4.  **Frontmatter Structure:**
    ```yaml
    ---
    title: "ProjectName: Subtitle explaining function without location hype"
    publishedAt: "YYYY-MM-DD"
    summary: "Objective summary of the project function."
    image: "/images/projects/<slug>.png"
    images:
      - "/images/projects/<slug>.png"
    tags:
      - "Web3"
      - "DeFi"
    team:
      - name: "Francisco Miranda"
        role: "Web3 Developer"
        avatar: "/images/og/chico.jpg"
        linkedIn: "https://www.linkedin.com/in/chicodias/"
        achievements:
          - "MBA in Software Engineering"
          - "Bachelor's in Statistics and Data Science"
    ---
    ```

---

## 3. Protocol to Add a Blog Post

To add a new blog post:

1.  **English MDX:** Create `src/app/blog/posts/en/<slug>.mdx`.
2.  **Portuguese MDX:** Create `src/app/blog/posts/pt-BR/<slug>.mdx`.
3.  **Frontmatter Structure:** Similar to projects, but omitting the `images` list (only using single `image` string).
4.  **Formatting Incompatibilities (Crucial):**
    - **LaTeX Math:** Never use raw dollar signs (`$ ... $` or `$$ ... $$`) as the `next-mdx-remote` parser (acorn) fails to compile them, resulting in build crashes. Instead, use the custom `<LatexRenderer>` component:
      - **Inline Math:** `<LatexRenderer>{`x`}</LatexRenderer>`
      - **Display Math Blocks:** `<LatexRenderer displayMode>{`\\text{Price}_{\\text{YES}} = \\frac{y}{x + y}`}</LatexRenderer>`
      - **Double Backslashes:** Ensure any LaTeX macros use double backslashes (`\\`) to escape Javascript string literals.
    - **Diagrams:** Do not use `mermaid` code blocks. They do not render. Instead, use standard ASCII blocks under the `text` language tag:
      ```text
      [Input] ───(Flow)───> [Output]
      ```

---

## 4. Writing & Content Tone Guidelines

All written content must adhere to an **academic, objective, and neutral tone**:

- **No Marketing Hype:** Avoid subjective adjectives such as "stunning", "revolutionary", "state-of-the-art", "game-changing", "perfect", "seamless". Instead, describe what the system does using operational verbs.
- **Systematic & Objective:** Focus on mathematical equations, architecture data flow, design trade-offs, fuzz-testing invariants, and deployment metrics.
- **Non-Repetitive:** Do not repeat project descriptions or marketing hooks between sections.
