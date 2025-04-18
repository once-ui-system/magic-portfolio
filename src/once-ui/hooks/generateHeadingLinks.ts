import { useEffect, useState } from "react";

export const useHeadingLinks = () => {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3, h4, h5, h6"))
      .filter((elem) => !elem.hasAttribute("data-exclude-nav"))
      .map((elem, index) => ({
        id: elem.id || `heading-${index}`,
        text: elem.textContent || "",
        level: Number(elem.tagName.substring(1)),
      }));
    setHeadings(elements);
  }, []);

  return headings;
};
