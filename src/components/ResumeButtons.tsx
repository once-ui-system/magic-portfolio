import { Button, Flex } from "@/once-ui/components";
import { person } from "@/app/resources/content";

interface ResumeButtonsProps {
  size?: "s" | "m";
  label?: string;
}

/**
 * CV download buttons. The default language (person.resume.default) gets the
 * main button; the other languages get small secondary buttons next to it.
 */
export const ResumeButtons = ({ size = "s", label = "Download CV" }: ResumeButtonsProps) => {
  const { resume } = person;
  if (!resume || !resume.files || resume.files.length === 0) return null;

  const main = resume.files.find((f) => f.lang === resume.default) ?? resume.files[0];
  const others = resume.files.filter((f) => f !== main);

  return (
    <Flex gap="8" wrap vertical="center">
      <Button
        href={main.href}
        prefixIcon="download"
        label={`${label} (${main.lang.toUpperCase()})`}
        size={size}
        variant="primary"
        data-border="rounded"
      />
      {others.map((f) => (
        <Button
          key={f.lang}
          href={f.href}
          prefixIcon="download"
          label={f.lang.toUpperCase()}
          size={size}
          variant="secondary"
          data-border="rounded"
          aria-label={`${label} (${f.label})`}
        />
      ))}
    </Flex>
  );
};
