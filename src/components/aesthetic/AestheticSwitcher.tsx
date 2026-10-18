"use client";

import { Button, Column, Dropdown, Option, Row, Text } from "@once-ui-system/core";
import { aesthetics, type AestheticName } from "@/resources";
import { useAesthetic } from "./AestheticProvider";

/** Floating picker that lets visitors try every aesthetic. Turn it off with display.aestheticSwitcher. */
export function AestheticSwitcher() {
  const { name, setAesthetic } = useAesthetic();

  const picker = (
    <Dropdown
      placement="top-start"
      selectedOption={name}
      onSelect={(value) => setAesthetic(value as AestheticName)}
      trigger={
        <Button
          data-border="rounded"
          variant="secondary"
          size="s"
          prefixIcon="palette"
          weight="default"
          aria-label={`Aesthetic: ${aesthetics[name].label}. Choose another`}
        >
          {aesthetics[name].label}
        </Button>
      }
    >
      <Column padding="4" gap="2" minWidth="18rem" maxWidth="20rem">
        <Row paddingX="12" paddingTop="8" paddingBottom="4">
          <Text textVariant="label-default-s" onBackground="neutral-weak">
            Try an aesthetic
          </Text>
        </Row>
        {(Object.keys(aesthetics) as AestheticName[]).map((key) => (
          <Option
            key={key}
            value={key}
            selected={key === name}
            label={aesthetics[key].label}
            description={aesthetics[key].description}
          />
        ))}
      </Column>
    </Dropdown>
  );

  // Floating bottom left on desktop. On phones the menu sits at the bottom, so
  // the picker takes its own row at the top of the page instead.
  return (
    <>
      <Row position="fixed" bottom="24" left="24" zIndex={9} s={{ hide: true }}>
        {picker}
      </Row>
      <Row fillWidth paddingX="16" paddingTop="16" hide s={{ hide: false }}>
        {picker}
      </Row>
    </>
  );
}
