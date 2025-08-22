module.exports = {
  "*.{js,jsx,ts,tsx}": (filenames) => [
    `biome check --write ${filenames.map((f) => `"${f}"`).join(" ")}`,
    `biome format --write ${filenames.map((f) => `"${f}"`).join(" ")}`,
  ],
  "*.{json}": (filenames) => [`biome format --write ${filenames.map((f) => `"${f}"`).join(" ")}`],
};
