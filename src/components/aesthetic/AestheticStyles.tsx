import { aesthetics, display, fontFamilies, type AestheticName } from "@/resources";

// One rule per aesthetic, keyed on <html data-aesthetic>: its fonts and extra
// CSS variables, plus (with the switcher on) hiding home sections it doesn't use.
function aestheticCss(): string {
  return (Object.keys(aesthetics) as AestheticName[])
    .map((name) => {
      const { fonts, vars = {}, css = "" } = aesthetics[name];
      const declarations = {
        "--font-heading": fontFamilies[fonts.heading].style.fontFamily,
        "--font-body": fontFamilies[fonts.body].style.fontFamily,
        "--font-label": fontFamilies[fonts.label].style.fontFamily,
        "--font-code": fontFamilies[fonts.code].style.fontFamily,
        ...vars,
      };
      const body = Object.entries(declarations)
        .map(([property, value]) => `${property}:${value}`)
        .join(";");
      const root = `:root[data-aesthetic="${name}"]`;
      const hide = display.aestheticSwitcher
        ? `${root} [data-aesthetic-only]:not([data-aesthetic-only~="${name}"]){display:none !important}`
        : "";
      // Scope the aesthetic's own rules with CSS nesting under its root selector.
      const extra = css ? `${root}{${css}}` : "";
      return `${root}{${body}}${extra}${hide}`;
    })
    .join("\n");
}

// The header menu, the aesthetic switcher and a few button rows are rounded pills
// (data-border="rounded"), which suits soft corners. When the corners in use are "sharp" or
// "conservative", the pills take their radii from the page instead, so they follow the
// aesthetic. Use radius="full" for something that must stay round everywhere.
const radii = ["xs", "s", "m", "l", "xl"].flatMap((size) =>
  ["", "-nest-4", "-nest-8"].map((nest) => `--radius-${size}${nest}:inherit`),
);
const pillCss = `:root:is([data-border="sharp"],[data-border="conservative"]) [data-border="rounded"]{${radii.join(";")}}`;

export function AestheticStyles() {
  return (
    <style id="aesthetics" dangerouslySetInnerHTML={{ __html: `${aestheticCss()}\n${pillCss}` }} />
  );
}
